'use client';
import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function DiaryCard() {

    // 해야될 일
    // 1. 사이즈 조정
    // 2. checkbox 내부 props 확인하고 설정
    // Avatar 부분도 프로필 이미지 받아 와야해서 바꿔줘야함
    // 3. 서버에서 데이터 받아서 뿌려줄 때 어떻게 할지 구멍 뚫어놓고 
    // 4. login했을 때 안했을 때 달라지는 부분을 정의해줘야 함.
    // 프로필 이미지가 없을 때는 기본 색깔에다가 닉네임 앞글자 따서 해주면 될듯 nickname[0]으로

    //더미 데이터
    const DUMMY_DATA =
        {
            title : '보람찬 하루',
            nickname : '원우형',
            cardImage : '',
            avatarImage : '',
            public : false,
            updateDate : '2024-04-17',
            hits : 76,
            summary : '오늘 하루 전체적으로 보람찼다. 이유는 ...',
        }
        

    // 자신의 일기임을 확인하기 위한 state 변수
    const [isYours, setIsYours] = useState(true);
    // 메인페이지와 아닌 페이지를 구분하기 위한 state 변수
    const [isMain, setIsMain] = useState(true);
    // 프로필 이미지가 있는지 확인하는 state 변수
    const [haveProfileImage, setHaveProfileImage] = useState(false);
    
    //공감 버튼 이벤트 핸들러
    const favoriteEventHandler = {
        // service에 추가한 api가 들어오는 위치
        // 공감 활성, 비활성에 대한 post가 필요 
    }


  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        height="200"
        image=""
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: yellow[700] }} >
            R
          </Avatar>
        }
        action={
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color : 'red'}}/>} onChange={favoriteEventHandler} />
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
        {!isMain &&
        <CardContent>
            <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
            </Typography>
        </CardContent>
        }
        {isYours && !isMain
            && <CardActions disableSpacing>
            <IconButton aria-label="edit your diary">
            <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
            <DeleteIcon />
        </IconButton>
        <Checkbox sx={{marginLeft : 'auto'}}/>
        </CardActions>
        }
    </Card>
  );
}