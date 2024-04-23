// 일기 심리분석 결과 보는 페이지

import ReadDirInquery from "@/components/readDiary/readDirInquery"
import axios from "axios"
import Grid from '@mui/material/Unstable_Grid2'
import { Box } from "@mui/material"
import TextField from '@mui/material/TextField'
import MusicPlayer from "@/components/musicPlayer/musicPlayer"
import Memo from "@/components/memo/memo"

function PsyAnlz() {

  let response_data = {
    // 게시글 테스트 데이터
    diaryId: 1,
    writer: '홍길동',
    title: '일기란 무엇인가',
    content: '<h2>오늘의 일기</h2>\n<p>날이 좋았다.</p>',
    dirViews: '100', //조회수
    imageUrl: '',
    musicUrl: 'https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3'
  }

  const psyAnlz_boolean = true //분석 화면일때 넘기는 데이터.

  const handleGetSpecification = async () => {
    try {
      const response = await axios.get('/일기 분석페이지 url', { //여기에 json형식으로 분석내용, 이미지url, 음악url, 일기 아이디
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
    <div style={{ marginTop: '2%' }}>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid xs={6} md={7}> {/* 화면 크기에 따라 너비 조정 */}
            <ReadDirInquery props={response_data} psyAnlz_boolean={psyAnlz_boolean} />
          </Grid>

          <Grid container xs={2} md={5} style={{ marginLeft: '-5%', marginTop: '1%'}} columns={20}>

            <Grid item xs={7} md={7} style={{ marginLeft: '0%', marginTop: '8%' }}>
        
                  <img
                    style={{ width: '250px', height: '250px' }}
                    src={`https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG`}
                    loading="lazy"
                  />
         
            </Grid>
            
            <Grid item xs={13} md={13} style={{marginLeft: '0%', marginTop: '4%'}}>
                  <Memo props={response_data}/>
            </Grid>

            <Grid xs={20} md={20} style={{marginTop: '5%'}}>
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
                    marginTop: '-9%',
                  },
                }}
              />
            </Grid>
          </Grid>

        </Grid>

      </Box>
      <MusicPlayer props={response_data.musicUrl}/>
    </div>
  )
}

export default PsyAnlz
