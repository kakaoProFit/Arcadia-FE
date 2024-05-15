import '@/styles/globals.css'
import Table from '@/components/Table.jsx'
import TableData from '@/components/TableData.jsx'

export default function FreeBoardPage() {
  return (
    <div className="mx-20 font-tenada">
      <span className="mx-5 self-center text-3xl my-10 font-semibold whitespace-nowrap dark:text-white">
        게시판 이름
      </span>
      <div className="my-10 relative overflow-x-auto">
        <Table data={TableData()} count={12} />
      </div>
    </div>
  )
}
