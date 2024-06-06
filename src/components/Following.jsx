export default function Following({ data }) {
  return (
    <div className="bg-white flex flex-col min-h-screen bg-slate-200">
      <div className="w-full mx-auto bg-white rounded-xl shadow-xl flex flex-col py-4">
        {data.map((data, key) => (
          <div
            key={key}
            className="flex flex-col items-center justify-between cursor-pointer  p-4 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]"
          >
            <div className="flex items-center text-center w-full flex-col sm:flex-row sm:text-left">
              <div className="mb-2.5 mr-5">
                <img
                  className="rounded-full"
                  width="50"
                  height="50"
                  src={data.avatar}
                />
              </div>
              <div className="flex flex-col mb-4 pr-80 font-tenada text-xl3">
                <a href="#" className="w-full font-medium no-underline">
                  {data.user}
                </a>
              </div>
            </div>
            <div className="mx-auto sm:ml-auto sm:mr-0">
              <button
                className="w-full mr-10 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-5 justify-center rounded"
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
