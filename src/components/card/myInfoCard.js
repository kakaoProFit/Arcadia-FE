'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Stack } from '@mui/material';

function MyInfoCard() {
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 275, border: '2px', mb: 2}}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" >
                        계정 공개 허용
                    </Typography>
                </CardContent>
                <CardActions>
                    <Switch />
                </CardActions>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: 275, border: '2px', mb: 40 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" >
                        알림
                    </Typography>
                </CardContent>
                <CardActions>
                    <Switch />
                </CardActions>
            </Box>
            <Button variant="outlined" color="error" sx={{ml: 40}}>회원 탈퇴</Button>
        </div>

    )
}

export default MyInfoCard

