import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // System Prompt 告诉 AI 必须返回 JSON 格式
  const messages = ref([
    {
      role: 'system',
      content: `你是专业的路线规划助手。请严格按以下 JSON 格式返回，不要输出任何其他文本：
{
  "summary": "路线总结",
  "segments": [
    {"from": "起点名", "to": "终点名", "from_coord": [经度, 纬度], "to_coord": [经度, 纬度], "tips": "提示"}
  ],
  "warnings": ["注意1"]
}
若用户追加信息，请基于上一次结果更新 segments。`
    }
  ])

  function addUserMessage(text) {
    messages.value.push({ role: 'user', content: text })
  }

  function addAssistantMessage(text) {
    messages.value.push({ role: 'assistant', content: text })
  }

  return { messages, addUserMessage, addAssistantMessage }
})
