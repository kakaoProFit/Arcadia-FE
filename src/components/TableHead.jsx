export default function TableHead() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3">
          제목
        </th>
        <th scope="col" className="px-6 py-3">
          작성자
        </th>
        <th scope="col" className="px-6 py-3">
          <button>작성일자</button>
        </th>
        <th scope="col" className="px-6 py-3">
          <button>조회수</button>
        </th>
        <th scope="col" className="px-6 py-3">
          <button>추천수</button>
        </th>
      </tr>
    </thead>
  )
}
