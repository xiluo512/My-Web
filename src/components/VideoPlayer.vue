<template>
  <div class="video-player">
    <div class="video-container">
      <video
        ref="videoRef"
        :src="src"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
        @error="onError"
        @loadeddata="onLoaded"
        @timeupdate="onTimeUpdate"
        preload="metadata"
      ></video>

      <!-- 控制栏 -->
      <div class="video-controls">
        <button class="control-btn" @click="togglePlay">
          <span v-if="!isPlaying">▶️</span>
          <span v-else>⏸️</span>
        </button>

        <div class="progress-bar" @click="seek">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>

        <span class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-overlay">
      <p>❌ {{ error }}</p>
      <button @click="retry">重试</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  autoPlay: { type: Boolean, default: false }
})

const emit = defineEmits(['play', 'pause', 'end', 'error'])

const videoRef = ref(null)
const isPlaying = ref(false)
const isLoading = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const error = ref('')

const togglePlay = () => {
  if (!videoRef.value) return

  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play().catch(err => {
      console.error('播放失败:', err)
      error.value = '播放失败，请重试'
    })
  }
}

const onPlay = () => {
  isPlaying.value = true
  emit('play')
}

const onPause = () => {
  isPlaying.value = false
  emit('pause')
}

const onEnded = () => {
  isPlaying.value = false
  progress.value = 0
  emit('end')
}

const onError = () => {
  error.value = '视频加载失败'
  emit('error')
  isLoading.value = false
}

const onLoaded = () => {
  isLoading.value = false
  duration.value = videoRef.value?.duration || 0
}

const onTimeUpdate = () => {
  if (videoRef.value && duration.value) {
    currentTime.value = videoRef.value.currentTime
    progress.value = (currentTime.value / duration.value) * 100
  }
}

const seek = (e) => {
  if (!videoRef.value) return
  const rect = e.target.getBoundingClientRect()
  const pos = (e.clientX - rect.left) / rect.width
  videoRef.value.currentTime = pos * duration.value
}

const formatTime = (seconds) => {
  if (!seconds) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const retry = () => {
  error.value = ''
  isLoading.value = true
  if (videoRef.value) {
    videoRef.value.load()
  }
}

defineExpose({
  play: () => videoRef.value?.play(),
  pause: () => videoRef.value?.pause(),
  stop: () => {
    if (videoRef.value) {
      videoRef.value.pause()
      videoRef.value.currentTime = 0
    }
    isPlaying.value = false
  }
})

onBeforeUnmount(() => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
})
</script>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  max-width: 920px;
  margin: 20px auto;
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8); /* 加深阴影，更有悬浮感 */
}

.video-container video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover; /* ✅ 关键：让视频像海报一样铺满容器，不留黑边 */
  background: transparent; /* ✅ 背景透明，不遮挡容器样式 */
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-container:hover .video-controls {
  opacity: 1;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
}

.progress {
  height: 100%;
  background: #d4af37;
  border-radius: 2px;
  transition: width 0.1s;
}

.time {
  color: #fff;
  font-size: 11px;
  white-space: nowrap;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(212, 175, 55, 0.3);
  border-top-color: #d4af37;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-overlay button {
  margin-top: 12px;
  padding: 8px 20px;
  background: #d4af37;
  border: none;
  border-radius: 4px;
  color: #2c0e0e;
  cursor: pointer;
}
</style>