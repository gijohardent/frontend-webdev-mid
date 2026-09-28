import { useState } from 'react'
import './App.css'
import type { Student, Status } from './types'
import { initialStudents } from './data'
import Navbar from './components/Navbar'
import type { Page } from './components/Navbar'
import SummaryCards from './components/SummaryCards'
import StudentForm from './components/StudentForm'
import Toolbar from './components/Toolbar'
import StudentTable from './components/StudentTable'

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [page, setPage] = useState<Page>('ringkasan')
  const [editing, setEditing] = useState<Student | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | 'Semua'>('Semua')

  const handleSubmit = (values: Omit<Student, 'id'>) => {
    if (editing) {
      setStudents((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...values } : s)))
      setEditing(null)
    } else {
      setStudents((prev) => [{ id: Date.now(), ...values }, ...prev])
    }
  }

  const handleDelete = (id: number) => {
    if (!window.confirm('Hapus data mahasiswa ini?')) return
    setStudents((prev) => prev.filter((s) => s.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  const handleStatusChange = (id: number, status: Status) =>
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))

  const keyword = search.toLowerCase()
  const visible = students.filter(
    (s) =>
      (statusFilter === 'Semua' || s.status === statusFilter) &&
      (s.nama.toLowerCase().includes(keyword) || s.nim.includes(keyword)),
  )

  return (
    <div className="app">
      <Navbar page={page} onChange={setPage} />
      <main>
        {page === 'ringkasan' ? (
          <>
            <SummaryCards students={students} />
            <button className="btn primary" onClick={() => setPage('mahasiswa')}>Kelola data mahasiswa</button>
          </>
        ) : (
          <div className="layout">
            <StudentForm key={editing?.id ?? 'new'} editing={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
            <section className="panel">
              <h2>Daftar mahasiswa ({visible.length})</h2>
              <Toolbar search={search} onSearch={setSearch} status={statusFilter} onStatus={setStatusFilter} />
              <StudentTable
                students={visible}
                onEdit={setEditing}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
