export type Status = 'Aktif' | 'Cuti' | 'Lulus'

export interface Student {
  id: number
  nim: string
  nama: string
  jurusan: string
  ipk: number
  status: Status
}

export const STATUS_LIST: Status[] = ['Aktif', 'Cuti', 'Lulus']
export const JURUSAN_LIST = ['Informatika', 'Sistem Informasi', 'Teknik Elektro', 'Manajemen', 'Desain Komunikasi Visual']
