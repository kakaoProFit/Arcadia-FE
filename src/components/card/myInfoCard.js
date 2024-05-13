'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'

function MyInfoCard() {
  const [notificationEnabled, setNotificationEnabled] = React.useState(false)
  const [lockEnabled, setlockEnabled] = React.useState(false)

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled)
  }

  const handleLockToggle = () => {
    setlockEnabled(!lockEnabled)
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          minWidth: 275,
          border: '2px',
          mb: 2,
          alignItems: 'center',
          ml: 20,
        }}
      >
        {lockEnabled ? (
          <LockOpenIcon fontSize="large" />
        ) : (
          <LockIcon fontSize="large" />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">계정 공개 허용</Typography>
        </CardContent>
        <CardActions>
          <Switch checked={lockEnabled} onChange={handleLockToggle} />
        </CardActions>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          minWidth: 275,
          border: '2px',
          mb: 40,
          alignItems: 'center',
          ml: 20,
        }}
      >
        {notificationEnabled ? (
          <NotificationsActiveIcon fontSize="large" />
        ) : (
          <NotificationsNoneIcon fontSize="large" />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">알림</Typography>
        </CardContent>
        <CardActions>
          <Switch
            checked={notificationEnabled}
            onChange={handleNotificationToggle}
          />
        </CardActions>
      </Box>
    </div>
  )
}

export default MyInfoCard
