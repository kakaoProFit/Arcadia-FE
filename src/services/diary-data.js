export async function fetchCardData(currentPage, query) {
  const myHeaders = new Headers()
  // 이 코드 좀 위험함 쿠키 나중에 받을 때 삭제되면 어캄? 나중에 테스트 꼭해보기!!!!!!!
  myHeaders.append('Content-Type', 'application/json')

  const raw_data = { currentPage: currentPage, query: query }

  // caching을 하면 데이터가 맞지 않는 부분이 있음.
  // 조회수나 이런 것들을 표시한다는 가정하에 데이터가 자주 바뀔 수 있으므로 no-store
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw_data),
    redirect: 'follow',
    cache: 'no-store',
  }

  const res = await fetch(
    'https://c2fa1327-2fa1-46f2-b030-eba4d6b65b37.mock.pstmn.io/diary/list',
    requestOptions,
  )
  if (!res.ok) {
    throw new Error('Failed to card fetch data')
  }
  const output_data = await res.json()
  // console.log(output_data)
  return output_data
}
