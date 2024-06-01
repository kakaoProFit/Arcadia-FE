'use client'
import { setCookie, getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'

function CheckLogin() {
  const [res, setRes] = useState({ accessToken: null, refreshToken: null })
  const [id, setId] = useState(null)
  if (
    getCookie('accessToken') === undefined &&
    getCookie('refreshToken') === undefined
  ) {
    window.location.href = '/login'
  }
  if (
    getCookie('accessToken') === undefined &&
    getCookie('refreshToken') != undefined
  ) {
    window.location.href = '/renewal'
  }
}

export { CheckLogin }
