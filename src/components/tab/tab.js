'use client'
import { Box, Tabs, Tab, Paper } from '@mui/material'
import Link from 'next/link'

export default function DiaryListTab(props) {

  const {tabNum, tabProps} = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabNum}
        aria-label="nav tabs"
        role="navigation"
        TabIndicatorProps={{ style: { background: "#1e3269" } }}
        textColor="inherit"
      >
        {tabProps.map((it, index) => (
          <Tab
            component={Link}
            key={index}
            label={it.label}
            href={`${it.href}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
