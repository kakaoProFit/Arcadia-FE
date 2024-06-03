import Skeleton from '@mui/material/Skeleton'

export default function RectangleSkeleton(props) {
  const { width, height } = props
  return (
    <div>
      <Skeleton variant="rectangle" width={width} height={height} />
    </div>
  )
}
