"use client"

import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';

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
`;

const TextEditor = ({ value, onChange }) => { // value: 사용자가 입력한 내용, onChage: value를 변경하기 위한 함수
  const quillRef = useRef();
  const maxCharacters = 500; //입력 최대 글자수

  const handleChange = (content, delta, source, editor) => {
    const newText = editor.getText();
    
    if (newText.length <= maxCharacters) {
      onChange(newText); // 변경된 텍스트를 상위 컴포넌트로 전달
    } else {// 최대 글자수를 초과한 경우에는 이전 텍스트를 유지, 추가 입력 제한
      const limitedText = newText.slice(0, maxCharacters);
      // Quill Editor의 내용을 이전 내용으로 되돌림
      const quillEditor = quillRef.current.getEditor();
      quillEditor.setText(limitedText);
    }
  };

  return (
    <StyledTextEditor>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={handleChange}
      />
      <p>
        {value.length}/{maxCharacters}
      </p>
    </StyledTextEditor>
  );
};

export default TextEditor;
