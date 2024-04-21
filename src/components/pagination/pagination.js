'use client'
import { Stack, Pagination } from "@mui/material"

export default function DiaryPagination() {
    
    // pagination은 무조건 10개 만드는게 아니라 개수 받아오고 나서 생각을 해봐야 하는데 어카지
    // 지금 화면 사이즈마다 grid 설정을 따로 해놔서 
    return (
        <>
        <Stack spacing={2}>
            <Pagination count={10} />
        </Stack>
        </>
    )
}