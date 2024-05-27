'use client'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'

export default function Table(props) {
  const { data, count, query, page } = props
  const [datas, setDatas] = useState(data.slice(0, count))
  const login = true

  // 여기 코드는 나중에 다른 파일로 뺄 예정
  const getSearchAndPaginationResult = async () => {
    const url = `10.10.10.10/board/free?query=${query}&page=${page}`
    const requestOptions = {
      method: 'GET',
      cache: 'no-store',
    }
    // 나중에 return 형식으로 바꿔야 함. 그렇게 전달 된 녀석을 받아서 사용하면 될 듯
    const temp = await fetch(url, requestOptions)
      .then((res) => (res.ok ? res.json() : data.slice(0, count)))
      .then((data) => {
        console.log('check set ', data)
        setDatas(data)
      })
    // console.log("check temp ", temp)
    // return
  }

  useEffect(() => {
    // 일단 의도한대로 페이지네이션이랑 쿼리 바뀔때 돌긴 돌음.
    // 문제는 그냥 새로고침을 갈겨도 돈다는것임. 그래서 일단은 쿼리값이 없거나 page값이 1이면 안돌게 했음.
    if (query !== '' || page !== 1) {
      getSearchAndPaginationResult()
    }
    console.log('check datas ', datas)
  }, [query, page])

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
            {login && (
              <td className="py-4">
                <DeleteIcon color="secondary" sx={{ fontSize: 16 }} />
              </td>
            )}
            {login && (
              <td className="py-4">
                <EditIcon color="secondary" sx={{ fontSize: 16 }} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
