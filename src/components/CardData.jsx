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
    // const data = []
    // for (let i = 0; i < 20; i++) {
    //   const newObj = {
    //     id: i + 1,
    //     tap: '2022-03-02',
    //     url: '#',
    //     title: `제목 ${i + 1}`,
    //     image: getRandomItem(images),
    //     alt: `user${i + 1}`,
    //     description: '작성자1',
    //   }
    //   data.push(newObj)
    // }
    const data = [
      {
        id: 1,
        tap: '2024-05-31',
        url: 'diary/mom',
        title: '육아란 힘들다...',
        image: '/images/11.jpg',
        alt: 'user1',
        description: '초보맘',
      },
      {
        id: 2,
        tap: '2024-05-31',
        url: '#',
        title: '아기의 수면 패턴',
        image: '/images/22.jpg',
        alt: 'user2',
        description: '나만의 육아일기',
      },
      {
        id: 3,
        tap: '2024-06-02',
        url: '#',
        title: '건강한 이유식 만들기',
        image: '/images/33.jpg',
        alt: 'user3',
        description: '태양이',
      },
      {
        id: 4,
        tap: '2024-06-03',
        url: '#',
        title: '육아 스트레스 관리법',
        image: '/images/44.png',
        alt: 'user4',
        description: '정신수양',
      },
      {
        id: 5,
        tap: '2024-06-09',
        url: '#',
        title: '아기와의 소통 방법',
        image: '/images/55.jpg',
        alt: 'user5',
        description: '좋은 아빠가 되자',
      },
      {
        id: 6,
        tap: '2022-03-02',
        url: '#',
        title: '육아와 일 병행하기',
        image: '/images/66.jpg',
        alt: 'user6',
        description: '작성자6',
      },
      {
        id: 7,
        tap: '2022-03-02',
        url: '#',
        title: '아기 놀이 아이디어',
        image: '/images/77.jpg',
        alt: 'user7',
        description: '작성자7',
      },
      {
        id: 8,
        tap: '2022-03-02',
        url: '#',
        title: '아기의 첫 걸음마',
        image: '/images/88.jpg',
        alt: 'user8',
        description: '작성자8',
      },
      {
        id: 9,
        tap: '2022-03-02',
        url: '#',
        title: '육아 휴직 활용법',
        image: getRandomItem(images),
        alt: 'user9',
        description: '작성자9',
      },
      {
        id: 10,
        tap: '2022-03-02',
        url: '#',
        title: '아기 예방접종 정보',
        image: getRandomItem(images),
        alt: 'user10',
        description: '작성자10',
      },
      {
        id: 11,
        tap: '2022-03-02',
        url: '#',
        title: '육아 도서 추천',
        image: getRandomItem(images),
        alt: 'user11',
        description: '작성자11',
      },
      {
        id: 12,
        tap: '2022-03-02',
        url: '#',
        title: '아기 식습관 개선',
        image: getRandomItem(images),
        alt: 'user12',
        description: '작성자12',
      },
      {
        id: 13,
        tap: '2022-03-02',
        url: '#',
        title: '육아용품 구매 가이드',
        image: getRandomItem(images),
        alt: 'user13',
        description: '작성자13',
      },
      {
        id: 14,
        tap: '2022-03-02',
        url: '#',
        title: '아기 피부 관리법',
        image: getRandomItem(images),
        alt: 'user14',
        description: '작성자14',
      },
      {
        id: 15,
        tap: '2022-03-02',
        url: '#',
        title: '육아 커뮤니티 소개',
        image: getRandomItem(images),
        alt: 'user15',
        description: '작성자15',
      },
      {
        id: 16,
        tap: '2022-03-02',
        url: '#',
        title: '아기와 함께하는 여행',
        image: getRandomItem(images),
        alt: 'user16',
        description: '작성자16',
      },
      {
        id: 17,
        tap: '2022-03-02',
        url: '#',
        title: '육아 일기 쓰기',
        image: getRandomItem(images),
        alt: 'user17',
        description: '작성자17',
      },
      {
        id: 18,
        tap: '2022-03-02',
        url: '#',
        title: '아기 성격 파악하기',
        image: getRandomItem(images),
        alt: 'user18',
        description: '작성자18',
      },
      {
        id: 19,
        tap: '2022-03-02',
        url: '#',
        title: '육아 체험 공유',
        image: getRandomItem(images),
        alt: 'user19',
        description: '작성자19',
      },
      {
        id: 20,
        tap: '2022-03-02',
        url: '#',
        title: '아기 치아 관리법',
        image: getRandomItem(images),
        alt: 'user20',
        description: '작성자20',
      },
    ]
    return data
  }
  const data = generateData()

  return data
}
