// 일기 조회(자세히 보기) 페이지
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';

// react-quill을 동적으로 임포트
const ReadDirInquery = dynamic(() => import('@/components/readDiary/readDirInquery.js'), {
    ssr: false
});

function DirInquery(props) {
    console.log(props.params.viewSlug);

    let response_data = "<h2>일기 조회</h2>"

    const handleGetConsultingSpecification = () => {
        fetch('/diary/list/DirInquery', {
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
                response_data = data
            })
            .catch(error => {
                console.error('오류 발생', error);
            });
    }

    return (
        <div>
            <div style={{ marginLeft: "15%" }}>
                <h2>일기 조회</h2>
            </div>
            <Stack direction="column" alignItems="center" spacing={2}>
                <ReadDirInquery
                    theme="snow"
                    props={response_data}
                />
            </Stack>
        </div>
    )
};

export default DirInquery;

