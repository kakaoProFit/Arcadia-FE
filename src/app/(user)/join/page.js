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
import JoinRules from '@/constants/Rules/JoinRules'

const rules = JoinRules
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
  const methods = useForm()
  const { register, handleSubmit, control } = methods
  const submitHandler = (data) => {
    // 데이터 처리
  }
  const inputFields = [
    { name: 'email', ruleName: 'email' },
    { name: 'password', ruleName: 'password' },
    { name: 'nickname', ruleName: 'nickname' },
    { name: 'phone', ruleName: 'phone' },
    { name: 'birth', ruleName: 'birth' },
  ]
  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(submitHandler)}
      style={{ mt: 1 }}
    >
      {inputFields.map((field, index) => (
        <ValidInput key={index} control={control} {...field} />
      ))}
      <Box mb={1}>
        <Button
          color="primary"
          type="submit"
          fullWidth
          variant="contained"
          style={{ padding: '12px 2px' }}
        >
          회원가입
        </Button>
      </Box>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={
          <Typography variant="body2">
            <Link href="#" variant="body2">
              이용약관
            </Link>
            과{' '}
            <Link href="#" variant="body2">
              개인정보처리방침
            </Link>
            에 동의하겠습니까?
          </Typography>
        }
      />
    </Box>
  )
}

export default function SignUp() {
  return (
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
            회원가입
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
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'fit',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  )
}
