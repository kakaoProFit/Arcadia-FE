import axios from 'axios'
import { Box, Grid } from '@mui/material'
import Player from '@/components/musicPlayer/Player'
import Mem from '@/components/memo/Mem'
import dynamic from 'next/dynamic'
import AnalyzeResults from '@/components/readDiary/analyze-result'
import { Suspense } from 'react'

const ReadDirInquery = dynamic(
  () => import('@/components/readDiary/readDirInquery'),
  {
    ssr: false,
  },
)



async function getDiaryAnlz() {
  const response = await fetch("https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/diary", {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  console.log(response)
  const data = await response.json()
  console.log("data: ", data)

  return data
}

async function PsyAnlz() {

  const analyze = await getDiaryAnlz()

  let response_data = {
    // 게시글 테스트 데이터
    diaryId: 1,
    writer: '홍길동',
    title: '일기란 무엇인가',
    // content: contents,
    dirViews: '100', //조회수
    imageUrl: '',
    musicUrl: 'https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3',
  }

  const psyAnlz_boolean = true //분석 화면일때 넘기는 데이터.

  // const handleGetSpecification = async () => {
  //   try {
  //     const response = await axios.get('/diary', {
  //       //여기에 json형식으로 분석내용, 이미지url, 음악url, 일기 아이디
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })

  //     if (response.status === 200) {
  //       response_data = response.data
  //     } else {
  //       console.error('실패')
  //     }
  //   } catch (error) {
  //     console.error('오류 발생', error)
  //   }
  // }

  return (
    <div style={{ marginTop: '2%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid xs={6} md={7}>
            {' '}
            {/* 화면 크기에 따라 너비 조정 */}
            <ReadDirInquery
              props={response_data}
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
                src={`https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG`}
                loading="lazy"
              />
            </Grid>

            <Grid
              item
              xs={13}
              md={13}
              style={{ marginLeft: '0%', marginTop: '4%' }}
            >
              <Mem props={response_data} />
            </Grid>
            <AnalyzeResults />
          </Grid>
        </Grid>
      </Box>
      {/* <Suspense fallback={<p>음악을 불러오는 중...</p>}> */}
      <Player props={response_data.musicUrl} />
      {/* </Suspense> */}



    </div>
  )
}

export default PsyAnlz