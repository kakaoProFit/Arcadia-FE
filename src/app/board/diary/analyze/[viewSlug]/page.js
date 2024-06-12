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
  userLoginId: 'david5451@gachon.ac.kr',
  userNickname: '초보맘',
  title: '육아란 힘들다...',
  body: '<img src=\'/images/11.jpg\' width="300px" height="auto" align-items="center"/>오늘도 하루가 어떻게 지나갔는지 모르겠다. 아이가 태어난 지 벌써 6개월이 지났지만, 아직도 매일매일이 새로운 도전이다. 모유수유부터 이유식까지, 매 순간이 어렵다. 특히 밤에 잠을 잘 자지 않아서 너무 힘들다. 몇 시간씩 깨있다가 겨우 잠들 때쯤이면 나도 기진맥진이다. 주변에선 다들 괜찮아질 거라고 하지만, 언제쯤 나아질지 모르겠다. <br><br>아이와의 시간을 즐기고 싶지만, 현실은 육아 스트레스로 인해 쉽지 않다. 그래도 아이가 웃을 때마다 모든 걱정이 사라지는 기분이다. 작은 손으로 내 손을 잡아줄 때, 그 따뜻함이 모든 피로를 잊게 해준다. 육아가 쉽지 않지만, 아이와 함께 성장해가며 배우는 과정이라고 생각하려고 노력 중이다. <br><br>앞으로도 많은 어려움이 있겠지만, 아이와 함께하는 이 시간들이 소중하다는 걸 잊지 말아야겠다. 오늘 하루도 무사히 지나갔다는 것에 감사하며, 내일은 좀 더 여유를 가지고 아이와의 시간을 보내야겠다.',
  viewCount: 1,
  likeCnt: 0,
  category: 'diary',
  createdAt: ['2024', '6', '1'],
  answerList: answerData,
  possibleAdopt: false, // 채택 가능 여부
  loadedAnalysis: true, // 분석서 로드 여부
  //comments: comments,
}

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

export default function PsyAnlz() {
  return (
    <div>
      {/* 여기 postData 추후 diaryContent로 바꾸기. */}
      <Post props={postData} />
      <div class="container my-24 mx-auto md:px-6">
        <section class="mb-32 p-4 shadow-xl">
          <p className="my-10 text-center text-3xl font-semibold md:mb-6">
            분석 결과
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mx-auto">
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">기쁨: 68</p>
              </div>
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">슬픔: 23</p>
              </div>
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">분노: 2</p>
              </div>
              <div className="flex items-center">
                <MoodIcon color="primary" sx={{ fontSize: 100 }} />
                <p className="ml-4 text-2xl font-semibold">재앙: 7</p>
              </div>
            </div>
            <div>
              <img
                src="https://arcadiaimage.s3.ap-northeast-2.amazonaws.com/6661964b768a2e2b0ae9ec9c.png"
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
          <Player props="https://arcadiamusic.s3.ap-northeast-2.amazonaws.com/773a5cbd-4b9c-4618-9c1e-e58ccf3cb95f.mp3" />
        </section>
      </div>
    </div>
  )
}
