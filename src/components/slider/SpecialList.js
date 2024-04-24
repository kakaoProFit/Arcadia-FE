'use client'

import { useState } from 'react'
import { Grid, Avatar, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { avatars } from '@/constants/SpecialistDummy'

export default function SpecialList() {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    if (startIndex === 0) {
      setStartIndex(avatars.length - 5)
    } else {
      setStartIndex((prevIndex) => Math.max(0, prevIndex - 5))
    }
  }

  const handleNext = () => {
    if (startIndex + 5 >= avatars.length) {
      setStartIndex(0)
    } else {
      setStartIndex((prevIndex) => Math.min(avatars.length - 5, prevIndex + 5))
    }
  }
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ mb: 12 }}
    >
      <Grid item>
        <IconButton onClick={handlePrev}>
          <ArrowBack />
        </IconButton>
      </Grid>
      {avatars.slice(startIndex, startIndex + 5).map((avatar, index) => (
        <Grid key={index} item>
          <Avatar
            alt={avatar.name}
            src={avatar.image}
            sx={{
              width: 200,
              height: 200,
              cursor: 'pointer',
            }}
          />
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={handleNext}>
          <ArrowForward />
        </IconButton>
      </Grid>
    </Grid>
  )
}
