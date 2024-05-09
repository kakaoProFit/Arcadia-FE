import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Table({ data, count, login }) {
    return (
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">제목</th>
                        <th scope="col" class="px-6 py-3">작성자</th>
                        <th scope="col" class="px-6 py-3">작성일자</th>
                        <th scope="col" class="px-6 py-3">조회수</th>
                        <th scope="col" class="px-6 py-3">추천수</th>
                        {login && <th scope="col" class="py-3"></th>}
                        {login && <th scope="col" class="py-3"></th>}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, count).map((data) => (
                        <tr key={data.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.title}
                            </th>
                            <td class="px-6 py-4">
                                {data.writer}
                            </td>
                            <td class="px-6 py-4">
                                {data.date}
                            </td>
                            <td class="px-6 py-4">
                                {data.views}
                            </td>
                            <td class="px-6 py-4">
                                {data.likes}
                            </td>
                            {login && <td class="py-4"><DeleteIcon color="secondary" sx={{ fontSize: 16 }} /></td>}
                            {login && <td class="py-4"><EditIcon color="secondary" sx={{ fontSize: 16 }} /></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}