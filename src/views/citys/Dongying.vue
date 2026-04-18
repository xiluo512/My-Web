<template>
  <div class="city-page dongying">
    <div class="dy-hero">
      <canvas ref="dyCanvas"></canvas>
      <h1>东营</h1>
      <p class="sub">黄河入海·湿地之肺</p>
    </div>
    <section class="dy-grid">
      <div class="dy-card"><h3>🌊 黄河口生态区</h3><p>黄蓝交汇最年轻</p></div>
      <div class="dy-card"><h3>🦢 东方白鹳故乡</h3><p>候鸟驿站生机盎</p></div>
      <div class="dy-card"><h3>🛢️ 胜利油田展馆</h3><p>荒原油城崛起史</p></div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const dyCanvas = ref(null)
    let anim = null
    let handleResize = null

    const initCanvas = () => {
      const canvas = dyCanvas.value
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const resize = () => {
        const p = canvas.parentElement
        if (p) {
          canvas.width = p.offsetWidth
          canvas.height = p.offsetHeight
        }
      }
      handleResize = resize
      resize()
      const particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: Math.random() * 1.2 + 0.3
      }))
      const draw = () => {
        if (!canvas.isConnected) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'
        ctx.lineWidth = 1
        particles.forEach(p => {
          p.x += p.v
          p.y += Math.sin(p.x * 0.015) * 0.6
          if (p.x > canvas.width) p.x = 0
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
          ctx.stroke()
        })
        anim = requestAnimationFrame(draw)
      }
      draw()
    }

    onMounted(() => {
      initCanvas()
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      if (anim) cancelAnimationFrame(anim)
      if (handleResize) window.removeEventListener('resize', handleResize)
    })

    return { dyCanvas }
  }
}
</script>

<style scoped>
.dongying {
  background: #0b1120;
  color: #f8fafc;
  min-height: 100vh;
}
.dongying .dy-hero {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(105deg, #0c1929 0%, #1a3040 38%, #b45309 38.5%, #8a3a0a 100%),
    radial-gradient(circle at 40% 45%, rgba(30,64,175,0.3) 0%, transparent 50%),
    radial-gradient(circle at 60% 55%, rgba(245,158,11,0.25) 0%, transparent 45%);
}
.dongying canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
  opacity: 0.4;
}
.dongying .dy-hero h1 {
  font-size: clamp(42px, 8vw, 80px);
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}
.dongying .sub {
  color: #cbd5e1;
  z-index: 2;
  margin-top: 8px;
}
.dongying .dy-grid {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.dongying .dy-card {
  padding: 28px;
  background: rgba(30, 41, 59, 0.5);
  border-top: 3px solid #0ea5e9;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  transition: 0.3s;
}
.dongying .dy-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(14,165,233,0.15);
}
</style>
