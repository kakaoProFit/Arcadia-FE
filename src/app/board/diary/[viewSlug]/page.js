'use client'

import Comment from '@/components/comment/comment'
import Answer from '@/components/comment/Answer'
import Post from '@/components/Post'
import React, { useState, useEffect } from 'react'

export default function ViewPost({ params }) {
  const [post, setPost] = useState(null) // 포스트 상태 추가

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://spring.arcadiaprofit.shop/boards/read/free/${params.viewSlug}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const postData = await response.json()
        setPost(postData) // 데이터 도착시 상태 업데이트
      } catch (error) {
        console.error('Error during fetch:', error)
      }
    }

    fetchData() // useEffect에서 데이터 가져오기
  }, [params.viewSlug]) // params.viewSlug이 변경될 때마다 호출

  const commentData = [
    {
      id: 1,
      name: '우울증유저',
      comment: '잘 보고 갑니다.',
    },
    {
      id: 2,
      name: '헤헤',
      comment: '좋은 글이네요.',
    },
  ]

  const answerData = [
    {
      avatar: '/images/user2.jpg',
      writer: 'Aespa',
      content: `소고기 등심에 설탕 4스푼, 물엿 2스푼을 넣어요.
        거기에 매실액(저는 깔라마시 꿀로 대체)
        다진마늘 3스푼, 간장 12스푼 후추 약간을 넣고 주물러 양념이 배게 해줍니다.
        여기에 참기름 1스푼을 넣고 주물러 30분 기다려줘요.
        기다리는 동안 야채와 버섯 손질도 샤샤샥^^
        버섯 손질법 레시피
        재워 둔 고기에 야채를 모두 넣고 참기름을 2스푼 더 첨가한 뒤 섞어주고 센 불에 구우면 끝!
        아아, 제가 했지만 너무 맛있어요 ㅠㅜ ㅎㅎㅎ 혹시라도 고기 냄새에 좀 민감하시면 청주나 맛술 한스푼 추가 추천해요~
        밥에 올려서 촵촵 정말 맛있게 먹었어요 :)`,
      date: '2021-10-12',
      isAdopted: false, // 채택된 답변인지 여부
    },
    {
      avatar: '/images/user1.jpg',
      writer: 'Ive',
      content: `대파는 송송 썬다.
        팬에 기름을 두르고 닭을 굽듯이 볶는다.
        팬
        송송 썬 대파를 넣고 함께 볶는다.
        닭이 어느 정도 익으면 설탕을 넣는다.
        가운데에 자리를 만들어 간장을 넣고 볶는다.
        물, 다진마늘을 넣고 국물이 자작할 때까지 졸인다.
        꽈리고추를 넣고 빠르게 볶은 후 불을 끈다.
        후추, 통깨를 뿌려 완성한다.`,
      date: '2021-10-12',
      isAdopted: true, // 채택된 답변인지 여부
    },
  ]
  const postData = {
    id: 1,
    title: '제목',
    writer: '작성자',
    body: '내용',
    dirViews: 100,
    likeCnt: 10,
    category: 'diary',
    createdAt: ['2021', '10', '12'],
    answerList: answerData,
    possibleAdopt: false, // 채택 가능 여부
    loadedAnalysis: true, // 분석서 로드 여부
  }

  const [category, setCategory] = useState('diary')
  console.log(post)
  return (
    <div>
      {/* {post && <Post props={postData} />}{' '} */}
      <Post props={postData} />
      {/* 데이터가 도착한 경우에만 Post 컴포넌트 렌더링 */}
      <button onClick={() => setCategory('question')}>질문</button>
      <button onClick={() => setCategory('free')}>질문이 아닌 경우</button>
      {category === 'question' ? (
        <Answer props={answerData} />
      ) : (
        <Comment props={commentData} />
      )}
    </div>
  )
}
