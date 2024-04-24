'use client'

import React from 'react'
import {
  Alert,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material'
import { useForm, useController } from 'react-hook-form'
import LoginRules from '@/constants/Rules/LoginRules'
import styles from '@/page.module.css'

const rules = LoginRules
function ValidInput({ control, name, ruleName }) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: rules[ruleName],
  })
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
  )
}

const ValidForm = () => {
  const inputFields = [
    { name: 'email', ruleName: 'email' },
    { name: 'password', ruleName: 'password' },
  ]

  const methods = useForm()
  const { register, handleSubmit, control } = methods
  const submitHandler = (data) => {
    // 데이터 처리
  }
  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(submitHandler)}
      style={{ mt: 1, backgroundColor: 'transparent'}}
    >
      <ValidInput control={control} name="email" ruleName="email" />
      <ValidInput control={control} name="password" ruleName="password" />
      <Box mb={1}>
        <Button
          color="primary"
          type="submit"
          fullWidth
          variant="contained"
          style={{ padding: '12px 2px' }}
        >
          로그인
        </Button>
      </Box>
      <Box mb={1}>
        <Button
          color="yellow"
          type="submit"
          fullWidth
          variant="contained"
          style={{ padding: '12px 2px' }}
        >
          카카오 로그인
        </Button>
      </Box>
      <Box mb={1}>
        <Button
          color="green"
          type="submit"
          fullWidth
          variant="contained"
          style={{ padding: '12px 2px' }}
        >
          네이버 로그인
        </Button>
      </Box>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="자동 로그인"
      />
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            비밀번호 재설정
          </Link>
        </Grid>
        <Grid item>
          <Link href="/join" variant="body2">
            {'회원가입'}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default function SignIn() {
  return (
    <div className={styles.main}>
    <Grid container component="main" style={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={4}
        md={7}
        component={Paper}
        elevation={0}
        square
        style={{ padding: '10vh', backgroundColor: 'transparent'}}
      >
        <Box
          style={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2">
            로그인
          </Typography>
          <ValidForm />
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={8}
        md={5}
        style={{
          backgroundImage: `url('/images/user5.jpg')`, // url() 함수를 사용하여 이미지 경로 설정
          backgroundSize: 'cover', // 이미지를 컨테이너에 맞게 조절
          backgroundRepeat: 'no-repeat', // 이미지 반복 방지
          backgroundPosition: 'center', // 이미지를 가운데로 정렬
        }}
      />
    </Grid>
    </div>
  )
}
