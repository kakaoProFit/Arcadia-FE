'use client'

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { Modal, Button } from 'flowbite-react'
import Following from '@/components/Following'
import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from 'cookies-next'
const followData = [
  {
    avatar: '/images/1.jpg',
    user: 'Aespa',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Ive',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Big Bang',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Seventeen',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'TWS',
    follow: false,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Rise',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'JYP',
    follow: false,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Aespa',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Ive',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Big Bang',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Seventeen',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'TWS',
    follow: false,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Rise',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'JYP',
    follow: false,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Aespa',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Ive',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Big Bang',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Seventeen',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'TWS',
    follow: false,
  },
  {
    avatar: '/images/1.jpg',
    user: 'Rise',
    follow: true,
  },
  {
    avatar: '/images/1.jpg',
    user: 'JYP',
    follow: false,
  },
]

export default function InfoGrid({ data }) {
  const myId = jwtDecode(getCookie('accessToken')).userId
  const [followingShow, setFollowingShow] = useState(false)
  const [followerShow, setFollowerShow] = useState(false)
  console.log(myId, data.userId)

  return (
    <div className="bg-white h-auto px-48 flex">
      <img src={data.image} className="w-1/4 h-1/4" />
      <div className="flex md:flex-row-reverse flex-wrap">
        <div className="w-full md:w-3/4 p-4 text-center">
          <div className="text-left pl-4 pt-3">
            <span className="text-4xl text-gray-700 text-2xl mr-2 justify-center">
              {data.name}
              {data.userVerified ? (
                <VerifiedUserIcon className="w-10 h-10 mx-2.5 text-blue-500" />
              ) : null}
            </span>
          </div>
          <div className="text-left pl-4 pt-3">
            <span className="text-2xl text-gray-700 text-2xl mr-2">
              {data.email}
            </span>
          </div>
          <div className="text-left pl-4 pt-3">
            <span className="text-2xl font-semibold text-gray-700 mr-2">
              포스트 {data.postCount}
            </span>
            <span className="text-2xl font-semibold text-gray-700 mr-2">
              <button onClick={() => setFollowerShow(true)}>팔로워</button>{' '}
              {data.followerCount}
            </span>
            <span className="text-2xl font-semibold text-gray-700">
              <button onClick={() => setFollowingShow(true)}>팔로잉</button>{' '}
              {data.followingCount}
            </span>
          </div>
          <div className="text-left pl-4 pt-3 mt-5 w-9/12">
            <p className="text-xl font-medium text-black mr-2">
              {data.description}
            </p>
          </div>
          {data.userId !== myId ? ( // 본인일 경우, 버튼 누를 시 로그인 체크도 해야할 듯?
            <div className="flex justify-end mr-2">
              <button
                className="text-base p-3 w-2/12 h-1/4 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded"
                type="button"
              >
                Follow
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        size="xl7"
        className="font-tenada"
        show={followingShow}
        handleClose={() => setFollowingShow(false)}
        onClose={() => setFollowingShow(false)}
      >
        <Modal.Header>팔로잉</Modal.Header>
        <Modal.Body>
          <Following data={followData} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setFollowingShow(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="xl7"
        className="font-tenada"
        show={followerShow}
        handleClose={() => setFollowerShow(false)}
        onClose={() => setFollowerShow(false)}
      >
        <Modal.Header>팔로워</Modal.Header>
        <Modal.Body>
          <Following data={followData} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setFollowerShow(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
