import { Grid } from '@mui/material'
import DiaryCard from '@/components/card/card'

export default function DiaryListPage() {

  // 라우팅 가이드라인
  // 목록 조회 부분도 diary/[slug] 부분으로 모두 이동할듯?
  // 아마 [..slug] 써서 이중으로 목록 조회 이후의 페이지도 표현해야 할거고
  // 내용 조회 페이지는 diary/view/제목 이런 식으로 빼줘야 할 것 같음. 


  //더미 데이터
  // API 호출로 데이터 받아서 뿌릴 예정
  const CARD_DUMMY_DATA = [
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

  // 이후 로그인 토큰 확인해서 로그인 여부, 사용자 이름 props로 전달해야 함.

  // 각 사이즈 별로 데이터 불러오는 개수가 달라야하는가? -> 데이터랑 페이지네이션 개수가 달라짐.
  // 만약 그대로 같은 개수를 부르면 카드가 밑으로 밀림 
  // (그럼 그걸 채우기 위해서 화면 화소마다 api에서 호출하는 데이터 개수를 조절하는게 더 비합리적)
  // 화면 사이즈 xs사이즈일때 1개, sm: 2개, md : 4개, lg : 6개(5개만 부르면 됨)
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2} my={2} alignItems="center" justifyContent="center">
        {CARD_DUMMY_DATA.map((it, index) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
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
