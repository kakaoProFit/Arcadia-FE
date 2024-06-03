'use client'
import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Table(props) {
  const {
    data,
    query,
    queryType,
    page,
    sortType,
    startDate,
    endDate,
    category,
  } = props
  //임시 변수
  const count = 12
  const [datas, setDatas] = useState(data.slice(0, count))
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // table을 사용하는 페이지에 대해서 category 선언
    // usePathname대신 useSelectedLayoutSegment로 대체 가능
    let category = ''
    if (pathname === '/board/free') {
      category = 'free'
    } else if (pathname === '/board/inform') {
      category = 'inform'
    } else if (pathname === '/board/question') {
      category = 'question'
    } else if (pathname === '/board/diary') {
      category = 'diary'
    }
    // 사라질 녀석
    else if (pathname === '/board') {
      category = 'free' // 임시
    }
    const params = new URLSearchParams(searchParams)
    params.set('category', category)
    router.replace(`${pathname}?${params.toString()}`)
  }, [])

  // 여기 코드는 나중에 다른 파일로 뺄 예정
  const getBoardList = async (category, params) => {
    const url = `https://spring.arcadiaprofit.shop/board/list/${category}`
    const requestUrl = url + params
    const requestOptions = {
      method: 'GET',
      cache: 'no-store',
    }
    console.log('request URL : ', requestUrl)
    // 나중에 return 형식으로 바꿔야 함. 그렇게 전달 된 녀석을 받아서 사용하면 될 듯
    const temp = await fetch(requestUrl, requestOptions)
      .then((res) => (res.ok ? res.json() : data.slice(0, count)))
      .then((data) => {
        console.log('check set ', data)
        // setDatas(data)
      })
    console.log('check temp ', temp)
    // return
  }

  // 이런식으로 하면 동작하긴 한다. props로 받기 때문인 것 같다.
  // 그래도 여전히 비효율적이라는 생각이 들긴한다..
  // 그러나 페이지마다 바뀌는 것을 호환하려면 이렇게 해야한다..
  // 공통적인 페이지를 하나로 좁히고 데이터를 받으면 이렇게 안해도 되지 않을까?
  useEffect(() => {
    console.log('render check')
    let params = '?'
    for (let key in props) {
      if (key !== 'data' && key !== 'category') {
        const value = props[key]
        if (value !== NaN) {
          params += `${key}=${value}`
          params += '&'
          // setParams(params+`${key}+${value}&`)
          console.log('key ', key)
          console.log('value ', value)
        }
      }
    }
    const checkParams = params.length - 1
    // setParams(params.substring(0, checkParams))
    params = params.substring(0, checkParams)
    console.log('check params ', params)
    getBoardList(props['category'], params)
    params = ''
  }, [query, sortType, page, startDate, category])

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <TableHeader />
      <tbody>
        {datas.map((data) => (
          <tr key={data.id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {data.title}
            </th>
            <td className="px-6 py-4">{data.writer}</td>
            <td className="px-6 py-4">{data.date}</td>
            <td className="px-6 py-4">{data.views}</td>
            <td className="px-6 py-4">{data.likes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
