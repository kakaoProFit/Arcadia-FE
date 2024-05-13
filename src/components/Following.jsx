export default function Following({ datas }) {
  return (
    <div class="bg-white flex flex-col items-center justify-center min-h-screen p-16 bg-slate-200">
      <div class="w-full mx-auto bg-white rounded-xl shadow-xl flex flex-col py-4">
        {datas.map((data, key) => (
          <div
            key={key}
            class="flex flex-col items-center justify-between cursor-pointer  p-4 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]"
          >
            <div class="flex items-center text-center w-full flex-col sm:flex-row sm:text-left">
              <div class="mb-2.5 mr-5 sm:mb-0 sm:mr-2.5">
                <img class="w-20 h-20 rounded-full" src={data.avatar} />
              </div>
              <div class="flex flex-col mb-4 sm:mb-0 sm:mr-4 font-tenada text-xl3">
                <a href="#" class="font-medium no-underline">
                  {data.user}
                </a>
              </div>
            </div>
            <div class="mx-auto sm:ml-auto sm:mr-0">
              <button
                className="w-full mr-2 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-5 justify-center rounded"
                type="button"
              >
                {data.follow ? '언팔로우' : '팔로우'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
