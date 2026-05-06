# main.py
import os, json, re, hashlib, secrets
from pathlib import Path
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from openai import AsyncOpenAI
from dotenv import load_dotenv
import pymysql

load_dotenv()
key = os.getenv("DASHSCOPE_API_KEY")
print(f"✅ 读取到的 Key 前缀: {key[:5] if key else '未找到'}... 长度: {len(key) if key else 0}")

app = FastAPI()

# 允许 Vue 开发服务器跨域
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

client = AsyncOpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

USERS_FILE = Path(__file__).parent / "users.json"

DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "travel_web")
DB_TABLE = os.getenv("DB_TABLE", "travel_web")


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=2, max_length=30)
    email: str = Field(..., min_length=5, max_length=254)
    password: str = Field(..., min_length=6, max_length=128)


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=2, max_length=30)
    password: str = Field(..., min_length=6, max_length=128)


class TripPlanRequest(BaseModel):
    departure: str = Field(..., min_length=1, max_length=50)
    days: int = Field(..., ge=1, le=15)
    budget: int = Field(..., ge=0)
    interests: list[str] = Field(default_factory=list)
    travel_style: str = Field(default="休闲")
    notes: str = Field(default="")


class SaveTripPlanRequest(BaseModel):
    username: str = Field(..., min_length=2, max_length=30)
    title: str = Field(..., min_length=2, max_length=100)
    plan: dict


def read_users():
    if not USERS_FILE.exists():
        return []
    try:
        with USERS_FILE.open("r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []


def write_users(users):
    with USERS_FILE.open("w", encoding="utf-8") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)


def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )


def hash_password(password: str) -> str:
    """PBKDF2-SHA256 哈希密码"""
    salt = secrets.token_hex(32)
    key = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100_000)
    return f"{salt}${key.hex()}"

def verify_password(password: str, stored: str) -> bool:
    """验证密码"""
    salt, key_hex = stored.split('$')
    key = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100_000)
    return key.hex() == key_hex

