'use client'

import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

function ShareButton({diaryId}) {

    const handleClick = () => {
        console.log('Favorite button clicked');
    };

    return (
        <>
            <IconButton onClick={handleClick} aria-label="favorite">
                <ShareIcon />
            </IconButton>
        </>
    )
}

export default ShareButton;