`use client`

import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import TestChatBot from './bot/ChatBot'

function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(96, 98, 11, 0.8)',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              1 2 3 4 5
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="h5">
              Arcadia
            </Typography>
          </Grid>
          <TestChatBot />
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
