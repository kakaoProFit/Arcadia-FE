'use client';

import React from 'react';
import { Alert, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { useForm, useController } from 'react-hook-form';

function ValidInput({ control, name, ruleName }) {
  const rules = {
    email: {
        required: '이메일을 입력해주세요.',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "올바른 이메일 주소를 입력해주세요"
        }
    },
    password: {
        required: '비밀번호를 입력해주세요.',
        minLength: {
            value: 8,
            message: "비밀번호는 최소 8자 이상이어야 합니다."
        },
        maxLength: {
            value: 20,
            message: "비밀번호는 최대 20자 이하여야 합니다."
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            message: "비밀번호는 영문 소문자, 숫자, 특수문자를 포함해야 합니다."
        }
    }
  }

  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error},
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules: rules[ruleName]
  });
  return (
    <>
    <TextField
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      inputRef={field.ref}
      control={control}
      margin="normal"
      size="large"
      fullWidth
      required
      id={name}
      label={name.charAt(0).toUpperCase() + name.slice(1)} // 이름의 첫 글자를 대문자로 변경하여 라벨로 설정
      name={name}
    />
    {error && <Alert severity="error">{error.message}</Alert>}
    </>
  );
}

const ValidForm = () => {
  const methods = useForm();
  const { register, handleSubmit, control } = methods;
  const submitHandler = (data) => {
    // 데이터 처리
  };
  return(
    <Box component="form" onSubmit={methods.handleSubmit(submitHandler)} style={{ mt: 1 }}>
      <ValidInput control={control} name="email" ruleName="email"/>
      <ValidInput control={control} name="password" ruleName="password"/>
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
      <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="자동 로그인"
              />
    </Box>
  )
}


export default function SignIn() {
  return (
      <Grid container component="main" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square style={{padding: '10vh'}}>
          <Box style={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography component="h1" variant="h2">
              로그인
            </Typography>
              <ValidForm />
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
