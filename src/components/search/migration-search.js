'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchWrapper() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [term, setTerm] = useState('')

  const handleSearchValue = (e) => {
    setTerm(e.target.value)
  }

  // 이거 뭘로 검색하는지도 알아야 하는데? 어케 받는거지?
  const submitSearchContent = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set('page', 1)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
    //검색창 비우기
    setTerm('')
  }

  return (
    <form class="w-4/12">
      <div class="flex">
        <label
          for="search-dropdown"
          class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Your Email
        </label>
        <button
          id="dropdown-button"
          data-dropdown-placement="bottom"
          data-dropdown-toggle="dropdown"
          data-dropdown-trigger="click"
          class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          type="button"
        >
          분류
        </button>
        <div
          id="dropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            <li>
              <button
                type="button"
                class="inline-flex w-full px-4 py-2 hover:bg-gray-100"
              >
                제목
              </button>
            </li>
            <li>
              <button
                type="button"
                class="inline-flex w-full px-4 py-2 hover:bg-gray-100"
              >
                제목+내용
              </button>
            </li>
            <li>
              <button
                type="button"
                class="inline-flex w-full px-4 py-2 hover:bg-gray-100"
              >
                작성자
              </button>
            </li>
          </ul>
        </div>
        <div class="relative w-full">
          {/* <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="검색"
              required="required"
              onChange={handleSearchValue}
              defaultValue={searchParams.get('query')?.toString}
            /> */}
          <input
            type="search"
            id="search-dropdown"
            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="검색"
            required="required"
            onChange={handleSearchValue}
            value={term}
          />
          <button
            type="submit"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={submitSearchContent}
          >
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}
