import TabContainer from '@/components/tab/tab-container'
import Script from 'next/script'

export default function DiaryListLayout({ children }) {
  return (
    <>
      <TabContainer />
      {children}
    </>
  )
}
