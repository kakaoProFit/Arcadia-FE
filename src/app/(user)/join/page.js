'use client'

import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const JoinRules = {
  email: {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '올바른 이메일 주소를 입력해주세요',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    },
    maxLength: {
      value: 20,
      message: '비밀번호는 최대 20자 이하여야 합니다.',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      message: '비밀번호는 영문 소문자, 숫자, 특수문자를 포함해야 합니다.',
    },
  },
  nickname: {
    required: '닉네임을 입력해주세요.',
    minLength: {
      value: 4,
      message: '닉네임은 최소 4자 이상이어야 합니다.',
    },
    maxLength: {
      value: 8,
      message: '닉네임은 최대 8자 이하여야 합니다.',
    },
  },
  phone: {
    required: '휴대폰 번호를 입력해주세요.',
    pattern: {
      value: /^01[016789]-?\d{3,4}-?\d{4}$/,
      message: '올바른 휴대폰 번호를 입력해주세요.',
    },
  },
  birth: {
    required: '생년월일을 입력해주세요.',
  },
  agreeToTerms: {
    required: '이용약관에 동의해주세요.',
  },
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [res, setRes] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  function InputField({ label, type, name, register, rules }) {
    return (
      <div className="space-y-2">
        <label htmlFor={name} className="w-full text-black text-lg mb-1 block">
          {label}
        </label>
        <input
          className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
          type={type}
          placeholder={label}
          id={name}
          {...register(name, rules)}
        />
      </div>
    )
  }
  async function onSubmit(data) {
    try {
      console.log('fetch')
      console.log(data)
      const response = await fetch(
        'https://spring.arcadiaprofit.shop/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      const resData = await response.json()
      console.log(resData)
    } catch (error) {
      console.error('Error during fetch:', error)
    }
    if (resData !== undefined) router.push('/')
  }

  const input = [
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      rules: JoinRules.password,
    },
    {
      label: 'Nickname',
      type: 'text',
      name: 'fullName',
      rules: JoinRules.nickname,
    },
    { label: 'Phone', type: 'text', name: 'phone', rules: JoinRules.phone },
    { label: 'Birth', type: 'text', name: 'birth', rules: JoinRules.birth },
  ]

  const emailInput = {
    label: 'Email',
    type: 'text',
    name: 'email',
    rules: JoinRules.email,
  }

  return (
    <div className="font-[sans-serif] bg-white text-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center h-full">
        <div className="text-xl flex items-center md:p-8 p-6 bg-[#ffffff] w-6/12 h-full lg:w-11/12 lg:ml-auto">
          <form
            className="font-tenada w-9/12 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-3">
              <div className="flex">
                <div className="basis-9/12">
                  <InputField
                    label={emailInput.label}
                    type={emailInput.type}
                    name={emailInput.name}
                    register={register}
                    rules={emailInput.rules}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mx-4 w-7/10 text-black text-lg mb-1 block">
                    이메일 인증
                  </label>
                  <button className="mx-4 w-3/10 py-3 px-4 text-base font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                    이메일 인증
                  </button>
                </div>
              </div>
              {errors.email && <Alert>{errors.email?.message}</Alert>}
              {input.map((field) => (
                <div key={field.name}>
                  <InputField
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    register={register}
                    rules={field.rules}
                  />
                  {errors[field.name] && (
                    <Alert>{errors[field.name]?.message}</Alert>
                  )}
                </div>
              ))}
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...register('agreeToTerms', {
                    validate: (value) => value || '이용약관에 동의해주세요.',
                  })}
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-black ml-3 block text-sm"
                >
                  개인 정보 처리 방침에{' '}
                  <a
                    href="#"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    동의합니다.
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <Alert>{errors.agreeToTerms?.message}</Alert>
              )}
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full py-3 px-4 text-base font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                회원가입
              </button>
            </div>
            <p className="text-black text-sm mt-6 text-center">
              이미 회원 가입을 했다면?{' '}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                로그인
              </a>
            </p>
          </form>
        </div>
        <div className="max-md:order-1 p-4">
          <img
            src="/images/user2.jpg"
            className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
      </div>
    </div>
  )
}
