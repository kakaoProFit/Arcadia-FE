// 매칭 신청서 등록 페이지

import Stack from '@mui/material/Stack';
import dynamic from 'next/dynamic';

const TextEditorNoSSR = dynamic(() => import('@/components/textEditor/textEditor.js'), {
    ssr: false
});

function Matching() {
    return (
        <>
            <Stack direction="column" alignItems="center" spacing={2}>
                <TextEditorNoSSR />
            </Stack>
        </>
    )
};

export default Matching;