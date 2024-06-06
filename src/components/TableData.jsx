export default function TableData() {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const dummyData = []
  for (let i = 1; i <= 100; i++) {
    const id = i
    const title = '제목 ' + i
    const writer = '작성자 ' + i
    const date = '2021-09-01' // 일정한 날짜로 설정 (선택사항)
    const views = getRandomNumber(50, 500) // 랜덤한 조회수 생성
    const likes = getRandomNumber(5, 50) // 랜덤한 좋아요 수 생성
    const commentLength = getRandomNumber(0, 10) // 랜덤한 댓글 수 생성

    dummyData.push({
      id: id,
      title: title,
      writer: writer,
      date: date,
      views: views,
      likes: likes,
      commentLength: commentLength,
    })
  }
  return dummyData
}

export const listResponse = {
  category: 'free',
  notices: [],
  boards: {
    content: [
      {
        createdAt: [2024, 6, 2, 17, 0, 36, 344878000],
        lastModifiedAt: [2024, 6, 2, 17, 0, 36, 344878000],
        id: 8,
        title: '8',
        body: 'This is the body of the test post3.',
        category: 'FREE',
        likeCnt: 0,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
      {
        createdAt: [2024, 6, 2, 16, 37, 15, 861093000],
        lastModifiedAt: [2024, 6, 2, 16, 37, 15, 861093000],
        id: 7,
        title: '7',
        body: 'This is the body of the test post3.',
        category: 'FREE',
        likeCnt: 0,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
      {
        createdAt: [2024, 5, 31, 17, 45, 24, 872982000],
        lastModifiedAt: [2024, 5, 31, 17, 45, 24, 872982000],
        id: 6,
        title: '6',
        body: 'This is the body of the test post3.',
        category: 'FREE',
        likeCnt: 0,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
      {
        createdAt: [2024, 5, 31, 17, 23, 38, 931090000],
        lastModifiedAt: [2024, 5, 31, 17, 23, 38, 931090000],
        id: 5,
        title: '5',
        body: 'This is the body of the test post3.',
        category: 'FREE',
        likeCnt: 0,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
      {
        createdAt: [2024, 5, 31, 17, 22, 23, 586923000],
        lastModifiedAt: [2024, 5, 31, 17, 22, 23, 586923000],
        id: 4,
        title: '4',
        body: 'hihihi',
        category: 'FREE',
        likeCnt: 0,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
      {
        createdAt: [2024, 5, 31, 17, 21, 27, 359735000],
        lastModifiedAt: [2024, 5, 31, 17, 21, 27, 359735000],
        id: 3,
        title: '3',
        body: 'hihihi',
        category: 'FREE',
        likeCnt: 0,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
      {
        createdAt: [2024, 5, 31, 17, 10, 44, 463210000],
        lastModifiedAt: [2024, 5, 31, 17, 10, 44, 463210000],
        id: 2,
        title: '2',
        body: 'This is the body of the test post3.',
        category: 'FREE',
        likeCnt: 0,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
      {
        createdAt: [2024, 5, 31, 16, 20, 18, 164973000],
        lastModifiedAt: [2024, 6, 2, 17, 38, 8, 323919000],
        id: 1,
        title: '1',
        body: 'This is the body of the test post3.',
        category: 'FREE',
        likeCnt: 3,
        comments: [],
        commentCnt: 0,
        uploadImage: null,
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 12,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      unpaged: false,
      paged: true,
    },
    last: true,
    totalElements: 8,
    totalPages: 1,
    size: 12,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    numberOfElements: 8,
    empty: false,
  },
  boardSearchRequest: {
    sortType: 'id',
    searchType: 'title',
    keyword: '',
  },
}
