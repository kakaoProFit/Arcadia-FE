'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

export default function MiniTable(props) {
  const { category } = props
  const [dataSet, setDataSet] = useState([])
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const getMyDataList = (category) => {
    // const url = `https://spring.arcadiaprofit.shop/boards/list/${category}/${userID}`

    // 임시로 쿠키 그냥 가져와서 사용
    // 어차피 middleware.js로 확인하는 과정을 거쳤기 때문에
    const refresh = getCookie('refreshToken')
    const userID = jwtDecode(refresh).userId
    console.log('userID? ', userID)

    const likeUrl = `https://spring.arcadiaprofit.shop/mypage/liked-boards/${userID}`
    const otherUrl = `https://spring.arcadiaprofit.shop/mypage/user-posts/${userID}/${category}`
    const url = category === 'like' ? likeUrl : otherUrl
    console.log('url? ', url)
    const requestOptions = {
      method: 'GET',
      // next: {
      //   // 3600초동안만 캐싱. 추후에 글을 작성하면 풀게 할 수도 있을 것 같음.
      //   revalidate: 3600
      // }
      headers: {
        Authorization: `Bearer ${refresh}`,
      },
      cache: 'no-store',
    }

    fetch(url, requestOptions).then((res) => {
      if (!res.ok) {
        throw new Error('board list request fail')
      }
      res.json().then((data) => {
        // data 체크
        console.log('data를 제대로 보자!', data)
        console.log('data.boards ', data.boards)
        setDataSet(data.boards)
      })
    })
    // if (!responseData.ok) { throw new Error('board list request fail') }
    // const returnData = responseData.json().then((data) => {
    //   // data 체크
    //   console.log("data를 제대로 보자!", data)
    //   console.log("data.boards ", data.boards)
    //   setDataSet(data.boards)
    // })
    // // console.log("data를 보자! ", returnData)
    // // return returnData.boards
  }

  useEffect(() => {
    console.log('check render')
    getMyDataList(category)
  }, [category])

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
        {dataSet.map((data) => (
          <tr key={data.id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {data.title}{' '}
              <span className="ml-6 text-gray-500">({data.commentCnt})</span>
            </th>
            <td className="px-6 py-4">{formatCreatedAt(data.createdAt)}</td>
            <td className="px-6 py-4">{data.viewCount}</td>
            <td className="px-6 py-4">{data.likeCnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
