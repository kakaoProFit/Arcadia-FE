'use client'

import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

function Mem(props) {
  const [memoText, setMemoText] = useState('')

  const handleClick = () => {
    // memoText 상태값을 서버로 보냄
    fetch('https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/memo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memo: memoText, _id: props.props._id }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('메모가 성공적으로 전송되었습니다.');
    })
    .catch(error => {
      console.error('메모 전송 중 오류가 발생했습니다:', error);
    });
  }

  const handleChange = (event) => {
    // TextField의 값을 업데이트
    setMemoText(event.target.value)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignSelf: 'flex-end' }}>
        <Button variant="contained" onClick={handleClick}>
          제출
        </Button>
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
            marginLeft: '4.5px',
          },
        }}
      />
    </div>
  )
}

export default Mem
