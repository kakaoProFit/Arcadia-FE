import { Box, Grid } from '@mui/material'
import Player from '@/components/musicPlayer/Player'
import dynamic from 'next/dynamic'
import AnalyzeResults from '@/components/readDiary/analyze-result'

const ReadDirInquery = dynamic(
  () => import('@/components/readDiary/readDirInquery'),
  {
    ssr: false,
  },
)

async function getDiaryAnlz() {
  // 이미지 url, 음악 url 등 정보 가져오기
  const response = await fetch(
    'https://api.arcadiaprofit.shop/diary/DirAnalyze',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  const data = await response.json()

  return data
}

async function getDiaryContent() {
  // 키워드 분석, 감정분석 가져오기
  const response = await fetch('https://api.arcadiaprofit.shop/diary/analyze', {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  const data = await response.json()

  return data
}

async function PsyAnlz() {
  const analyze = await getDiaryAnlz() // 음악, 그림 등 분석 후 나오는 데이터들 불러옴.
  const diaryContent = await getDiaryContent() // 일기 내용, 제목, 조회수 등 일기에 대한 데이터들 불러옴.

  const psyAnlz_boolean = true //분석 화면일때 넘기는 데이터.

  return (
    <div style={{ marginTop: '2%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid xs={6} md={7}>
            {' '}
            {/* 화면 크기에 따라 너비 조정 */}
            <ReadDirInquery
              props={diaryContent}
              psyAnlz_boolean={psyAnlz_boolean}
            />
          </Grid>

          <Grid
            container
            xs={2}
            md={5}
            style={{ marginLeft: '-5%', marginTop: '1%' }}
            columns={20}
          >
            <Grid
              item
              xs={7}
              md={7}
              style={{ marginLeft: '0%', marginTop: '8%' }}
            >
              <img
                style={{ width: '250px', height: '250px' }}
                src={analyze.image_s3_url}
                loading="lazy"
              />
            </Grid>

            <Grid
              item
              xs={13}
              md={13}
              style={{ marginLeft: '0%', marginTop: '4%' }}
            ></Grid>
            <AnalyzeResults props={diaryContent} />
          </Grid>
        </Grid>
      </Box>

      <Player props={analyze.music_s3_url1} />
    </div>
  )
}

export default PsyAnlz
