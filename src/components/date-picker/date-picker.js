'use client'
import React, { useState, useEffect } from 'react'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'
import dayjs from 'dayjs'

export default function DiaryDatePicker() {
  const [cleared, setCleared] = useState(false)
  // 서버에 전달할 기간 변수
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  // onchange 함수를 따로 만들어서 서버에 보내주면 될 듯

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false)
      }, 1500)

      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [cleared])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            format="YYYY-MM-DD"
            mask={'____-__-__'}
            label={'Start Date'}
            value={startDate}
            maxDate={endDate}
            sx={{ width: 200 }}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => setCleared(true),
                size: 'small',
              },
            }}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            format="YYYY-MM-DD"
            mask={'____-__-__'}
            label={'End Date'}
            value={endDate}
            minDate={startDate}
            maxDate={dayjs()}
            sx={{ width: 200 }}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => setCleared(true),
                size: 'small',
              },
            }}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </DemoContainer>
      </Box>
    </LocalizationProvider>
  )
}
