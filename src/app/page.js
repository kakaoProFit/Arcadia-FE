import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import FavoriteIcon from '@mui/icons-material/Favorite'
import '@/styles/globals.css'

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const images = [
  '/images/user1.jpg',
  '/images/user2.jpg',
  '/images/user3.jpg',
  '/images/user4.jpg',
  '/images/user5.jpg',
  '/images/user6.jpg',
  '/images/user7.jpg',
]
const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4']

export function generateData() {
  const data = []
  for (let i = 0; i < 4; i++) {
    const newObj = {
      id: i + 1,
      tap: getRandomItem(categories),
      url: '#',
      title: `Card title ${i + 1}`,
      image: getRandomItem(images),
      alt: `user${i + 1}`,
      description: 'Test Description',
    }
    data.push(newObj)
  }
  return data
}

const data = generateData()

function getRandomCategory() {
  const randomIndex = Math.floor(Math.random() * categories.length)
  return categories[randomIndex]
}

const randomCategory = getRandomCategory()

function displayCard(data) {
  data = generateData()
  return (
    <div className="justify-between">
      <span className="mx-5 font-tenada self-center text-3xl my-10 font-semibold whitespace-nowrap dark:text-white">
        {getRandomCategory()}
      </span>
      <div className="grid gird-rows-2 grid-cols-2">
        {data.slice(0, 4).map((card) => (
          <div key={card.id} className="card-main">
            <a href={card.image}>
              <img className="rounded-t-lg" src={card.image} alt={card.alt} />
            </a>
            <div className="p-6">
              <h5 className="font-tenada mb-2 text-xl font-medium leading-tight">
                {card.title}
              </h5>
              <p className="font-tenada mb-4 text-base">{card.description}</p>
              <p className="font-tenada mt-10 text-sm">작성자: test</p>
            </div>
            <div className="grid grid-cols-3">
              <a className="mx-5 my-5 flex justify-center" href="#">
                <DeleteIcon />
              </a>
              <a className="mx-5 my-5 flex justify-center" href="#">
                <CreateIcon />
              </a>
              <a className="mx-5 my-5 flex justify-center" href="#">
                <FavoriteIcon />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="mx-20 my-10">
      <div className="flex justify-center">
        <span className="font-tenada self-center text-3xl my-10 font-semibold whitespace-nowrap dark:text-white">
          메인 페이지
        </span>
      </div>
      <div className="grid gap-20 grid-rows-2 grid-cols-2">
        {' '}
        {/* 메인 2*2 */}
        {displayCard(data)}
        {displayCard(data)}
        {displayCard(data)}
        {displayCard(data)}
      </div>
    </div>
  )
}
