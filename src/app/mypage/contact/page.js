// 상담 신청서 조회 페이지
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';

// react-quill을 동적으로 임포트
const ReadTextEditor = dynamic(() => import('@/components/textEditor/readTextEditor.js'), {
    ssr: false
});

function Contact() {
    return (
        <div>
            <div style={{marginLeft: "15%"}}>
                <h2>마이 페이지</h2>
            </div>
            <div style={{marginLeft: "15%"}}>
                <p>탭 컨포넌트 들어갈 자리</p>
            </div>
            <Stack direction="column" alignItems="center" spacing={2}>
                <ReadTextEditor
                    theme="snow"
                />
            </Stack>
        </div>
    )
};

export default Contact;