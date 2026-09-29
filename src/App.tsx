import { useState } from 'react'
import './App.css'
import type { Student } from './types'
import { initialStudents } from './data'
import Navbar from './components/Navbar'
import SummaryCards from './components/SummaryCards'
import StudentManager from './components/StudentManager'

// App hanya menyimpan data yang dipakai bersama: daftar mahasiswa dan halaman aktif
const App = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [page, setPage] = useState('ringkasan')

  return (
    <div className="app">
      <Navbar page={page} onChangePage={setPage} />
      <main>
        {page === 'ringkasan' ? (
          <SummaryCards students={students} />
        ) : (
          <StudentManager students={students} onStudentsChange={setStudents} />
        )}
      </main>
    </div>
  )
}

export default App
