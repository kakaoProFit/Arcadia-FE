
import React from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';

import createField from '@/interfaces/createField';

export default function SignIn() {
  return (
      <Grid container component="main" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square style={{padding: '10vh'}}>
          <Box style={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography component="h1" variant="h2">
              로그인
            </Typography>
            <Box component="form" style={{ mt: 1 }}>
              {createField({id: 'email', label: '이메일', name: 'email', autoComplete: 'email', autoFocus: true})}
              {createField({id: 'password', label: '패스워드', name: 'password', autoComplete: 'current-password', autoFocus: true})}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="자동 로그인"
              />
              <Box mb={1}>
                <Button color="primary" type="submit" fullWidth variant="contained" style={{ padding: '12px 2px' }}>
                  로그인
                </Button>
              </Box>
              <Box mb={1}>
                <Button color="yellow" type="submit" fullWidth variant="contained" style={{ padding: '12px 2px' }}>
                  카카오 로그인
                </Button>
              </Box>
              <Box mb={1}>
                <Button color="green" type="submit" fullWidth variant="contained" style={{ padding: '12px 2px' }}>
                  네이버 로그인
                </Button>
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    비밀번호 재설정
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/join" variant="body2">
                    {"회원가입"}
                  </Link>
                </Grid>
              </Grid>
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
