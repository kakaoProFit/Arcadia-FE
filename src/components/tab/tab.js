'use client'
// 근데 전체적으로 어디서 router를 돌려야할지 감이 안오는데?
import { 
    Box,
    Tabs,
    Tab
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function DiaryListTab() {

    const pathname = usePathname()
    // 탭 props 생성
    let tabProps = []
    // mydiary 페이지라면
    if (pathname === '/diary/mydiary'||
        pathname === '/diary/weekly-report'||
        pathname === '/diary/monthly-report') {
        tabProps = [
            {label:"나의 일기", href:"/diary/mydiary"},
            {label:"주간 분석서", href:"/diary/weekly-report"},
            {label:"월간 분석서", href:"/diary/monthly-report"},
        ]
    }else if(pathname === '/diary/community'||
            pathname === '/diary/friends-diary') {
        tabProps = [
            {label:"공유 일기", href:"/diary/community"},
            {label:"친구 일기", href:"/diary/friends-diary"},
        ]
    }
    
    // 걀극 하드코딩으로 tab 움직임을 설정함.
    let tabNum = 0;
    if (pathname === '/diary/mydiary' || pathname === '/diary/community'){ tabNum = 0 }
    else if(pathname === '/diary/weekly-report' || pathname === '/diary/friends-diary'){ tabNum = 1 }
    else if(pathname === '/diary/monthly-report') tabNum = 2

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={tabNum}
                aria-label="nav tabs"
                role="navigation"
            >
            {tabProps.map((it, index) => (
                <Tab
                component={Link}
                key={index}
                label={it.label}
                href={`${it.href}`}
                />
            ))

            }

            </Tabs>
        </Box>
    )
}