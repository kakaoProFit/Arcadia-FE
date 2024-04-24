import DiaryListTab from '@/components/tab/tab'

export default function DiaryListLayout({ children }) {
  return (
    <>
      <DiaryListTab />
      {children}
    </>
  )
}
