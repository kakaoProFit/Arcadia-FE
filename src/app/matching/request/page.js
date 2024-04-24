'use client'

import {
  Divider,
  Grid,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import styles from '@/page.module.css'
import React from 'react'

export default function Page() {
  const data = [
    {
      name: '박명수',
      location: '서울',
      field: '우울증',
    },
  ]

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const clickEvent = () => {
    handleOpen()
    // API로 데이터 전송하는 코드 추가 필요
  }

  return (
    <div className={styles.main}>
      <Grid
        container
        spacing={2}
        sx={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Typography component="h1" variant="h3" sx={{ fontWeight: 700 }}>
          매칭 페이지
        </Typography>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Avatar
              alt="Person"
              src="/images/user1.jpg"
              sx={{ width: 200, height: 200, mt: 8, mb: 4 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 4 }}>
              전문가 이름: {data[0].name}
              <Divider sx={{ width: '120%', mt: 2 }} />
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, ml: 2, mt: 2 }}>
              지역: {data[0].location}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, ml: 2, mt: 2 }}>
              전문 분야: {data[0].field}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={clickEvent}
              size="large"
              sx={{ mt: 4 }}
            >
              신청
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>신청 완료</DialogTitle>
        <DialogContent>
          <Typography>신청이 완료되었습니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
