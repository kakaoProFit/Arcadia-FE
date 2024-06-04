'use client'

import { Button, Modal } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import Alert from '@mui/material/Alert'
import React, { useState } from 'react'
import { setCookie } from 'cookies-next'

function InputField({ label, type, name, register }) {
  return (
    <div className="space-y-3">
      <label name={name} className="w-full text-black text-lg mb-1 block">
        {label}
      </label>
      <input
        className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
        type={type}
        placeholder={label}
        name={name}
        {...register(name, { required: '내용을 입력해주세요.' })}
      />
    </div>
  )
}
export default function Login() {
  const [res, setRes] = useState(null)
  const [show, setShow] = useState(false)

  const inputFields = [
    { label: 'Email', type: 'text', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
  ]
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  async function onSubmit(data) {
    console.log('fetching')
    try {
      const response = await fetch(
        'https://spring.arcadiaprofit.shop/auth/login',
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
      if (response.status === 401) {
        setRes({ error: resData.message })
        console.log('로그인 실패')
        setShow(true)
        return
      }
      await setRes(resData)
      console.log(resData)
      await setCookie('accessToken', resData.accestoken, {
        maxAge: resData.expiresIn,
      })
      await setCookie('refreshToken', resData.refreshtoken, {
        maxAge: resData.expiresIn,
      })
    } catch (error) {
      console.error('Error during fetch:', error)
      setRes({ error: 'Fetch error' })
    }
  }
  return (
    <div className="font-[sans-serif] bg-white text-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center h-full">
        <form
          className="font-tenada w-9/12 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-3">
            <InputField
              label="Email"
              type="text"
              name="email"
              register={register}
            />
            {errors?.email && <Alert>{errors?.email?.message}</Alert>}
            <InputField
              label="Password"
              type="password"
              name="password"
              register={register}
            />
            {errors?.password && <Alert>{errors?.password?.message}</Alert>}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-black ml-3 block text-sm"
              >
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
        <div className="max-md:order-1 p-4">
          <img
            src="/images/user2.jpg"
            className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
      </div>

      <Modal
        className="font-tenada"
        show={show}
        handleClose={() => setShow(false)}
      >
        <Modal.Header>로그인 실패</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500">
              로그인에 실패했습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              이메일이나 비밀번호를 확인해주세요.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>다시 로그인하기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
