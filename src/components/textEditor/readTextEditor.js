"use client"

import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

const modules = { // Quill의 동작과 기능을 사용자 정의
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [ // 모든 format은 Quill 편집기에서 활성화되고 허용
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
];

const StyledTextEditor = styled.div`
  width: 70%;
  margin: 0 auto;
  height: fit-content;

  .ql-editor {
    min-height: 400px;
    font-size: 16px;
  }

  > * {
    margin-bottom: 20px; /* 버튼과 에디터 사이 간격 */
  }
`;

const ReadTextEditor = () => { // value: 사용자가 입력한 내용, onChage: value를 변경하기 위한 함수

  const [editorContent, setEditorContent] = useState("<p>test</p>\n<h1>test2</h2>"); // QuillEditor 내용 관리
  const router = useRouter();

  useEffect(() => {
    handleGetConsultingSpecification(); // 처음 렌더링 될 때 GET 요청을 보냄
  }, []);

  const handleGetConsultingSpecification = () => {
    fetch('/mypage/${UserId}/Consulting', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // JSON 형태의 응답  -> 이거 추후에 백엔드에서 넘어오는거 보고 수정 필요할듯
        } else {
          console.error('실패');
        }
      })
      .then(data => {
        setEditorContent(data.content); // 받아온 내용을 QuillEditor에 설정
      })
      .catch(error => {
        console.error('오류 발생', error);
      });
  }

  return (
    <StyledTextEditor>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        readOnly={true} // 편집 불가능
        value={editorContent} // 백엔드 측에서 조회된 내용 표시
      />
      <Button variant="contained" onClick={() => router.push("/matching")}>수정</Button> 
    </StyledTextEditor>
  );
};

export default ReadTextEditor;