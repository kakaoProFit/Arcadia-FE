'use client'
import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// 파싱을 테스트하기 위한 더미 데이터
import { listResponse } from './TableData'

export default function Table(props) {
  const { query, queryType, page, sortType, startDate, endDate, category } =
    props

  const [dataSet, setDataSet] = useState([])
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // 더미데이터
  const example_data = listResponse

  // useEffect(() => {
  //   // table을 사용하는 페이지에 대해서 category 선언
  //   let category = ''
  //   if (pathname === '/board/free') {
  //     category = 'free'
  //   } else if (pathname === '/board/inform') {
  //     category = 'inform'
  //   } else if (pathname === '/board/question') {
  //     category = 'question'
  //   } else if (pathname === '/board/diary') {
  //     category = 'diary'
  //   }
  //   // 사라질 녀석
  //   else if (pathname === '/board') {
  //     category = 'free' // 임시
  //   }
  //   const params = new URLSearchParams(searchParams)
  //   params.set('category', category)
  //   router.replace(`${pathname}?${params.toString()}`)
  // }, [])

  const getBoardList = async (category, params) => {
    const url = `https://spring.arcadiaprofit.shop/boards/list/${category}`
    const requestUrl = url + params
    const requestOptions = {
      method: 'GET',
      cache: 'no-store',
    }
    console.log('request URL : ', requestUrl)
    // 나중에 return 형식으로 바꿔야 함. 그렇게 전달 된 녀석을 받아서 사용하면 될 듯
    const responseData = await fetch(requestUrl, requestOptions)
    if (!responseData.ok) throw new Error('board list request fail')
    const returnData = await responseData.json()
    return returnData.boards
  }

  // 더미데이터 테스트용 함수
  const getExampleData = () => {
    const pageCount = example_data.boards.totalPages
    const ex_data = example_data.boards
    const params = new URLSearchParams(searchParams)
    params.set('pageCount', pageCount)
    router.replace(`${pathname}?${params.toString()}`)
    return ex_data
  }

  useEffect(() => {
    console.log('check render')
    let params = '?'
    for (let key in props) {
      if (key !== 'data' && key !== 'category' && key !== 'pageCount') {
        const value = props[key]
        if (value !== NaN) {
          params += `${key}=${value}`
          params += '&'
        }
      }
    }
    const checkParams = params.length - 1
    params = params.substring(0, checkParams)
    // console.log("check params : ", params)
    getBoardList(props['category'], params).then((data) => {
      setDataSet(data.content)
      console.log('data has : ', data)
      console.log('check dataSet ', dataSet)
      const pageCount = data.totalPages
      const deliveryParam = new URLSearchParams(searchParams)
      deliveryParam.set('pageCount', pageCount)
      router.replace(`${pathname}?${deliveryParam.toString()}`)
    })
    params = ''
  }, [query, sortType, page, startDate, category])

  function formatCreatedAt(createdAtArray) {
    // createdAt 배열에서 연, 월, 일을 추출
    const [year, month, day] = createdAtArray.slice(0, 3)
    // Date 객체 생성
    const createdAtDate = new Date(year, month - 1, day)
    // YYYY-MM-DD 형식으로 변환
    const formattedCreatedAt = createdAtDate.toISOString().slice(0, 10)
    return formattedCreatedAt
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <TableHeader />
      <tbody>
        {dataSet.map((data) => (
          <tr key={data.id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {data.title}{' '}
              {data.commentLength > 0 ? (
                <span className="ml-6 text-gray-500">
                  ({data.commentLength})
                </span>
              ) : null}
            </th>
            <td className="px-6 py-4">{data.id}</td>
            {/* <td className="px-6 py-4">{`${data.createdAt[0]}-${data.createdAt[1]}-${data.createdAt[2]}`}</td> */}
            <td className="px-6 py-4">{formatCreatedAt(data.createdAt)}</td>
            <td className="px-6 py-4">{data.hits}</td>
            <td className="px-6 py-4">{data.likeCnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
