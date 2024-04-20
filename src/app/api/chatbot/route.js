import { NextResponse } from 'next/server'

export async function GET() {
  // chatbot의 답변 받기
  const data = {
    message: 'ai를 통해 받아온 답변',
    user: 'user',
    time: 'time',
  }
  return NextResponse.json({ data })
}

export async function POST(request) {
  const res = await request.json()
  console.log('post')
  return NextResponse.json({ res })
}
