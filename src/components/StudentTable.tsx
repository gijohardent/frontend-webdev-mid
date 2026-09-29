import type { Student } from '../types'
import StudentRow from './StudentRow'

interface StudentTableProps {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: string) => void
}

const StudentTable = ({ students, onEdit, onDelete, onStatusChange }: StudentTableProps) => {
  if (students.length === 0) {
    return <p className="empty">Tidak ada mahasiswa yang cocok. Ubah kata kunci atau tambahkan data baru.</p>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Jurusan</th>
            <th>IPK</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
