import { useState } from 'react'
import type { Student, StudentFormValues } from '../types'
import StudentForm from './StudentForm'
import Toolbar from './Toolbar'
import StudentTable from './StudentTable'

interface StudentManagerProps {
  students: Student[]
  onStudentsChange: (students: Student[]) => void
}

// Halaman "Data Mahasiswa": semua state dan fungsi CRUD ada di sini
const StudentManager = ({ students, onStudentsChange }: StudentManagerProps) => {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua')

  // Tambah atau ubah, tergantung apakah sedang ada data yang diedit
  const handleSubmit = (values: StudentFormValues) => {
    if (editingStudent) {
      onStudentsChange(students.map((s) => (s.id === editingStudent.id ? { ...s, ...values } : s)))
      setEditingStudent(null)
    } else {
      onStudentsChange([{ id: Date.now(), ...values }, ...students])
    }
  }

  const handleDelete = (id: number) => {
    if (!window.confirm('Hapus data mahasiswa ini?')) return
    onStudentsChange(students.filter((s) => s.id !== id))
    setEditingStudent(null)
  }

  const handleStatusChange = (id: number, status: string) => {
    onStudentsChange(students.map((s) => (s.id === id ? { ...s, status } : s)))
  }

  const keyword = search.toLowerCase()
  const visibleStudents = students.filter(
    (s) =>
      (s.nama.toLowerCase().includes(keyword) || s.nim.includes(keyword)) &&
      (filterStatus === 'Semua' || s.status === filterStatus),
  )

  return (
    <div className="layout">
      <StudentForm
        editingStudent={editingStudent}
        onSubmit={handleSubmit}
        onCancel={() => setEditingStudent(null)}
      />

      <section className="panel">
        <h2>Daftar mahasiswa ({visibleStudents.length})</h2>
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        <StudentTable
          students={visibleStudents}
          onEdit={setEditingStudent}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </section>
    </div>
  )
}

export default StudentManager
