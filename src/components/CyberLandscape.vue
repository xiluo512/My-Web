<template>
  <canvas ref="canvasRef" class="cyber-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three' // 确保已安装: npm install three

const canvasRef = ref(null)
let scene, camera, renderer, particles, mat, uniforms
let animationId, clock

// 配置参数（可根据需求调整）
const CONFIG = {
  particleCount: 350000,
  rangeX: 120,
  rangeZ: 140,
  lineCount: 400,
  repeatCount: 4,           // 纵向拼接段数（越大山河越长）
  colorRiver: new THREE.Color(253/255, 232/255, 3/255),   // 金色河流
  colorMtBase: new THREE.Color('#002044'),   // 山脉基部深青
  colorMtTop: new THREE.Color('#00fff7'),    // 山脉顶部亮青
  flySpeed: 0.28,          // 飞行速度
  camHeight: 16,           // 相机高度
  camSmooth: 0.08          // 相机跟随平滑度
}

// 初始化 Three.js 场景
const init = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  // 1. 场景 + 雾效
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#000000')
  scene.fog = new THREE.FogExp2(0x000000, 0.012)

  // 2. 相机
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  let flyZ = CONFIG.rangeZ * 0.5
  let flyX = 0

  // 3. 渲染器
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: "high-performance"
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  // 4. 几何体：纵向拼接多段山河
  const geometry = new THREE.BufferGeometry()
  const positions = []
  const randoms = []
  const lineIndices = []
  const pointsPerLine = Math.floor(CONFIG.particleCount / CONFIG.lineCount)

  // 循环生成多段纵向拼接的山河
  for (let segment = 0; segment < CONFIG.repeatCount; segment++) {
    const segmentOffsetZ = -segment * CONFIG.rangeZ
    for (let i = 0; i < CONFIG.lineCount; i++) {
      const z = (i / CONFIG.lineCount - 0.5) * CONFIG.rangeZ + segmentOffsetZ
      for (let j = 0; j < pointsPerLine; j++) {
        const x = (j / pointsPerLine - 0.5) * CONFIG.rangeX
        positions.push(x, 0, z)
        randoms.push(Math.random(), Math.random(), Math.random())
        lineIndices.push(i / CONFIG.lineCount)
      }
    }
  }

  // 悬浮尘埃（铺满全段长卷）
  const dustCount = 20000
  for(let i = 0; i < dustCount; i++){
    const seg = Math.floor(Math.random() * CONFIG.repeatCount)
    const off = -seg * CONFIG.rangeZ
    positions.push(
      (Math.random()-0.5)*CONFIG.rangeX,
      Math.random()*30 + 10,
      ((Math.random()-0.5)*CONFIG.rangeZ) + off
    )
    randoms.push(Math.random(), Math.random(), Math.random())
    lineIndices.push(-1.0)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('aRandom', new THREE.Float32BufferAttribute(randoms, 3))
  geometry.setAttribute('aLine', new THREE.Float32BufferAttribute(lineIndices, 1))

  // 5. Vertex Shader
  const vertexShader = `
    uniform float uTime;
    uniform float uScale;
    uniform float uFlowSpeed;
    attribute vec3 aRandom;
    attribute float aLine;
    varying float vType;
    varying float vHeight;
    varying float vIntensity;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main(){
      vec3 pos = position;
      pos.z -= uFlowSpeed * aRandom.y * 4.0;

      if(aLine < -0.5){
        vType = 3.0;
        float t = uTime * 0.2 + aRandom.x * 10.0;
        pos.x += sin(t)*5.0;
        pos.z += cos(t*0.7)*5.0;
        pos.y += sin(t*1.5)*2.0;
        vec4 mv = modelViewMatrix * vec4(pos,1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (2.0 + uScale*2.0 + uFlowSpeed) * (30.0/-mv.z);
        return;
      }

      float riverCurve = sin(pos.z * 0.08)*12.0 + sin(pos.z*0.2)*4.0;
      float distRiver = abs(pos.x - riverCurve);
      float height = 0.0;
      float pointSize = 0.0;

      if(distRiver < 3.5){
        vType = 0.0;
        float flow = snoise(vec2(pos.x*0.5, pos.z*0.2 - uTime*0.8));
        height = flow*0.8;
        pointSize = 3.0*(1.0-distRiver/3.5) + uFlowSpeed*0.6;
        vIntensity = 0.8 + 0.5*sin(uTime*5.0 + aRandom.x*20.0);
      }else if(distRiver < 10.0 + (1.0-uScale)*5.0){
        vType = 2.0;
        pointSize = 0.0;
      }else{
        vType = 1.0;
        float mDist = distRiver - 10.0;
        float n1 = snoise(vec2(pos.x*0.05, pos.z*0.08));
        float n2 = snoise(vec2(pos.x*0.15, pos.z*0.15));
        height = (abs(n1)*15.0 + n2*5.0) * (mDist*0.08);
        height = clamp(height,0.0,35.0);
        height *= (0.6 + uScale*1.5);
        pointSize = 1.5 + height*0.08 + uFlowSpeed*0.4;
        vIntensity = sin(aLine*300.0)>0.8 ? 1.5 : 0.8;
      }
      pos.y = height;
      vHeight = height;
      vec4 mv = modelViewMatrix * vec4(pos,1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = pointSize * (40.0 / -mv.z);
    }
  `

  // 6. Fragment Shader
  const fragmentShader = `
    uniform vec3 uColorRiver;
    uniform vec3 uColorMtBase;
    uniform vec3 uColorMtTop;
    uniform float uTime;
    uniform float uFlowSpeed;
    varying float vType;
    varying float vHeight;
    varying float vIntensity;

    void main(){
      if(vType>1.5 && vType<2.5) discard;
      vec2 uv = gl_PointCoord.xy - 0.5;
      float d = length(uv);
      if(d>0.5) discard;

      float vig = 1.0 - smoothstep(0.35,0.75,d);
      float radial = smoothstep(0.2,0.6,d) * uFlowSpeed * 0.3;
      float alpha = (1.0 - smoothstep(0.2,0.5,d)) * vig;
      vec3 col = vec3(0.0);

      if(vType<0.5){
        col = uColorRiver + vec3(0.4,0.4,0.2);
        col += radial * vec3(1.0,0.9,0.2);
      }else if(vType>2.5){
        col = vec3(1.0);
        alpha *= 0.5;
        col += radial;
      }else{
        float h = clamp(vHeight/25.0,0.0,1.0);
        col = mix(uColorMtBase, uColorMtTop, h);
        col *= vIntensity;
        if(h>0.8) col += vec3(0.2);
        col += radial * vec3(0.1,0.9,1.0);
      }
      col += sin(uTime*0.6 + uv.y*3.0)*0.06;
      gl_FragColor = vec4(col,alpha);
    }
  `

  // 7. Uniforms + 材质
  uniforms = {
    uTime: { value: 0 },
    uScale: { value: 0.2 },
    uFlowSpeed: { value: 0.3 },
    uColorRiver: { value: CONFIG.colorRiver },
    uColorMtBase: { value: CONFIG.colorMtBase },
    uColorMtTop: { value: CONFIG.colorMtTop }
  }

  mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  particles = new THREE.Points(geometry, mat)
  scene.add(particles)

  // 8. 时钟 + 动画变量
  clock = new THREE.Clock()
  let targetScale = 0.2, nowScale = 0.2
  const totalLength = CONFIG.rangeZ * CONFIG.repeatCount

  // 9. 动画循环
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    // 自动起伏
    targetScale = 0.2 + Math.sin(t * 0.35) * 0.35
    nowScale += (targetScale - nowScale) * 0.05

    // 持续向前飞行
    flyZ -= CONFIG.flySpeed

    // 超长山河循环（无缝）
    if(flyZ < -CONFIG.rangeZ * (CONFIG.repeatCount - 0.5)) {
      flyZ = CONFIG.rangeZ * 0.5
    }

    // 跟随河流蜿蜒
    const riverWaveX = Math.sin(flyZ * 0.08) * 12.0 + Math.sin(flyZ * 0.2) * 4.0
    flyX += (riverWaveX - flyX) * CONFIG.camSmooth

    // 镜头
    camera.position.set(flyX * 0.25, CONFIG.camHeight + Math.sin(t*0.15)*1.2, flyZ)
    const lookZ = flyZ - 25
    const lookX = Math.sin(lookZ * 0.08) * 12.0 + Math.sin(lookZ * 0.2) * 4.0
    camera.lookAt(lookX * 0.25, 0, lookZ)

    uniforms.uTime.value = t
    uniforms.uScale.value = nowScale
    renderer.render(scene, camera)
  }
  animate()

  // 10. 窗口自适应
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  // 保存清理函数
  canvasRef.value._cleanup = () => {
    window.removeEventListener('resize', onResize)
    cancelAnimationFrame(animationId)
    renderer.dispose()
    mat.dispose()
    geometry.dispose()
  }
}

// 生命周期
onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  if (canvasRef.value?._cleanup) {
    canvasRef.value._cleanup()
  }
})
</script>

<style scoped>
.cyber-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>