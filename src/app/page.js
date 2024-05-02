'use client'

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '@/styles/globals.css'

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}


const images = [ '/images/user1.jpg', '/images/user2.jpg', '/images/user3.jpg', '/images/user4.jpg', '/images/user5.jpg', '/images/user6.jpg', '/images/user7.jpg', ]
const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

export function generateData() {
  const data = []
  for (let i = 0; i < 4; i++) {
    const newObj = {
      id: i + 1,
      tap: getRandomItem(categories),
      url: "#",
      title: `Card title ${i + 1}`,
      image: getRandomItem(images),
      alt: `user${i + 1}`,
      description: 'Test Description'
    }
    data.push(newObj)
  }
  return data
}

const data = generateData();


function getRandomCategory() {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

const randomCategory = getRandomCategory();

function displayCard(data) {
  data = generateData();
  return (
    <div class="justify-between">
      <span class="mx-5 font-tenada self-center text-3xl my-10 font-semibold whitespace-nowrap dark:text-white">{getRandomCategory()}</span>
    <div class="grid gird-rows-2 grid-cols-2">
    {data.slice(0, 4).map((card) => (
      <div key={card.id} class="card-main">
        <a href={card.image}>
          <img class="rounded-t-lg" src= {card.image} alt= {card.alt}/>
        </a>
        <div class="p-6">
          <h5 class="font-tenada mb-2 text-xl font-medium leading-tight">{card.title}</h5>
          <p class="font-tenada mb-4 text-base">
            {card.description}
          </p>
          <p class="font-tenada mt-10 text-sm">
            작성자: test
          </p>
        </div>
        <div class="grid grid-cols-3">
          <a class="mx-5 my-5 flex justify-center"
            href="#">
            <DeleteIcon />
          </a>
          <a class="mx-5 my-5 flex justify-center"
            href="#">
            <CreateIcon />
          </a>
          <a class="mx-5 my-5 flex justify-center"
            href="#">
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
    <div class="mx-20 my-10">
      <div class="flex justify-center">
        <span class="font-tenada self-center text-3xl my-10 font-semibold whitespace-nowrap dark:text-white">메인 페이지</span>
      </div>
        <div class="grid gap-20 grid-rows-2 grid-cols-2"> {/* 메인 2*2 */}
            {displayCard(data)}
            {displayCard(data)}
            {displayCard(data)}
            {displayCard(data)}
        </div>
    </div>
  )
}