'use client'

import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

function LikeButton({ diaryId }) {
    const [liked, setLiked] = useState(false); // 좋아요 상태를 저장하는 상태 변수

    // 페이지가 로딩될 때 좋아요 상태를 가져오는 함수
    useEffect(() => {
        axios.get('/${diaryId}/LikePost')
            .then(response => {
                // 받아온 데이터에 따라 좋아요 상태를 설정 - boolean값으로 전달 받겠지?
                setLiked(response.data.liked);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); // 빈 배열을 전달하여 페이지 로딩 시 한 번만 실행되도록 설정

    const handleClick = () => {
        if (liked) { // 이미 좋아요가 눌려있다면 취소 요청 보내기

            setLiked(false) //test용 문장임. 추후 백엔드 연동되면 이 줄 지우기

            axios.post(`/${diaryId}/LikeDiary`, { like: false })
                .then(response => {
                    setLiked(false); // 취소 성공 시 liked 상태를 false로 변경
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else { // 좋아요 누르지 않은 경우 좋아요 요청 보내기

            setLiked(true) //test용 문장임. 추후 백엔드 연동되면 이 줄 지우기

            axios.post(`/${diaryId}/LikeDiary`, { like: true })
                .then(response => {
                    setLiked(true); // 좋아요 성공 시 liked 상태를 true로 변경
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <>
            <IconButton onClick={handleClick} aria-label="favorite">
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} {/* liked 상태에 따라 다른 아이콘을 표시 */}
            </IconButton>
        </>
    )
}

export default LikeButton;