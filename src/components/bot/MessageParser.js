import React from 'react'
const MessageParser = ({ children, actions }) => {
  const parse = async (message) => {
    await actions.postChat(message) // 질문 보내기
  }
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        })
      })}
    </div>
  )
}

export default MessageParser
