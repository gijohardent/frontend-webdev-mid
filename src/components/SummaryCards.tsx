import type { Student } from '../types'
import { statusList } from '../data'

interface SummaryCardsProps {
  students: Student[]
}

const SummaryCards = ({ students }: SummaryCardsProps) => {
  const total = students.length

  // reduce: menjumlahkan semua IPK menjadi satu angka
  const rataRata = total > 0 ? students.reduce((sum, s) => sum + s.ipk, 0) / total : 0

  // Cari IPK tertinggi, lalu cari mahasiswa pemilik IPK itu
  const ipkTertinggi = Math.max(...students.map((s) => s.ipk))
  const terbaik = students.find((s) => s.ipk === ipkTertinggi)

  return (
    <section className="summary">
      <div className="stat stat-main">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total mahasiswa terdaftar</span>
      </div>

      <div className="stat">
        <span className="stat-value">{rataRata.toFixed(2)}</span>
        <span className="stat-label">Rata-rata IPK</span>
      </div>

      <div className="stat">
        {terbaik ? (
          <>
            <span className="stat-value small">{terbaik.nama}</span>
            <span className="stat-label">IPK tertinggi ({terbaik.ipk})</span>
          </>
        ) : (
          <span className="stat-label">Belum ada data</span>
        )}
      </div>

      <div className="stat">
        {statusList.map((status) => {
          const jumlah = students.filter((s) => s.status === status).length
          const persen = total > 0 ? (jumlah / total) * 100 : 0
          return (
            <div key={status} className="bar-row">
              <span>{status}</span>
              <div className="bar">
                <div className={`bar-fill ${status}`} style={{ width: `${persen}%` }} />
              </div>
              <span>{jumlah}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SummaryCards
