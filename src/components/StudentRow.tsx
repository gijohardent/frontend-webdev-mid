import type { Student, Status } from '../types'
import { STATUS_LIST } from '../types'

interface Props {
  student: Student
  onEdit: (student: Student) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: Status) => void
}

export default function StudentRow({ student, onEdit, onDelete, onStatusChange }: Props) {
  return (
    <tr>
      <td>{student.nim}</td>
      <td className="name">{student.nama}</td>
      <td>{student.jurusan}</td>
      <td className={student.ipk >= 3.5 ? 'ipk high' : 'ipk'}>{student.ipk.toFixed(2)}</td>
      <td>
        <select
          className={`badge ${student.status}`}
          value={student.status}
          onChange={(e) => onStatusChange(student.id, e.target.value as Status)}
        >
          {STATUS_LIST.map((s) => <option key={s}>{s}</option>)}
        </select>
      </td>
      <td className="actions">
        <button className="btn small" onClick={() => onEdit(student)}>Ubah</button>
        <button className="btn small danger" onClick={() => onDelete(student.id)}>Hapus</button>
      </td>
    </tr>
  )
}
