import { Grid } from '@mui/material'
import DiaryCard from './card'
import { fetchCardData } from '@/services/diary-data'

export default async function CardContainer(props) {
  // 현재 페이지, 검색어
  const { currentPage, query } = props
  const res = await fetchCardData(currentPage, query)
  const card_data = res.cards
  console.log(card_data)

  return (
    <div>
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
        {card_data.map((it) => (
          <Grid item xs={2} key={it.id}>
            <DiaryCard
              key={it.id}
              title={it.title}
              nickname={it.nickname}
              cardImage={it.cardImage}
              avatarImage={it.avatarImage}
              isPublic={it.isPublic}
              updateDate={it.updateDate}
              hits={it.hits}
              summary={it.summary}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
