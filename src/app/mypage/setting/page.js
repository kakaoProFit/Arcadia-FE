import Modal from '@/components/Modal'

export default function SettingPage() {
  return (
    <div className="bg-white">
      <span className="mx-5 self-center text-6xl my-10 font-semibold">
        계정 설정
      </span>
      <div className="bg-white min-h-screen pt-2 font-tenada my-16">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <form className="mt-6 pt-4">
              <img
                src="/images/user2.jpg"
                className="lg:max-w-[90%] w-full h-full object-contain block mb-10 mx-auto"
                alt="login-image"
              />
              <button className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500 mb-5 ">
                프로필 사진 변경
              </button>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-text-1"
                  >
                    이메일 주소
                  </label>
                  <input
                    className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                    id="grid-text-1"
                    type="text"
                    placeholder="사용자 이메일 받아오기"
                    disabled
                  />
                </div>
                <div className="w-full px-3 mb-6 flex">
                  <div className="w-full mr-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      닉네임
                    </label>
                    <input
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="사용자 닉네임"
                      disabled
                    />
                  </div>
                  <div className="w-3/12">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      닉네임 변경
                    </label>
                    <button
                      type="button"
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                    >
                      닉네임 변경
                    </button>
                  </div>
                </div>
                <div className="w-full px-3 mb-6 flex">
                  <div className="w-full mr-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      휴대폰 번호
                    </label>
                    <input
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="사용자 번호 받아오기"
                      disabled
                    />
                  </div>
                  <div className="w-3/12">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      휴대폰 인증
                    </label>
                    <button
                      type="button"
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                    >
                      휴대폰 인증
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    비밀번호
                  </label>
                  <button
                    type="button"
                    className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                  >
                    비밀번호 변경
                  </button>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    전문가 인증
                  </label>
                  <button
                    type="button"
                    className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                  >
                    전문가 인증
                  </button>
                </div>
                <div className="personal w-full pt-4">
                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      소개
                    </label>
                    <textarea
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="text-black bg-white border border-gray-300 w-full text-base px-4 py-3 rounded-md outline-blue-500"
                      type="submit"
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <hr className="my-5" />
          <div className="text-center">
            <button
              data-modal-target="user-resign"
              data-modal-toggle="user-resign"
              className="text-black bg-red-700 border border-red-300 w-4/12 text-base text-white px-4 py-3 rounded-md outline-blue-500"
              type="submit"
            >
              회원 탈퇴
            </button>
          </div>
          <Modal
            modalId="user-resign"
            modalTitle="회원 탈퇴"
            modalContent="정말로 탈퇴하시겠습니까?"
            modalType={false}
          />
        </div>
      </div>
    </div>
  )
}
