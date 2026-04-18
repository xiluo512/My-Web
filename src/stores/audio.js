import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const currentCity = ref(null) // 当前播放的城市代码
  const audioInstance = ref(null) // 音频实例引用

  // 播放城市音频
  function play(cityCode, audioSrc) {
    // 停止上一个
    if (audioInstance.value) {
      audioInstance.value.pause()
      audioInstance.value = null
    }

    // 播放新的
    const audio = new Audio(audioSrc)
    audio.play().catch(err => console.error('播放失败:', err))

    currentCity.value = cityCode
    audioInstance.value = audio

    // 播放结束清理
    audio.onended = () => {
      currentCity.value = null
      audioInstance.value = null
    }
  }

  // 停止播放
  function stop() {
    if (audioInstance.value) {
      audioInstance.value.pause()
      audioInstance.value = null
      currentCity.value = null
    }
  }

  // 切换播放（播放/暂停）
  function toggle(cityCode, audioSrc) {
    if (currentCity.value === cityCode && audioInstance.value) {
      if (audioInstance.value.paused) {
        audioInstance.value.play()
      } else {
        audioInstance.value.pause()
      }
    } else {
      play(cityCode, audioSrc)
    }
  }

  return {
    currentCity,
    play,
    stop,
    toggle
  }
})