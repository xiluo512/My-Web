<template>
  <div class="city-page rizhao">
    <div class="rz-hero">
      <canvas ref="rzCanvas"></canvas>
      <h1>日照</h1>
      <p class="sub">阳光海岸·绿茶故乡</p>
    </div>
    <section class="rz-grid">
      <div class="rz-card"><h3>⛵ 万平口风景区</h3><p>日照城市客厅，沙细水清婚庆地标</p></div>
      <div class="rz-card"><h3>🍵 浮来山古银杏</h3><p>天下银杏第一树，四千年古木参天</p></div>
      <div class="rz-card"><h3>🌊 世帆赛基地</h3><p>乘风破浪启航，水上运动之都</p></div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const rzCanvas = ref(null)
    let anim = null
    let handleResize = null

    const initCanvas = () => {
      const canvas = rzCanvas.value
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
      const rays = Array.from({ length: 12 }, (_, i) => ({
        a: i * (Math.PI * 2 / 12),
        l: Math.random() * 200 + 100
      }))
      const draw = () => {
        if (!canvas.isConnected) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = 'rgba(253,224,71,0.2)'
        ctx.lineWidth = 2
        rays.forEach(ray => {
          ray.a += 0.002
          ctx.beginPath()
          ctx.moveTo(canvas.width / 2, canvas.height / 2)
          ctx.lineTo(canvas.width / 2 + Math.cos(ray.a) * ray.l, canvas.height / 2 + Math.sin(ray.a) * ray.l)
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

    return { rzCanvas }
  }
}
</script>

<style scoped>
.rizhao {
  background: #fafdfadf;
  color: #e2e8f0;
  min-height: 100vh;
}
.rizhao .rz-hero {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0f0a 0%, #1a2010 50%, #0f140f 100%),
    radial-gradient(circle at 50% 20%, rgba(253,224,71,0.08) 0%, transparent 50%);
  position: relative;
  overflow: hidden;
}
.rizhao canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.rizhao .rz-hero h1 {
  font-size: clamp(42px, 8vw, 80px);
  color: #fde047;
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 4px 16px rgba(253,224,71,0.3);
}
.rizhao .sub {
  color: #cbd5e1;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.rizhao .rz-grid {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.rizhao .rz-card {
  background: #161b16;
  border-top: 4px solid #FFD700;
  padding: 28px;
  border-radius: 16px;
  transition: 0.3s;
}
.rizhao .rz-card:hover {
  box-shadow: 0 12px 24px rgba(253,224,71,0.15);
}
</style>
