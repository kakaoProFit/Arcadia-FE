// 일기 심리분석 결과 보는 페이지

import ReadDirInquery from "@/components/readDiary/readDirInquery"
import axios from "axios"
import Grid from '@mui/material/Unstable_Grid2'
import { Box } from "@mui/material"
import TextField from '@mui/material/TextField'
import Image from "next/image"

function PsyAnlz() {

  let response_data = {
    // 게시글 테스트 데이터
    diaryId: 1,
    writer: '홍길동',
    title: '일기란 무엇인가',
    content: '<h2>오늘의 일기</h2>\n<p>날이 좋았다.</p>',
    dirViews: '100', //조회수
  }

  const handleGetSpecification = async () => {
    try {
      const response = await axios.get('/일기 분석페이지 url', { //여기에 json형식으로 분석내용, 이미지url, 음악url
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        response_data = response.data;
      } else {
        console.error('실패');
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };

  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid item xs={6} md={7}> {/* 화면 크기에 따라 너비 조정 */}
            <ReadDirInquery props={response_data} />
          </Grid>
          {/* 분석서 내용(줄글) 불러오는 grid */}
          <Grid container item xs={6} md={5} style={{ marginLeft: '-5%', marginTop: '-2%' }}>

            <TextField
              multiline
              fullWidth
              rows={8}
              variant="outlined"
              value={"분석된 데이터 입니다.\n당신의 기분은 오늘 좋은 편이군요.\n오늘 하루도 고생하셨습니다."}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  // 내용의 글자 크기를 조절
                  fontSize: '0.9rem',
                  marginTop: '20%',
                },
              }}
            />
            {/* 이미지들을 양 옆으로 정렬하기 위해 container 속성 추가 */}
            <Grid container item spacing={2} style={{ marginTop: '-10%' }}>
              <Grid item xs={6} md={6} >
                <img
                  style={{ width: '200px', height: '200px', marginLeft: '70%' }}
                  src={`https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG`}
                  loading="lazy"
                />
              </Grid>
              <Grid item xs={6} md={6} >
                {/* <img
                  style={{ width: '100px', height: '100px', marginLeft: '100%' }}
                  src={`http://contents.kyobobook.co.kr/sih/fit-in/600x0/gift/pdt/1108/S1669255827359.jpg`}
                  loading="lazy"
                /> */}
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      </Box>
    </>
  )
}

export default PsyAnlz
