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
  aspect-ratio: 1 / 1;
  margin: 0 auto;

  .ql-editor {
    min-height: 400px;
    font-size: 16px;
  }
`;

const TextEditor = () => {
  const [text, setText] = useState('');
  const quillRef = useRef();
  const maxCharacters = 500; //입력 최대 글자수

  const handleChange = (content, delta, source, editor) => {
    const newText = editor.getText();
    
    if (newText.length <= maxCharacters) {
      setText(newText);
    } else {// 최대 글자수를 초과한 경우에는 이전 텍스트를 유지, 추가 입력 제한
      const limitedText = text.slice(0, maxCharacters);
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
        {text.length}/{maxCharacters}
      </p>
    </StyledTextEditor>
  );
};

export default TextEditor;
