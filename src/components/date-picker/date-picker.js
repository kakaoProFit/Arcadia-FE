'use client'
import React, { useState, useEffect } from 'react'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'
import dayjs from 'dayjs'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function BoardDatePicker() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [cleared, setCleared] = useState(false)
  // 서버에 전달할 기간 변수
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  // onchange 함수를 따로 만들어서 서버에 보내주면 될 듯

  useEffect(() => {
    console.log('set time check')
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false)
      }, 1500)

      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [cleared])

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      //이거 활성화되면 검색창 못쓰게 막는 것도 해야할거같은데..? 이거 api 어떻게 가려나
      // query에 넣어서 보낼거면 검색창 못쓰는게 맞고 새로 변수를 만들어서 보내면 검색창 써도 상관 없긴 해
      console.log('date change')
    }
  }, [startDate, endDate])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          // width: '200',
          // height: '200',
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
