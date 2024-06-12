import {
  QuestionMark,
  PhotoAlbum,
  Forum,
  TipsAndUpdates,
  ThumbUp,
} from '@mui/icons-material'

export default function TabEmoticonSelect({ state }) {
  if (state === 'question') return <QuestionMark />
  else if (state === 'diary') return <PhotoAlbum />
  else if (state === 'free') return <Forum />
  else if (state === 'inform') return <TipsAndUpdates />
  else if (state === 'like') return <ThumbUp />
}
