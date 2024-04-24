import TabContainer from '@/components/tab/tab-container'

export default function DiaryListLayout({ children }) {
  return (
    <>
      <TabContainer />
      {children}
    </>
  )
}
