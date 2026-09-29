export interface Student {
  id: number
  nim: string
  nama: string
  jurusan: string
  ipk: number
  status: string
}

// Data form = Student tanpa id (id dibuat otomatis oleh App)
export type StudentFormValues = Omit<Student, 'id'>
