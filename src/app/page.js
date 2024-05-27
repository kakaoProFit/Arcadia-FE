import Card from '@/components/Card'
import CardData from '@/components/CardData'
export default function Home() {
  return (
    <div className="mx-20 my-10 bg-white font-tenada">
      <div className="grid gap-10 grid-rows-2 grid-cols-2">
        <Card data={CardData()} count={4} />
        <Card data={CardData()} count={4} />
        <Card data={CardData()} count={4} />
        <Card data={CardData()} count={4} />
      </div>
    </div>
  )
}
