import Modal from '@/components/Modal'

export default function test() {
  return (
    <section className="bg-white font-tenada">
      <div className="py-8 px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
            분석서
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">테스트세트스</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <img
              className="mb-6 rounded-lg"
              src="/images/1.png"
              alt="Article image"
            />
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              주간 분석
            </p>
            <p className="mb-5 font-light text-gray-500">
              이번 주에는 긍정적인 감정이 우세했으며, 새로운 도전에 대한 열정과
              의지가 강조되었습니다.
            </p>
          </article>
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <img
              className="mb-6 rounded-lg"
              src="/images/2.jpg"
              alt="Article image"
            />
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              월간 분석
            </p>
            <p className="mb-5 font-light text-gray-500">
              이번 달 동안은 일상적인 스트레스와 감정적인 변화에 대처하는 데
              어려움을 겪었으나, 내적 강점을 발견하고 자기 효능감을 높이는데
              성공했습니다.
            </p>
          </article>
        </div>
        <article className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <p className="mb-5 font-light text-gray-500">
            전반적으로는 안정된 감정 상태를 유지하며, 자신의 감정을 이해하고
            관리하는 방법을 향상시키는 데 주력했습니다.
          </p>
        </article>
      </div>
    </section>
  )
}
