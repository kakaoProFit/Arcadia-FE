'use client'
import { useState } from 'react'
import { Container, Pagination } from '@mui/material'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function DiaryPagination(props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  // 현재 페이지 값
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  )
  // 현재 페이지 번호를 쿼리로 설정하는 함수
  const createPageURL = (event, pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber)
    setCurrentPage(Number(params.get('page')))
    // 일단은 하드코딩으로 새로고침이 됨.
    // 추후에 클라이언트 사이드로 랜더링할 수 있도록 하고 page가 바뀌면 데이터를 갈아끼우는 부분이 page.js에 필요함
    router.replace(`${pathname}?page=${params.get('page')}`)
  }
  // page.js에서 받은 게시물 개수 props
  const { diaryCount } = props
  // 나중에 화면 사이즈마다 받아오는 개수가 바뀌면 여기도 state변수로 활용 예정
  const cardsPerPage = 5
  const pageCount = Math.ceil(diaryCount / cardsPerPage)

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <Pagination
          count={pageCount}
          siblingCount={3}
          boundaryCount={2}
          page={currentPage}
          onChange={createPageURL}
        />
      </Container>
    </>
  )
}
