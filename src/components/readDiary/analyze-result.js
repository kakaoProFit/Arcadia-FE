import React from "react"
import {TextField, Grid} from '@mui/material'

export default function AnalyzeResults(props) {

    return (
        <Grid xs={20} md={20} style={{ marginTop: '5%' }}>
              <TextField
                multiline
                fullWidth
                rows={8}
                variant="outlined"
                value={
                    
                    `일기 키워드\n${props.props.key_phrase} \n\n당신의 기분은?\n `
                    +
                    `${JSON.stringify(props.props.emotion).substring(1, JSON.stringify(props.props.emotion).length - 1)}`
                    +
                    `\n\n\n오늘 하루도 수고했어요!`
                }
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    // 내용의 글자 크기를 조절
                    fontSize: '0.9rem',
                    marginTop: '-9%',
                  },
                }}
              />
            </Grid>
    )
}

