import type { Student } from '../types'
import { statusList } from '../data'

interface StudentRowProps {
  student: Student
  onEdit: (student: Student) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: string) => void
}

const StudentRow = ({ student, onEdit, onDelete, onStatusChange }: StudentRowProps) => {
  const { id, nim, nama, jurusan, ipk, status } = student // destructuring

  return (
    <tr>
      <td>{nim}</td>
      <td className="name">{nama}</td>
      <td>{jurusan}</td>
      <td className={ipk >= 3.5 ? 'ipk high' : 'ipk'}>{ipk.toFixed(2)}</td>
      <td>
        <select className={`badge ${status}`} value={status} onChange={(e) => onStatusChange(id, e.target.value)}>
          {statusList.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </td>
      <td className="actions">
        <button className="btn small" onClick={() => onEdit(student)}>
          Ubah
        </button>
        <button className="btn small danger" onClick={() => onDelete(id)}>
          Hapus
        </button>
      </td>
    </tr>
  )
}

export default StudentRow
