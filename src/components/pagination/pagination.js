'use client'
import { Container, Pagination } from '@mui/material'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function BoardPagination(props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const createPageURL = (event, pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber)
    router.replace(`${pathname}?${params.toString()}`)
  }

  // page.js에서 받은 게시물 개수 props
  const { totalPageCount, currentPage } = props
  console.log('page number, ', props)

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
          count={totalPageCount}
          siblingCount={3}
          boundaryCount={2}
          page={currentPage}
          onChange={createPageURL}
        />
      </Container>
    </>
  )
}