def ensure_user_table():
    sql = f"""
    CREATE TABLE IF NOT EXISTS `{DB_TABLE}` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `username` VARCHAR(64) NOT NULL,
      `email` VARCHAR(255) NOT NULL,
      `password` VARCHAR(255) NOT NULL,
      `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`),
      UNIQUE KEY `uk_username` (`username`),
      UNIQUE KEY `uk_email` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(sql)
            # 兼容旧表：确保 password 列足够容纳 PBKDF2 哈希（129 字符）
            cursor.execute(
                f"ALTER TABLE `{DB_TABLE}` MODIFY COLUMN `password` VARCHAR(255) NOT NULL"
            )


def ensure_trip_plan_table():
    sql = """
    CREATE TABLE IF NOT EXISTS `trip_plans` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `username` VARCHAR(64) NOT NULL,
      `title` VARCHAR(100) NOT NULL,
      `plan_json` LONGTEXT NOT NULL,
      `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(sql)


def _extract_json(text: str):
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        return None
    try:
        return json.loads(match.group(0))
    except Exception:
        return None


def _plan_is_valid(plan):
    if not isinstance(plan, dict):
        return False
    if not isinstance(plan.get("summary"), str):
        return False
    if not isinstance(plan.get("tips"), list):
        return False
    if not isinstance(plan.get("days"), list) or len(plan.get("days")) == 0:
        return False
    for day in plan["days"]:
        if not isinstance(day, dict):
            return False
        if not isinstance(day.get("day"), int):
            return False
        if not isinstance(day.get("title"), str):
            return False
        if not isinstance(day.get("route"), list) or len(day.get("route")) < 2:
            return False
        if not isinstance(day.get("food"), list):
            return False
        if not isinstance(day.get("notes"), str):
            return False
    return True


@app.post("/api/register")
async def register_user(payload: RegisterRequest):
    if "@" not in payload.email or "." not in payload.email:
        raise HTTPException(status_code=400, detail="邮箱格式不正确")

    hashed = hash_password(payload.password)

    try:
        ensure_user_table()
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    f"SELECT id FROM `{DB_TABLE}` WHERE LOWER(username) = LOWER(%s) LIMIT 1",
                    (payload.username,)
                )
                if cursor.fetchone():
                    raise HTTPException(status_code=409, detail="用户名已存在")

                cursor.execute(
                    f"SELECT id FROM `{DB_TABLE}` WHERE LOWER(email) = LOWER(%s) LIMIT 1",
                    (payload.email,)
                )
                if cursor.fetchone():
                    raise HTTPException(status_code=409, detail="邮箱已被注册")

                cursor.execute(
                    f"INSERT INTO `{DB_TABLE}` (username, email, password) VALUES (%s, %s, %s)",
                    (payload.username, payload.email, hashed)
                )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"MySQL写入失败: {str(e)}")

    return {
        "message": "注册成功",
        "user": {
            "username": payload.username,
            "email": payload.email
        }
    }


@app.post("/api/login")
async def login_user(payload: LoginRequest):
    try:
        ensure_user_table()
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    f"""
                    SELECT username, email, password
                    FROM `{DB_TABLE}`
                    WHERE LOWER(username) = LOWER(%s)
                    LIMIT 1
                    """,
                    (payload.username,)
                )
                matched_user = cursor.fetchone()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"MySQL查询失败: {str(e)}")

    if matched_user is None:
        raise HTTPException(status_code=401, detail="用户名或密码错误")

    if not verify_password(payload.password, matched_user["password"]):
        raise HTTPException(status_code=401, detail="用户名或密码错误")

    return {
        "message": "登录成功",
        "user": {
            "username": matched_user["username"],
            "email": matched_user["email"]
        }
    }


@app.get("/api/user/{username}")
async def get_user_profile(username: str):
    try:
        ensure_user_table()
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    f"""
                    SELECT username, email
                    FROM `{DB_TABLE}`
                    WHERE LOWER(username) = LOWER(%s)
                    LIMIT 1
                    """,
                    (username,)
                )
                user = cursor.fetchone()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"MySQL查询失败: {str(e)}")

    if user is None:
        raise HTTPException(status_code=404, detail="用户不存在")

    return {"user": user}


@app.post("/api/trip/save")
async def save_trip_plan(payload: SaveTripPlanRequest):
    try:
        ensure_trip_plan_table()
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO trip_plans (username, title, plan_json)
                    VALUES (%s, %s, %s)
                    """,
                    (payload.username, payload.title, json.dumps(payload.plan, ensure_ascii=False))
                )
                plan_id = cursor.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"保存行程失败: {str(e)}")

    return {"message": "保存成功", "id": plan_id}


@app.get("/api/trip/list/{username}")
async def list_trip_plans(username: str):
    try:
        ensure_trip_plan_table()
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, title, plan_json, created_at
                    FROM trip_plans
                    WHERE LOWER(username) = LOWER(%s)
                    ORDER BY id DESC
                    """,
                    (username,)
                )
                rows = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取行程失败: {str(e)}")

    plans = []
    for row in rows:
        parsed = _extract_json(row["plan_json"]) or {}
        plans.append({
            "id": row["id"],
            "title": row["title"],
            "plan": parsed,
            "created_at": str(row["created_at"])
        })
    return {"plans": plans}


@app.on_event("startup")
async def startup_event():
    try:
        ensure_user_table()
        ensure_trip_plan_table()
        print(f"✅ MySQL表已就绪: {DB_NAME}.{DB_TABLE}")
    except Exception as e:
        print(f"⚠️ MySQL初始化失败: {str(e)}")


@app.post("/api/trip/plan")
async def create_trip_plan(payload: TripPlanRequest):
    interests_text = "、".join(payload.interests) if payload.interests else "综合"
    prompt = f"""
你是山东旅游规划专家。请为用户生成可执行的行程，并且只返回 JSON，不要返回任何额外文字。

用户信息：
- 出发地：{payload.departure}
- 天数：{payload.days} 天
- 预算：{payload.budget} 元
- 偏好：{interests_text}
- 旅行风格：{payload.travel_style}
- 备注：{payload.notes or "无"}

返回格式必须严格是：
{{
  "summary": "100字以内总结",
  "days": [
    {{
      "day": 1,
      "title": "当天主题",
      "route": ["地点A", "地点B", "地点C"],
      "food": ["推荐美食1", "推荐美食2"],
      "notes": "交通/门票/排队提醒"
    }}
  ],
  "tips": ["准备建议1", "准备建议2"],
  "budget_estimate": "预算分配建议"
}}
    """.strip()

    try:
        completion = await client.chat.completions.create(
            model="qwen-plus",
            messages=[
                {"role": "system", "content": "你只能输出合法 JSON 对象。"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        raw_text = completion.choices[0].message.content or ""
        plan = _extract_json(raw_text)

        if not _plan_is_valid(plan):
            fix_completion = await client.chat.completions.create(
                model="qwen-plus",
                messages=[
                    {
                        "role": "system",
                        "content": "你是 JSON 修复器。请把输入改成符合指定结构的合法 JSON，不要添加解释。"
                    },
                    {
                        "role": "user",
                        "content": f"请修复以下内容为目标结构：\n{raw_text}"
                    }
                ],
                temperature=0,
                response_format={"type": "json_object"}
            )
            fixed_text = fix_completion.choices[0].message.content or ""
            plan = _extract_json(fixed_text)

        if not _plan_is_valid(plan):
            raise HTTPException(status_code=502, detail="AI返回格式异常，请重试")

        return {"plan": plan}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成行程失败: {str(e)}")

@app.post("/api/chat/stream")
async def chat_stream(request: Request):
    body = await request.json()
    messages = body.get("messages", [])  # 多轮对话完整上下文

    async def event_generator():
        try:
            # 通义千问支持 JSON 结构化输出
            stream = await client.chat.completions.create(
                model="qwen-plus",
                messages=messages,
                stream=True,
                temperature=0.2,
                response_format={"type": "json_object"}
            )
            async for chunk in stream:
                delta = chunk.choices[0].delta
                if delta.content:
                    yield f"data: {json.dumps({'content': delta.content})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
