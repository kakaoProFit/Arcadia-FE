'use client'
export function getProfileImage() {
  return fetch(
    `https://spring.arcadiaprofit.shop/profileimage/download?user_id=1`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          '네트워크 응답에 문제가 있습니다: ' + response.statusText,
        )
      }
      return response.url // 이미지url 이용
    })
    .catch((error) => {
      console.error('fetch 작업에 문제가 발생했습니다:', error)
    })
}

export function getProfileInfo() {
  return fetch(`https://spring.arcadiaprofit.shop/users/read/1`, {
    //${userId}
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
      //data = response.json() // JSON으로 파싱
      return response.json() // 파싱된 데이터를 반환
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      )
    })
}
