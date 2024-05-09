'use client'

import React from 'react'

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
    <div>
      <input
        name={field.id}
        type={field.type}
        className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
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
    { type: 'text', id: 'nickname', placeholder: 'Nickname', text: '닉네임' },
    { type: 'tel', id: 'phone', placeholder: 'Phone number', text: '전화번호' },
    { type: 'date', id: 'birth', placeholder: 'Birth', text: '생년월일' },
  ]
  return (
    <div class="flex items-center md:p-8 p-6 bg-[#ffffff] w-full h-full lg:w-11/12 lg:ml-auto">
      <form
        class="font-tenada w-full"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        <div class="space-y-3">
          {input.map((field, index) => (
            <div key={index}>
              <label
                name={field.id}
                className="w-full text-black font-lg mb-1 block"
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
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="text-black ml-3 block text-sm">
              I accept the{' '}
              <a
                href="javascript:void(0);"
                class="text-blue-600 font-semibold hover:underline ml-1"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <div class="!mt-10">
          <button
            type="submit"
            class="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Create an account
          </button>
        </div>
        <div class="!mt-3">
          <button
            type="submit"
            class="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
          >
            Kakao
          </button>
        </div>
        <div class="!mt-3">
          <button
            type="submit"
            class="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none"
          >
            Naver
          </button>
        </div>
        <p class="text-black text-sm mt-6 text-center">
          Already have an account?{' '}
          <a
            href="javascript:void(0);"
            class="text-blue-600 font-semibold hover:underline ml-1"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  )
}

export default function SignUp() {
  return (
    <div class="font-[sans-serif] bg-white text-white md:h-screen">
      <div class="grid md:grid-cols-2 items-center h-full">
        <ValidForm />
        <div class="max-md:order-1 p-4">
          <img
            src="/images/user2.jpg"
            class="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
      </div>
    </div>
  )
}
