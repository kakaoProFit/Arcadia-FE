import styles from '@/app/page.module.css'
import MonthlyReport from '@/components/monthly-report/monthly-report'

export default function WeeklyReportPage() {
  return(
    <div className={styles.main}>
      <MonthlyReport />
    </div>
  )
}
