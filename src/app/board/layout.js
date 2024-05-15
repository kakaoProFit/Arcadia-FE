// import TabContainer from '@/components/tab/tab-container'
import SubTab from '@/components/tab/tab'
import '@/styles/globals.css'

export default function BoardLayout({ children }) {
  return (
    <div className="bg-white mx-20 font-tenada">
      {/* <span className="mx-5 self-center text-3xl my-10 font-semibold whitespace-nowrap dark:text-white">
          게시판 이름
      </span> */}
      <SubTab />
      {children}
    </div>
  )
}
