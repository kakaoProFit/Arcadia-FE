// 'use client'
// import React, { useEffect, useState } from 'react'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { GetUid } from '@/services/CookieManage'

export default async function MiniTable(props) {
  const { category } = props
  const userID = GetUid()
  //   const [dataSet, setDataSet] = useState([])
  //   const pathname = usePathname()
  //   const router = useRouter()
  //   const searchParams = useSearchParams()

  //   const getMyDataList = async (category) => {
  //     const url = `https://spring.arcadiaprofit.shop/boards/list/${category}/${userID}`
  //     const requestOptions = {
  //       method: 'GET',
  //       next: {
  //         // 3600초동안만 캐싱. 추후에 글을 작성하면 풀게 할 수도 있을 것 같음.
  //         revalidate: 3600
  //       }
  //     }

  //     const responseData = await fetch(url, requestOptions)
  //     if (!responseData.ok) throw new Error('board list request fail')
  //     const returnData = await responseData.json()
  //     console.log("data를 보자! ", returnData)
  //     // return returnData.boards
  //   }

  // 솔직히 useState, useEffect 지금 왜쓰나 싶다. 그냥 use server 만들어버리고 fetching해도 상관없을듯?
  //   useEffect(() => {
  //     console.log('check render')

  //   }, [category])

  const url = `https://spring.arcadiaprofit.shop/boards/list/${category}/${userID}`
  const requestOptions = {
    method: 'GET',
    next: {
      // 3600초동안만 캐싱. 추후에 글을 작성하면 풀게 할 수도 있을 것 같음.
      revalidate: 3600,
    },
  }

  const responseData = await fetch(url, requestOptions)
  if (!responseData.ok) throw new Error('board list request fail')
  const returnData = await responseData.json()
  console.log('data를 보자! ', returnData)
  console.log('그럼 type은? ', typeof returnData)

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
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            제목
          </th>
          <th scope="col" className="px-6 py-3">
            <button>작성일자</button>
          </th>
          <th scope="col" className="px-6 py-3">
            <button>조회수</button>
          </th>
          <th scope="col" className="px-6 py-3">
            <button>좋아요</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* {dataSet.map((data) => (
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
            <td className="px-6 py-4">{formatCreatedAt(data.createdAt)}</td>
            <td className="px-6 py-4">{data.hits}</td>
            <td className="px-6 py-4">{data.likeCnt}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  )
}
