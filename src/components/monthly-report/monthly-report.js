'use client'
import { Container, Stack, Skeleton } from '@mui/material'

export default function MonthlyReport() {
  return (
    <Container>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" height={300} />
        <Skeleton variant="rectangular" height={200} />
      </Stack>
    </Container>
  )
}
