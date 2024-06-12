import { Suspense } from 'react'
import MiniTable from '@/components/MiniTable'
import RectangleSkeleton from '@/components/loading-skeleton/rectangle-skeleton'
import VerticalTab from '@/components/tab/vertical-tab'

export default function MyPageDoc({ searchParams }) {
  // default는 question
  const category = searchParams?.category || 'question'

  return (
    <div className="md:flex mb-10">
      <VerticalTab />
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          내 글 모아보기
        </h3>
        {/* <Suspense fallback={<RectangleSkeleton width={1000} height={500} />}> */}
        <div className="mb-2">
          <MiniTable category={category} />
        </div>
        {/* </Suspense> */}
      </div>
    </div>
  )
}
