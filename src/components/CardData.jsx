export default function CardData() {
  const images = [
    '/images/user1.jpg',
    '/images/user2.jpg',
    '/images/user3.jpg',
    '/images/user4.jpg',
    '/images/user5.jpg',
    '/images/user6.jpg',
    '/images/user7.jpg',
  ]
  const categories = ['자유', '정보', '일기', '질문']

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  function generateData() {
    const data = []
    for (let i = 0; i < 20; i++) {
      const newObj = {
        id: i + 1,
        tap: getRandomItem(categories),
        url: '#',
        title: `제목 ${i + 1}`,
        image: getRandomItem(images),
        alt: `user${i + 1}`,
        description: '설명',
      }
      data.push(newObj)
    }
    return data
  }
  const data = generateData()

  return data
}
