'use client'

import React from 'react'
import Post from '@/components/Post'
import MoodIcon from '@mui/icons-material/Mood'
import Player from '@/components/musicPlayer/Player'

const diaryContent = {
  writer: '우울증유저',
  title: '우울증이란?',
  dirViews: 0,
  content: `asdasdsadsadasdas`,
}
export default function PsyAnlz() {
  return (
    <div>
      <Post props={diaryContent} />
      <div className="container my-24 mx-auto md:px-6">
        <section className="mb-32 p-4 shadow-xl">
          <p className="my-10 text-center text-3xl font-semibold md:mb-6">
            분석 결과
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mx-auto">
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">기쁨: 90</p>
              </div>
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">슬픔: 2</p>
              </div>
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">분노: 1</p>
              </div>
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">재앙: 7</p>
              </div>
            </div>
            <div>
              <img
                src="/images/user1.jpg"
                alt="psy"
                width="500px"
                height="500px"
              />
              <p className="mt-3 text-2xl font-semibold">추천 이미지</p>
            </div>
          </div>
          <p className="my-10 text-center text-3xl font-semibold md:mb-6">
            추천 음악
          </p>
          <Player props="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
        </section>
      </div>
    </div>
  )
}
