import React from 'react'
const MessageParser = ({ children, actions }) => {
  const parse = async (message) => {
    await actions.HandleApi(message) // 답변 요청하기
    actions.postChat() // 답변 받아오기
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
