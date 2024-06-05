export default function Card({ data, count }) {
  // data[0].tap => 게시판 이름
  return (
    <div className="bg-white justify-between font-tenada">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.slice(0, count).map((card) => (
          <div key={card.id} className="card-main">
            <a href={card.url}>
              <img className="rounded-t-lg" src={card.image} alt={card.alt} />
            </a>
            <div className="p-6">
              <h5 className="font-tenada mb-2 text-xl font-medium leading-tight">
                {card.title}
              </h5>
              <p className="font-tenada mb-4 text-base">{card.description}</p>
              <p className="font-tenada mt-10 text-sm">{card.tap}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
