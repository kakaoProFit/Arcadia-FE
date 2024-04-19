"use client"

import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
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

const ReadTextEditor = ({ value }) => { // value: 사용자가 입력한 내용, onChage: value를 변경하기 위한 함수

  return (
    <StyledTextEditor>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        readOnly={true} // 편집 불가능
        value={value} // 전달받은 value를 사용하여 텍스트를 표시
      />
    </StyledTextEditor>
  );
};

export default ReadTextEditor;