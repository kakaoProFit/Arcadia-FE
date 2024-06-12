import TabEmoticonSelect from '@/components/tab/tab-emoticon'
import Link from 'next/link'
export default function VerticalTab() {
  const verticalTabConfig = [
    {
      id: 0,
      title: '질문',
      category: 'question',
      href: '/mypage/doc?category=question',
    },
    {
      id: 1,
      title: '일기',
      category: 'diary',
      href: '/mypage/doc?category=diary',
    },
    {
      id: 2,
      title: '자유',
      category: 'free',
      href: '/mypage/doc?category=free',
    },
    {
      id: 3,
      title: '정보',
      category: 'inform',
      href: '/mypage/doc?category=inform',
    },
    {
      id: 4,
      title: '좋아요 누른 글',
      category: 'like',
      href: '/mypage/doc?category=like',
    },
  ]

  return (
    <ul
      className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0"
      id="MypageSubtab"
      data-tabs-toggle="#myPageVerticalTabContent"
      role="tablist"
    >
      {verticalTabConfig.map((config) => (
        <li key={config.id} role="presentation">
          <Link
            href={config.href}
            // className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
            // 클릭하면 색깔 들어오게 하고 싶음.
            className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <TabEmoticonSelect state={config.category} />
            {config.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
