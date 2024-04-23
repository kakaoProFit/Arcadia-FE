'use client'

import styles from './page.module.css'
import DiaryCard from '@/components/card/card'
import { Grid, Box, Button, Typography } from '@mui/material'
export default function Home() {
  const card1 = [
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

  const DisplayCard = ({cardData}) => {
    const dis = cardData.slice(0, 6);

    return (
      <Grid container spacing={2}>
      {dis.map((it, index) => (
        <Grid key={index} item xs={4}>
          <DiaryCard
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
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Button variant="contained" color="green" size="large">더보기</Button>
      </Grid>
    </Grid>
    )
  }

  return (
    <div className={styles.main}>
      <h1>메인 페이지</h1>
      <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
          {/* 좌상단 */}
          <Grid item="item" xs={6}>
              <Box p={2}>
                <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: 'black' }}
                href="/">
                  공유 일기
                </Typography>
                <DisplayCard cardData={card1} />
              </Box>
          </Grid>
          {/* 우상단 */}
          <Grid item="item" xs={6}>
              <Box p={2}>
                <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: 'black' }}
                href="/">
                  급상승 일기
                </Typography>
                <DisplayCard cardData={card1} />
              </Box>
          </Grid>
          {/* 좌하단 */}
          <Grid item="item" xs={6}>
              <Box p={2}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: 'black' }}
                href="/">
                  최신 일기
                </Typography>
                <DisplayCard cardData={card1} />
              </Box>
          </Grid>
          {/* 우하단 */}
          <Grid item="item" xs={6}>
              <Box p={2}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: 'black' }}
                href="/">
                  인기 일기
                </Typography>
                <DisplayCard cardData={card1} />
              </Box>
          </Grid>
      </Grid>
    </div>
  )
}
