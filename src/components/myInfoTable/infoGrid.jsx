import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

export default function InfoGrid({ data }) {
  return (
    <div className="bg-white h-auto px-48 flex">
      <img src={data.image} className="w-1/4 h-1/4" />
      <div className="flex md:flex-row-reverse flex-wrap">
        <div className="w-full md:w-3/4 p-4 text-center">
          <div className="text-left pl-4 pt-3">
            <span className="text-4xl text-gray-700 text-2xl mr-2 justify-center">
              {data.name}
              {data.userVerified ? (
                <VerifiedUserIcon className="w-10 h-10 mx-2.5 text-blue-500" />
              ) : null}
            </span>
          </div>
          <div className="text-left pl-4 pt-3">
            <span className="text-2xl text-gray-700 text-2xl mr-2">
              {data.email}
            </span>
          </div>
          <div className="text-left pl-4 pt-3">
            <span className="text-2xl font-semibold text-gray-700 mr-2">
              포스트 {data.postCount}
            </span>
            <span className="text-2xl font-semibold text-gray-700 mr-2">
              팔로워 {data.followerCount}
            </span>
            <span className="text-2xl font-semibold text-gray-700">
              팔로잉 {data.followingCount}
            </span>
          </div>
          <div className="text-left pl-4 pt-3 mt-5 w-9/12">
            <p className="text-xl font-medium text-black mr-2">
              {data.description}
            </p>
          </div>
        </div>
        <button
          className="text-base w-1/12 h-1/4 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded"
          type="button"
        >
          Follow
        </button>
      </div>
    </div>
  )
}
