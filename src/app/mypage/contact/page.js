// 매칭 신청서 페이지
"use client"

// import TextEditor from "@/components/textEditor/page.js";
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';

const TextEditorNoSSR = dynamic(() => import('@/components/textEditor/page.js'), {
    ssr: false
  });

function Contact() {
    const [editorContent, setEditorContent] = useState(''); // 텍스트 에디터에서 입력한 내용

    // 등록 버튼을 클릭했을 때 실행될 함수
    const handleSubmit = () => {
        fetch('/mypage/${UserId}/Consulting', {
            method: 'POST',
            body: JSON.stringify({ content: editorContent }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('전송 성공!');
                } else {
                    console.error('전송 실패');
                }
            })
            .catch(error => {
                console.error('오류 발생', error);
            });
        }

        return (
            <>
                <TextEditorNoSSR
                    value={editorContent} // 현재 에디터의 내용을 전달
                    onChange={setEditorContent}
                />
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    등록
                </Button>
            </>
        )
    
};

export default Contact;