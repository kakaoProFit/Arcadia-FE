'use client'

import React from 'react'

import { useForm, useController } from 'react-hook-form'
import LoginRules from '@/constants/Rules/LoginRules'

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
    <div>
      <input
        name={field.id}
        type={field.type}
        className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
        placeholder={field.placeholder}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        inputRef={field.ref}
        control={control}
        margin="normal"
        id={name}
      />
    </div>
  )
}

const ValidForm = () => {
  const methods = useForm()
  const { register, handleSubmit, control } = methods
  const submitHandler = (data) => {
    // 데이터 처리
  }
  const input = [
    {
      type: 'email',
      id: 'email',
      placeholder: 'Email address',
      text: '이메일',
    },
    {
      type: 'password',
      id: 'password',
      placeholder: 'Password',
      text: '비밀번호',
    },
  ]
  return (
    <div className="flex items-center md:p-8 p-6 bg-[#ffffff] w-6/12 h-full lg:w-11/12 lg:ml-auto">
      <form
        className="font-tenada w-9/12 mx-auto"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        <div className="space-y-3">
          {input.map((field, index) => (
            <div key={index}>
              <label
                name={field.id}
                className="w-full text-black text-lg mb-1 block"
              >
                {field.text}
              </label>
              <ValidInput
                key={index}
                control={control}
                name={field.id}
                ruleName={field.id}
              />
            </div>
          ))}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" className="text-black ml-3 block text-sm">
              자동 로그인
            </label>
          </div>
        </div>
        <div className="!mt-10 text-center">
          <button
            type="submit"
            className="w-full py-3 px-4 text-base font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            로그인
          </button>
        </div>
        <div className="!mt-3 text-center">
          <button
            type="submit"
            className="w-full py-3 px-4 text-base font-semibold rounded text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none"
          >
            카카오 로그인
          </button>
        </div>
        <div className="!mt-3 text-center">
          <button
            type="submit"
            className="w-full py-3 px-4 text-base font-semibold rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none"
          >
            네이버 로그인
          </button>
        </div>
      </form>
    </div>
  )
}

export default function SignIn() {
  return (
    <div className="font-[sans-serif] bg-white text-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center h-full">
        <ValidForm />
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
