'use client'

import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import LikeButton from './likeButton';
import ShareButton from './shareButton';
import ModifyButton from './modifyButton';
import { useEffect, useState } from 'react';

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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;

  justify-content: flex-end; /* 내용을 오른쪽으로 이동 */

`;
const InfoTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;

  justify-content: center; 
`;
const InfoItem = styled.div`
  margin-right: 20px;
`;
const InfoText = styled.p` 
  font-size: 14px; //글자 크기 조정
`;

const ReadDirInquery = (props) => {

  const [currentUser, setCurrentUser] = useState("홍길동");
  useEffect(() => {
    // 로컬 스토리지에서 현재 로그인된 사용자 정보를 가져옵니다.
    const loggedInUser = localStorage.getItem('userId');
    setCurrentUser("홍길동"); 
  }, []);

  const isCurrentUserAuthor = currentUser === props.props.writer; //현재 로그인된 user의 ID와 게시글 작성자의 ID가 같은지 아닌지 판별

  return (
    <>
      <StyledTextEditor>
        <InfoTitle>
          <h3>제목: {props.props.title}</h3>
        </InfoTitle>
        <InfoWrapper>
          <InfoItem>
            <InfoText>작성자: {props.props.writer}</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoText>조회수: {props.props.dirViews}</InfoText>
          </InfoItem>
        </InfoWrapper>
        {/* 일기 본문 */}
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          readOnly={true} // 편집 불가능
          value={props.props.content} // 백엔드 측에서 조회된 내용 표시
        />
        <InfoWrapper>
          {/* 이거 우선 어떻게 diaryId가 넘어올지 모르는데, 여기로 diary id 넘겨줘야함. */}
          <LikeButton diaryId={props.props.diaryId} />
          <ShareButton diaryId={props.props.diaryId} />
        </InfoWrapper>
      </StyledTextEditor>
      {/* 일기 작성자ID = 로그인된 사용자ID 일때만 아래 수정 버튼 활성화 */}
      {isCurrentUserAuthor && (
        <ModifyButton diaryId={props.props.diaryId} />
      )}
    </>
  )
}

export default ReadDirInquery;

