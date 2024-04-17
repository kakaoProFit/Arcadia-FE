// 매칭 신청서 페이지

import TextEditor from "../../../components/textEditor/page.js";

function Contact () {
    return(
        <>
            <TextEditor />
        </>
    )
}

export async function getStaticPaths() { // 지금 mypageSlug에 데이터가 없으니까 더미 데이터로 테스트 하는 함수.
    // 임시 값을 정의합니다.
    const paths = [
        { params: { mypageSlug: '1' } },
        { params: { mypageSlug: '2' } },
        // 필요한 만큼 임시 값을 추가할 수 있습니다.
    ];

    return {
        paths,
        fallback: false // fallback을 false로 설정하여 임시 값 이외의 경로로의 접근을 404 페이지로 리다이렉션합니다.
    };
}

export default Contact;