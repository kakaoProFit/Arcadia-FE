"use client"

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'; // Dynamic Import. Quill Editor를 서버 측 모듈에 포함하지 않고, 런타임시에 모듈을 import할 수 있다.
import styled from 'styled-components';

const QuillWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = { //모듈을 사용하면 Quill의 동작과 기능을 사용자 정의할 수 있다.
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
    //   ['link', 'image', 'video'], // 요구사항에 없는 기능이라 일단 제외
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const formats = [ //에디터에서 지원하는 서식(글꼴, 헤더, 목록 등)을 정의
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
    // 'link', // 요구사항에 없는 기능이라 일단 제외.
    // 'image',
    // 'video',
  ]

  // 스타일드 컴포넌트를 이용하여 텍스트 에디터 스타일링
    const StyledTextEditor = styled.div`
    width: 70%; 
    aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
    margin: 0 auto; /* 가운데 정렬 */

    /* Quill 에디터의 스타일을 수정 */
    .ql-editor { /* 높이는 조절되지 않아서, quill 속성에서 직접 고쳐야 함 */
        min-height: 400px; /* 에디터 내용의 최소 높이 */
        font-size: 16px; /* 폰트 사이즈 변경 */
    }
    `;

const TextEditor = () => {
    return(
        <>
            <StyledTextEditor>
                <QuillWrapper 
                    modules={modules} 
                    formats={formats} 
                    theme="snow" 
                    StyledTextEditor
                />
            </StyledTextEditor>
        </>
    );
};

export default TextEditor;

