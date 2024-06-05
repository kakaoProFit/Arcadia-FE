'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchWrapper() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [term, setTerm] = useState('')
  const [typeOfQuery, setTypeOfQuery] = useState('title')

  const handleSearchValue = (e) => {
    setTerm(e.target.value)
  }
  const titleType = () => setTypeOfQuery('title')
  // const titleAndContentType = () => setTypeOfQuery('content')
  const authorType = () => setTypeOfQuery('author')

  const submitSearchContent = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    // filtering
    let value = term
    value = value.replaceAll('<', '&lt;')
    value = value.replaceAll('>', '&gt;')
    value = value.replaceAll('\\(', '&#40;')
    value = value.replaceAll('\\)', '&#41;')
    value = value.replaceAll("'", '&#x27;')
    params.set('page', 1)
    if (searchParams.get('sortType') !== null) params.delete('sortType')
    if (term) {
      params.set('query', value)
      params.set('queryType', typeOfQuery)
    } else {
      params.delete('query')
      params.delete('queryType')
    }
    router.replace(`${pathname}?${params.toString()}`)
    //검색창 비우기
    setTerm('')
  }

  return (
    <form className="w-4/12">
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Your Email
        </label>
        <button
          id="dropdown-button"
          data-dropdown-placement="bottom"
          data-dropdown-toggle="dropdown"
          data-dropdown-trigger="click"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          type="button"
        >
          {typeOfQuery}
        </button>
        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                onClick={titleType}
              >
                제목
              </button>
            </li>
            {/* <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                onClick={titleAndContentType}
              >
                제목+내용
              </button>
            </li> */}
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                onClick={authorType}
              >
                작성자
              </button>
            </li>
          </ul>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="검색"
            required="required"
            onChange={handleSearchValue}
            value={term}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={submitSearchContent}
          >
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}
