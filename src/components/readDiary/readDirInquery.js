'use client'

import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import LikeButton from './likeButton';
import ShareButton from './shareButton';

const modules = {
  // Quill의 동작과 기능을 사용자 정의
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
}

const formats = [
  // 모든 format은 Quill 편집기에서 활성화되고 허용
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
]

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


const ReadDirInquery = (props) => { 

  return (
    <>
      <div className="test">
       {/* 이거 우선 어떻게 diaryId가 넘어올지 모르는데, 여기로 diary id 넘겨줘야함. */}
        <LikeButton diaryId={props.props}/> 
        <ShareButton diaryId={props.props}/>
      </div>
      <StyledTextEditor>
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          readOnly={true} // 편집 불가능
          value={props.props} // 백엔드 측에서 조회된 내용 표시
        />
      </StyledTextEditor>
    </>
  )
}

export default ReadDirInquery;

