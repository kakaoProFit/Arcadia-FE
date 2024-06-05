'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function TableHeader() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [sortType, setSortType] = useState(null)
  // 한 번에 하나의 정렬만 요청 가능 (다른 거 요청시 기존이 풀림)
  function sortDates() {
    setSortType(0)
  }
  function sortViews() {
    setSortType(1)
  }
  function sortLikes() {
    setSortType(2)
  }

  function updateSortType() {
    const params = new URLSearchParams(searchParams)
    params.set('page', 1)
    // 이 부분은 논의가 필요함.
    // 검색한 곳에서도 정렬이 가능한가?
    const search = searchParams.get('query')
    if (search !== null) {
      params.delete('query')
      params.delete('queryType')
    }
    if (sortType === 0) params.set('sortType', 'date')
    else if (sortType === 1) params.set('sortType', 'hits')
    else if (sortType === 2) params.set('sortType', 'like')
    router.replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    updateSortType()
  }, [sortType])

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3">
          제목
        </th>
        <th scope="col" className="px-6 py-3">
          작성자
        </th>
        <th scope="col" className="px-6 py-3">
          <button onClick={sortDates}>작성일자</button>
        </th>
        <th scope="col" className="px-6 py-3">
          <button onClick={sortViews}>조회수</button>
        </th>
        <th scope="col" className="px-6 py-3">
          <button onClick={sortLikes}>좋아요</button>
        </th>
      </tr>
    </thead>
  )
}
