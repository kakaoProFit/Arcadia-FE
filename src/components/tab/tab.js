// 'use client'
// import { Box, Tabs, Tab, Paper } from '@mui/material'
import Link from 'next/link'
import { tab_config } from '@/constants/tab-config'

export default function DiaryListTab() {
  // const { tabNum, tabProps } = props
  const tab_config_data = tab_config

  return (
    // <Box sx={{ width: '100%' }}>
    //   <Tabs
    //     value={tabNum}
    //     aria-label="nav tabs"
    //     role="navigation"
    //     TabIndicatorProps={{ style: { background: '#1e3269' } }}
    //     textColor="inherit"
    //   >
    //     {tabProps.map((it, index) => (
    //       <Tab
    //         component={Link}
    //         key={index}
    //         label={it.label}
    //         href={`${it.href}`}
    //       />
    //     ))}
    //   </Tabs>
    // </Box>
    <div className="bg-white mb-10 lg:px-6 py-2.5">
      <div class="mx-auto font-tenada">
        <div class="mx-10 border-b border-gray-200 dark:border-gray-700 mb-4">
          <ul
            class="flex flex-wrap -mb-px"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            {tab_config_data.map((item) => (
              <li key={item.id} class="mr-2" role="presentation">
                <button
                  class="text-lg inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id={item.id}
                >
                  {item.name}
                  <Link href={item.href}></Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
