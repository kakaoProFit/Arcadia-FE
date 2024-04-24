import styles from '@/app/page.module.css'
import MonthlyReport from '@/components/monthly-report/monthly-report'

export default function MonthlyReportPage() {
  return (
    <div className={styles.main}>
      <MonthlyReport />
    </div>
  )
}
