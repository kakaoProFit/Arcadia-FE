'use client'

import React from 'react'

export default function Answer() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-10/12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            답변 작성하기
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label for="answer" className="sr-only">
              답변을 입력해주세요.
            </label>
            <textarea
              id="answer"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="답변을 작성하쇼"
              required
            />
          </div>
          <button
            type="submit"
            className="font-tenada text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            답변 작성
          </button>
        </form>
      </div>
    </section>
  )
}
