import type { Student } from '../types'
import { STATUS_LIST } from '../types'

export default function SummaryCards({ students }: { students: Student[] }) {
  const total = students.length
  const avg = total ? students.reduce((sum, s) => sum + s.ipk, 0) / total : 0
  const top = students.reduce<Student | null>((best, s) => (!best || s.ipk > best.ipk ? s : best), null)

  return (
    <section className="summary">
      <div className="stat stat-main">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total mahasiswa terdaftar</span>
      </div>
      <div className="stat">
        <span className="stat-value">{avg.toFixed(2)}</span>
        <span className="stat-label">Rata-rata IPK</span>
      </div>
      <div className="stat">
        <span className="stat-value small">{top ? top.nama : '-'}</span>
        <span className="stat-label">IPK tertinggi{top ? ` (${top.ipk.toFixed(2)})` : ''}</span>
      </div>
      <div className="stat status-breakdown">
        {STATUS_LIST.map((st) => {
          const count = students.filter((s) => s.status === st).length
          const pct = total ? (count / total) * 100 : 0
          return (
            <div key={st} className="bar-row">
              <span>{st}</span>
              <div className="bar"><div className={`bar-fill ${st}`} style={{ width: `${pct}%` }} /></div>
              <span>{count}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
