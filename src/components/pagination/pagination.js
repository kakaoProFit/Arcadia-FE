'use client'
import { useState } from "react"
import { Container, Pagination } from "@mui/material"

export default function DiaryPagination(props) {
    
    const {diaryCount} = props
    // 나중에 화면 사이즈마다 받아오는 개수가 바뀌면 여기도 state변수로 활용 예정 
    const cardsPerPage = 5
    const pageCount = Math.ceil(diaryCount/cardsPerPage)
    
    // 현재 페이지 값
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 클릭 이벤트 핸들러
    function onClickPage(e, page) {
        setCurrentPage(page);
    }
    // 페이지 어떻게 변하게 해줄지 알아봐야 함. 

    return (
        <>
        <Container sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <Pagination 
                count={pageCount} 
                siblingCount={3} 
                boundaryCount={2}
                page={currentPage}
                onChange={onClickPage}
            />
        </Container>
        </>
    )
}