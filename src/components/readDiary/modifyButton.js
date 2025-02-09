'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

function ModifyButton({ diaryId }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`../../board/diary/modify?diaryId=${diaryId}`)
  }

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        수정
      </Button>
    </>
  )
}

export default ModifyButton
