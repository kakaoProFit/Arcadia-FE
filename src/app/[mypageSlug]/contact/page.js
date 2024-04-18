// 매칭 신청서 페이지

import TextEditor from "@/components/textEditor/page.js";

function Contact () {
    return(
        <>
            <TextEditor />
        </>
    )
}

export async function getStaticPaths() { // 지금 mypageSlug에 데이터가 없으니까 더미 데이터로 테스트 하는 함수.
    // 임시 값을 정의
    const paths = [
        { params: { mypageSlug: '1' } },
        { params: { mypageSlug: '2' } },
    ];

    return {
        paths,
        fallback: false // fallback을 false로 설정하여 임시 값 이외의 경로로의 접근을 404 페이지로 리다이렉션
    };
}

export default Contact;