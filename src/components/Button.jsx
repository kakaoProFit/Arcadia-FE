import Link from 'next/link'

export default function Button({ name, href }) {
  return (
    <button
      type="button"
      className="font-tenada text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
    >
      <Link href={href}>{name}</Link>
    </button>
  )
}
