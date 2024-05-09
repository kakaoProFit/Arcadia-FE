import { Grid, Skeleton } from '@mui/material'

export default function CardSkeleton() {
  // new array 선언해서 하는 것도 가능. 그냥 이렇게 했음.
  const card_count_array = [1, 2, 3, 4, 5]
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        mb: 5,
      }}
    >
      {card_count_array.map((it) => (
        <Grid item xs={2} key={it}>
          {/* 카드 사이즈랑 맞추면 됨. */}
          <Skeleton variant="rectangle" width={250} height={425} />
        </Grid>
      ))}
    </Grid>
  )
}
