'use client'
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function SelectSearchCategory() {
  // search 분류 값 핸들링 state 변수
  const [category, setCategory] = useState(20)

  const handleSelectChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="demo-select-small-label">분류</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={category}
          label="분류"
          onChange={handleSelectChange}
        >
          <MenuItem value={10}>작성자</MenuItem>
          <MenuItem value={20}>제목</MenuItem>
          <MenuItem value={30}>내용</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
