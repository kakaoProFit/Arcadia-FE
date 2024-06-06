// import TabContainer from '@/components/tab/tab-container'
import SubTab from '@/components/tab/tab'
import '@/styles/globals.css'

export default function BoardLayout({ children }) {
  return (
    <div className="bg-white mx-20 font-tenada">
      <SubTab />
      {children}
    </div>
  )
}
