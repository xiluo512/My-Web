# main.py
import os, json
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
from dotenv import load_dotenv

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
