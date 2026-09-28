import type { Student, Status } from '../types'
import StudentRow from './StudentRow'

interface Props {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: Status) => void
}

export default function StudentTable({ students, ...handlers }: Props) {
  if (students.length === 0) {
    return <p className="empty">Tidak ada mahasiswa yang cocok. Ubah kata kunci atau tambahkan data baru.</p>
  }
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>NIM</th><th>Nama</th><th>Jurusan</th><th>IPK</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {students.map((s) => <StudentRow key={s.id} student={s} {...handlers} />)}
        </tbody>
      </table>
    </div>
  )
}
