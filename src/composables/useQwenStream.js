import { ref } from 'vue'

export function useQwenStream() {
  const rawText = ref('')
  const isStreaming = ref(false)
  const error = ref(null)
  const parsedRoute = ref(null)

  async function send(messages) {
    isStreaming.value = true
    error.value = null
    rawText.value = ''
    parsedRoute.value = null

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
      const res = await fetch(`${apiBase}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      })
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // 处理跨 Chunk 分割

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const dataStr = line.slice(6).trim()
          if (dataStr === '[DONE]') break
          try {
            const json = JSON.parse(dataStr)
            if (json.content) rawText.value += json.content
            if (json.error) error.value = json.error
          } catch {}
        }
      }

      // 提取 JSON 对象
      const jsonMatch = rawText.value.match(/\{[\s\S]*\}/)
      if (jsonMatch) parsedRoute.value = JSON.parse(jsonMatch[0])
    } catch (err) {
      error.value = err.message
    } finally {
      isStreaming.value = false
    }
  }

  return { rawText, isStreaming, error, parsedRoute, send }
}
