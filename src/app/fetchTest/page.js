'use client'

import React, { useState } from 'react'

export default function Join() {
  const [res, setRes] = useState(null)
  const data = {
    email: 'youngwoo3@email.com',
    password: 'test123456',
    fullName: 'Imbut',
  }

  async function trySignup(data) {
    console.log('fetching')
    try {
      const response = await fetch('http://arcadia-spring.p-e.kr/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log('done')
      const resData = await response.json()
      setRes(resData)
    } catch (error) {
      console.error('Error during fetch:', error)
      setRes({ error: 'Fetch error' })
    }
  }

  function consoleLog() {
    console.log(res)
    console.log(data)
  }

  return (
    <div>
      <button onClick={() => trySignup(data)}>회원가입</button>
      <button onClick={consoleLog}>콘솔</button>
      {res && <div>{JSON.stringify(res)}</div>}
    </div>
  )
}
