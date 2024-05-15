// import SerachBar from '@/components/SearchBar'

export default function Tap() {
  const data = [
    {
      id: 1,
      name: '자유',
      href: '#free',
    },
    {
      id: 2,
      name: '정보',
      href: '#info',
    },
    {
      id: 3,
      name: '질문',
      href: '#question',
    },
    {
      id: 4,
      name: '일기',
      href: '#diary',
    },
  ]

  return (
    <div className="bg-white mb-10 lg:px-6 py-2.5">
      <div class="mx-auto font-tenada">
        <div class="mx-10 border-b border-gray-200 dark:border-gray-700 mb-4">
          <ul
            class="flex flex-wrap -mb-px"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            {data.map((item) => (
              <li key={item.id} class="mr-2" role="presentation">
                <button
                  class="text-lg inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id={item.id}
                >
                  <a href={item.href}>{item.name}</a>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
