
import Stack from '@mui/material/Stack'
import dynamic from 'next/dynamic'
import { Grid, Typography } from '@mui/material'
import styles from '@/page.module.css'

const TextEditorNoSSR = dynamic(
  () => import('@/components/textEditor/textEditor.js'),
  {
    ssr: false,
  },
)

const baseUrl = '/mypage/${UserId}/Consulting' // 매칭 신청서 등록할 때 버튼에 쓰일 url
const submitUrl = '/mypage/matching' // 신청서 작성 완료 후 등록하면 조회 페이지로 자동 이동

export default function Page() {
  return (
    <div className={styles.main}>
      <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography component="h1" variant="h3" sx = {{ fontWeight: 700 }}>
          매칭 신청서 작성
        </Typography>
        <Grid item xs={12}>
          <Stack direction="column" alignItems="center" sx={{ width: '100%', paddingTop: '20px' }}>
            <TextEditorNoSSR
              baseUrl={baseUrl}
              submitUrl={submitUrl}
              sx={{ width: '100%', height: '600px'}}
            />
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
