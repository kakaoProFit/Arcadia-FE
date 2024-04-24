'use client'

import React, { useState } from 'react'
import styles from '../page.module.css'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Tooltip,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const pages = [
  {
    page: '일기',
    href: '/diary/mydiary',
  },
  {
    page: '게시판',
    href: '/board',
  },
  {
    page: '매칭',
    href: '/matching',
  },
  {
    page: '고객센터',
    href: '/customer-service',
  },
]
const settings = [
  {
    page: '마이 페이지',
    href: '/mypage/myInfo',
  },
  {
    page: '로그아웃',
    href: '/logout',
  },
]

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{ background: 'rgba(225, 225, 225, 0.8)', boxShadow: 'none' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Image
              src="/images/logo_transparent.png"
              width={75}
              height={75}
              alt="Arcadia Logo"
            />
          </Link>
          <Link href="/">
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize:'26px', color: 'black' }}
              href="/"
            >
              아르카디아
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {' '}
            {/* 페이지 목록 */}
            {pages.map((page) => (
              <Button
                href={page.href}
                key={page.page}
                onClick={handleCloseNavMenu}
                color="inherit"
                sx={{fontWeight:'400', fontSize:'21px', my: 2, color: 'black', display: 'block' }}
              >
                {page.page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/images/user1.jpg"
                  sx={{ ml: 3 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link key={setting.page} href={setting.href} passHref>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
