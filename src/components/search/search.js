'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import SelectSearchCategory from './select-category'
import { Box } from '@mui/material'

export default function SearchTextField() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  function searchSubmit() {
    console.log('checked')
  }

  return (
    <>
      <Box
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
      >
        <SelectSearchCategory />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색"
          defaultValue={searchParams.get('query')?.toString}
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} onSubmit={searchSubmit}>
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  )
}
