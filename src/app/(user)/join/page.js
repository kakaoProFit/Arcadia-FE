import React from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';
import createField from '@/interfaces/createField';

const data = [
    {
        id: 'email',
        label: '이메일',
        name: 'email',
        autoComplete: 'email',
        autoFocus: true
    }, {
        id: 'password',
        label: '패스워드',
        name: 'password',
        autoComplete: 'current-password',
        autoFocus: true
    }, {
        id: 'name',
        label: '이름',
        name: 'name',
        autoComplete: 'name',
        autoFocus: true
    }, {
        id: 'birth',
        label: '생년월일',
        name: 'birth',
        autoComplete: 'birth',
        autoFocus: true
    }, {
        id: 'nickname',
        label: '닉네임',
        name: 'nickname',
        autoComplete: 'nickname',
        autoFocus: true
    }
]

export default function SignUp() {
  return (
      <Grid container component="main" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square style={{padding: '10vh'}}>
          <Box style={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography component="h1" variant="h2">
              회원가입
            </Typography>
            <Box component="form" style={{ mt: 1 }}>
              {data.map((field) => {
                      return createField({...field, key: field.id});
                  })
              }
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={(
                  <Typography variant="body2">
                    <Link href="#" variant="body2">이용약관</Link>과 <Link href="#" variant="body2">개인정보처리방침</Link>에 동의하겠습니까?
                  </Typography>
                )}
              />
              <Box mb={1}>
              <Button type="submit" fullWidth variant="contained" style={{ padding: '12px 2px' }}>
              회원가입
              </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={false} sm={8} md={5} style={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'fit',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
  );
}
