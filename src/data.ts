import type { Student } from './types'

export const statusList = ['Aktif', 'Cuti', 'Lulus']
export const jurusanList = ['Informatika', 'Sistem Informasi', 'Teknik Elektro', 'Manajemen', 'Desain Komunikasi Visual']

export const initialStudents: Student[] = [
  { id: 1, nim: '2201001', nama: 'Student A', jurusan: 'Informatika', ipk: 3.82, status: 'Aktif' },
  { id: 2, nim: '2201002', nama: 'Student B', jurusan: 'Sistem Informasi', ipk: 3.15, status: 'Aktif' },
  { id: 3, nim: '2101014', nama: 'Student C', jurusan: 'Manajemen', ipk: 3.56, status: 'Lulus' },
  { id: 4, nim: '2201020', nama: 'Student D', jurusan: 'Teknik Elektro', ipk: 2.94, status: 'Cuti' },
  { id: 5, nim: '2301007', nama: 'Student E', jurusan: 'Desain Komunikasi Visual', ipk: 3.71, status: 'Aktif' },
  { id: 6, nim: '2101033', nama: 'Student F', jurusan: 'Informatika', ipk: 3.4, status: 'Lulus' },
]
