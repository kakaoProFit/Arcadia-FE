//app/not-found.js

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { Typography } from "@mui/material";
export default function NotFound() {
    return (
    <div className={styles.main}>
        <Typography variant="h2">
            페이지를 찾을 수 없습니다.
        </Typography>
        <Image
            src="/images/404.svg"
            alt="404"
            width={600}
            height={600}
            ></Image>
            <Typography variant="h5"><Link href="/">메인 페이지로 돌아가기</Link></Typography>
        
    </div>
);
}