import TableHeader from './TableHeader'

export default function Table({ data }) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <TableHeader />
      <tbody>
        {data.map((data) => (
          <tr key={data.id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {data.title}
            </th>
            <td className="px-6 py-4">{data.writer}</td>
            <td className="px-6 py-4">{data.date}</td>
            <td className="px-6 py-4">{data.views}</td>
            <td className="px-6 py-4">{data.likes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
