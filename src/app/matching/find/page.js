'use client'

import React, { useState } from 'react'
import { generateData, regions, symptom } from '@/constants/SpecialistDummy'
import { Grid, Typography, Select, MenuItem, IconButton } from '@mui/material'
import { Card, CardContent, Avatar } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import styles from '@/page.module.css'

const avatars = generateData()

export default function AvatarList() {
  const [selectedRegion, setSelectedRegion] = useState('전체')
  const [selectedSymptom, setSelectedSymptom] = useState('전체')
  const [page, setPage] = useState(0)
  const itemsPerPage = 5

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value)
    setPage(0)
  }

  const handleSymptomChange = (event) => {
    setSelectedSymptom(event.target.value)
    setPage(0)
  }

  const filteredAvatars = avatars.filter((avatar) => {
    const regionMatch =
      selectedRegion === '전체' || avatar.region === selectedRegion
    const symptomMatch =
      selectedSymptom === '전체' || avatar.symptom === selectedSymptom
    return regionMatch && symptomMatch
  })

  const numPages = Math.ceil(filteredAvatars.length / itemsPerPage)

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, numPages - 1))
  }

  const startIndex = page * itemsPerPage
  const visibleAvatars = filteredAvatars.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  return (
    <div className={styles.main}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h6">지역:</Typography>
          </Grid>
          <Grid item>
            <Select value={selectedRegion} onChange={handleRegionChange}>
              <MenuItem value="전체">전체</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Typography variant="h6">증상:</Typography>
          </Grid>
          <Grid item>
            <Select value={selectedSymptom} onChange={handleSymptomChange}>
              <MenuItem value="전체">전체</MenuItem>
              {symptom.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 6 }}
        >
          <Grid item>
            <IconButton onClick={handlePrevPage}>
              <ArrowBack />
            </IconButton>
          </Grid>
          {visibleAvatars.map((avatar, index) => (
            <Grid key={index} item>
              <Card>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        alt={avatar.name}
                        src={avatar.image}
                        sx={{ width: 200, height: 200 }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    textAlign="center"
                    alignItems="center"
                    sx={{ mt: 4 }}
                  >
                    <Typography variant="h5">{avatar.name}</Typography>
                    <Typography variant="body1">{avatar.region}</Typography>
                    <Typography variant="body1">{avatar.symptom}</Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item>
            <IconButton onClick={handleNextPage}>
              <ArrowForward />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
