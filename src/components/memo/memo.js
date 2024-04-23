'use client'

import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

function Memo (props) {
    const [memoText, setMemoText] = useState('');

    const handleClick = () => {
        // memoText 상태값을 서버로 보냄
        axios.post('/api/memo', { "memo" : memoText, "diaryId" : props.props.diaryId }) // 일기 ID를 통해 각 일기에 대한 메모 입력
            .then(response => {
                console.log('메모가 성공적으로 전송되었습니다.');
            })
            .catch(error => {
                console.error('메모 전송 중 오류가 발생했습니다:', error);
            });
    };

    const handleChange = (event) => {
        // TextField의 값을 업데이트
        setMemoText(event.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ alignSelf: 'flex-end' }}> 
                <Button variant="contained" onClick={handleClick}>제출</Button>
            </div>
            <TextField
                multiline
                fullWidth
                rows={10}
                variant="outlined"
                label="메모"
                value={memoText}
                onChange={handleChange}
                sx={{
                    '& .MuiInputBase-root': {
                        // 내용의 글자 크기를 조절
                        fontSize: '0.9rem',
                        marginLeft: '4.5px'
                    },
                }}
            />
        </div>
    )
}

export default Memo