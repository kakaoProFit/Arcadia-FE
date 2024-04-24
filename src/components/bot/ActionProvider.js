'use client'
import React from 'react'
import { useState } from 'react'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const [answer, setAnswer] = useState(null)

  const postChat = async (question) => { // 질문 보내기
    try {
      const response = await fetch('http://localhost:8000/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "question": question,
        }),
      });
  
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
  
      const data = await response.json();
      await setAnswer(data.chat_history.content);
      const message = createChatBotMessage(data.chat_history.content);
      await setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    } catch (error) {
      console.error('API 요청 중 에러 발생:', error);
      // 에러 처리
    }
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { postChat },
        })
      })}
    </div>
  )
}

export default ActionProvider
