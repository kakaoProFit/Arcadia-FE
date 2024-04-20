'use client'
import { Grid } from '@mui/material'
import DiaryCard from './card'

export default function CardWrapper() {
  //더미 데이터
  // API 호출로 데이터 받아서 뿌릴 예정
  const DUMMY_DATA = [
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
    {
      title: '보람찬 하루',
      nickname: '원우형',
      cardImage: '',
      avatarImage: '',
      isPublic: false,
      updateDate: '2024-04-17',
      hits: 76,
      summary: '오늘 하루 전체적으로 보람찼다. 이유는 ...',
    },
  ]

  // 1.일기 데이터 get api 호출 함수
  // -> page.js에서 받아서 이 파일로 전달이 맞다고 함.

  // 2. 로그인 여부 확인 함수 (토큰)

  // 3. 메인페이지 여부 확인 함수
  //(카드를 쓰는 해당 페이지에서 useRouter를 통해 이 페이지로 전달)

  //아 Grid 위치를 못잡겠어 spacing이 뭐고 ms가 뭐고 으아아아
  return (
    <>
      <Grid container spacing={1} m={2}>
        {DUMMY_DATA.map((it, index) => (
          <Grid item xs={2.4} key={index}>
            <DiaryCard
              key={index}
              title={it.title}
              nickname={it.nickname}
              cardImage={it.cardImage}
              avatarImage={it.avatarImage}
              isPublic={it.isPublic}
              updateDate={it.updateDate}
              hits={it.updateDate}
              summary={it.summary}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
