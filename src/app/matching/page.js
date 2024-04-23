'use client';

import { useState } from 'react';
import { Grid, Avatar, IconButton, Button, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Image from 'next/image';
import styles from '@/page.module.css';
import { generateData } from '@/constants/SpecialistDummy';

const dummy = generateData();

// 매칭 페이지에서 전문가 리스트를 슬라이더로 보여주는 컴포넌트
export default function Page() {
    const avatars = dummy.slice(0, 10);
    const [startIndex, setStartIndex] = useState(0);

    const handlePrev = () => {
        if (startIndex === 0) {
            setStartIndex(avatars.length - 5);
        } else {
            setStartIndex((prevIndex) => Math.max(0, prevIndex - 5));
        }
    };

    const handleNext = () => {
        if (startIndex + 5 >= avatars.length) {
            setStartIndex(0);
        } else {
            setStartIndex((prevIndex) => Math.min(avatars.length - 5, prevIndex + 5));
        }
    };

    return (
        <div className={styles.main}>
            <Typography variant="h3" align="center" sx = {{ mb: 6 }}>
                인기 많으신 전문가분들
            </Typography>
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx = {{ mb: 12 }}>
                <Grid item>
                    <IconButton onClick={handlePrev}><ArrowBack /></IconButton>
                </Grid>
                {avatars.slice(startIndex, startIndex + 5).map((avatar, index) => (
                        <Grid key={index} item>
                            <Avatar
                                alt={avatar.name}
                                src={avatar.image}
                                sx={{
                                    width: 200,
                                    height: 200,
                                    cursor: 'pointer'
                                }}
                            />
                        </Grid>
                    ))}
                <Grid item>
                    <IconButton onClick={handleNext}><ArrowForward /></IconButton>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Image src="/images/dummy.jpg" width={800} height={400} alt="더미 이미지"></Image>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item><Button>더 많은 전문가 찾기</Button></Grid>
            </Grid>
        </div>
    );
}
