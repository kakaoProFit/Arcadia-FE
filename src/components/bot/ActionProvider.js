import React from 'react'
import getChatBotResponse from './GetChatBotResponse'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const getData = getChatBotResponse()

  const getResponse = () => {
    // get api
    const message = createChatBotMessage(getData.data.message)
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }

  const postChat = async (message) => {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    const data = await response.json()
    return data
  }
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { getResponse, postChat },
        })
      })}
    </div>
  )
}

export default ActionProvider
