import Card from '@/components/Card'
import CardData from '@/components/CardData'

export default async function DiaryListPage({ searchParams }) {
  // 현재 url 매개 변수를 받아옴.
  const query = searchParams?.query || '원우형'
  const currentPage = Number(searchParams?.page) || 1
  // 해당 사용자 또는 불러온 일기 개수 -> api 호출로 확인하자. 사용자 이름에 대해서 count()들어간 부분을 만들어달라는 느낌으로 ㄱㄱ?
  let itemCount = 50
  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-screen overflow-hidden rounded-lg">
        {[...Array(5).keys()].map((index) => (
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item
            key={index}
          >
            <Card data={CardData()} count={4} />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}
