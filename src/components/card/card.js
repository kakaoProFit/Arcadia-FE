'use client'
import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardActionArea from '@mui/material/CardActionArea'
import ButtonBase from '@mui/material/ButtonBase'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { yellow, blue } from '@mui/material/colors'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { Checkbox, Container, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { useRouter } from 'next/navigation'

export default function DiaryCard(props) {
  // props 전달
  const {
    key,
    title,
    nickname,
    cardImage,
    avatarImage,
    isPublic,
    updateDate,
    hits,
    summary,
  } = props

  //router 주입
  const router = useRouter()

  // Notice : 이 state들은 임시. 이후에 page.js나 api 등을 통해 받아옴.
  // 로그인 여부를 확인하기 위한 state 변수
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  // 자신의 일기임을 확인하기 위한 state 변수
  const [isYours, setIsYours] = useState(true)
  // 메인페이지와 아닌 페이지를 구분하기 위한 state 변수
  const [isMain, setIsMain] = useState(false)
  // 프로필 이미지가 있는지 확인하는 state 변수
  const [haveProfileImage, setHaveProfileImage] = useState(false)

  //공감 버튼 이벤트 핸들러
  const favoriteEventHandler = () => {
    // service에 추가한 api가 들어오는 위치
    // 공감 활성, 비활성에 대한 post가 필요
  }

  //프로필 이미지 클릭 이벤트 핸들러
  const profileImageClickEventHandler = () => {
    // 프로필 조회 페이지로 이동하는 Link
  }

  // 해야할 일 2
  // edit버튼 누르면 routing
  // 삭제 버튼 누르면 삭제 dialog + 확인 누르면 api 호출하고 다시 wrapper에서 뿌려야 할듯
  return (
    <Card key={key} sx={{ maxWidth: 250, maxHeight: 425 }}>
      <CardActionArea href="/mypage/myinfo">
        <CardMedia component="img" height="180" image={cardImage} />
      </CardActionArea>
      <CardHeader
        avatar={
          haveProfileImage ? (
            <ButtonBase onClick={profileImageClickEventHandler}>
              <Avatar src={avatarImage} />
            </ButtonBase>
          ) : (
            <ButtonBase onClick={profileImageClickEventHandler}>
              <Avatar sx={{ bgcolor: yellow[700] }}>
                {`${nickname}`[0].toUpperCase()}
              </Avatar>
            </ButtonBase>
          )
        }
        action={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            onChange={favoriteEventHandler}
          />
        }
        title={`${title}`}
        subheader={`${nickname}`}
        sx={{ height: 60 }}
      />
      {!isMain && (
        <CardContent sx={{ height: 105 }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography
                variant="body2"
                align="left"
                sx={{ color: blue[500] }}
              >
                {updateDate}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {isPublic ? (
                <LockOpenIcon sx={{ fontSize: 18 }} />
              ) : (
                <LockIcon sx={{ fontSize: 18 }} />
              )}
            </Grid>
          </Grid>
          <Typography variant="caption" color="textSecondary">
            조회수 : {hits}
          </Typography>
          <Typography variant="body2" mt={1} sx={{ fontSize: 12 }}>
            {summary}
          </Typography>
        </CardContent>
      )}
      {isLoggedIn && isYours && !isMain && (
        <CardActions disableSpacing sx={{ height: 40 }}>
          <IconButton
            aria-label="edit your diary"
            onClick={() => router.push('/diary/write')}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <Checkbox sx={{ marginLeft: 'auto' }} />
        </CardActions>
      )}
    </Card>
  )
}
