import { Grid } from '@mui/material'
import DiaryCard from '@/components/card/card'
import DiaryDatePicker from '@/components/date-picker/date-picker'
import DiaryListTab from '@/components/tab/tab'

export default function DiaryListPage() {
  // 라우팅 가이드라인
  // 목록 조회 : diary/[diaryListSlug]
  // 일기 nav는 default로 diary/mydiary, 게시판 nav는 default로 diary/community 로 이동
  // 내용 조회 페이지는 diary/[diaryListSlug]/[diaryContentSlug]

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
      summary:
        '오늘 하루 전체적으로 보람찼다. 이유는 오늘 벚꽃이 아름답기 때문이었다.',
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
      <br />
      <br />
      <br />
      <DiaryDatePicker />
      <br />
      <br />
      <br />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        my={2}
        alignItems="center"
        justifyContent="center"
      >
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
