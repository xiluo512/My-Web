<template>
  <canvas ref="canvasRef" class="ocean-particles" :style="{ opacity: opacity }"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  color: { type: String, default: '#00ffff' }, // 粒子颜色 (HEX)
  speed: { type: Number, default: 1 },        // 流动速度
  density: { type: Number, default: 100 },    // 粒子数量
  opacity: { type: Number, default: 0.6 }     // 透明度
})

const canvasRef = ref(null)
let ctx = null
let animationId = null
let particles = []
let w, h

const init = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  createParticles()
  animate()
  window.addEventListener('resize', resize)
}

const resize = () => {
  const canvas = canvasRef.value
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
}

// 粒子类
class Particle {
  constructor() {
    this.reset()
  }

  reset() {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 2 + 0.5
    this.speedX = (Math.random() - 0.5) * props.speed
    this.speedY = (Math.random() - 0.5) * props.speed
    this.life = Math.random() * 100
    this.maxLife = 100 + Math.random() * 100
  }

  update() {
    // 模拟水流波动 (正弦波)
    this.x += this.speedX + Math.sin(this.life * 0.02) * 0.5
    this.y += this.speedY + Math.cos(this.life * 0.02) * 0.5
    this.life++

    // 超出边界或生命周期结束重置
    if (this.life > this.maxLife || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
      this.reset()
    }
  }

  draw(ctx) {
    const opacity = Math.sin((this.life / this.maxLife) * Math.PI) // 呼吸效果
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = props.color
    ctx.globalAlpha = opacity * 0.5 // 基础透明度
    ctx.fill()
  }
}

const createParticles = () => {
  particles = []
  for (let i = 0; i < props.density; i++) {
    particles.push(new Particle())
  }
}

const animate = () => {
  ctx.clearRect(0, 0, w, h)

  // 绘制连线 (增加水的质感)
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw(ctx)

    // 简单的临近连线算法
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 60) {
        ctx.beginPath()
        ctx.strokeStyle = props.color
        ctx.globalAlpha = (1 - dist / 60) * 0.1 // 连线很淡
        ctx.lineWidth = 0.5
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => init())

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.ocean-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 确保在内容之下 */
  pointer-events: none;
}
</style>