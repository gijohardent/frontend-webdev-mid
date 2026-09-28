import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Student, Status } from '../types'
import { JURUSAN_LIST, STATUS_LIST } from '../types'

type FormValues = Omit<Student, 'id'>

interface Props {
  editing: Student | null
  onSubmit: (values: FormValues) => void
  onCancel: () => void
}

const emptyForm: FormValues = { nim: '', nama: '', jurusan: JURUSAN_LIST[0], ipk: 0, status: 'Aktif' }

export default function StudentForm({ editing, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<FormValues>(editing ?? emptyForm)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: name === 'ipk' ? Number(value) : name === 'status' ? (value as Status) : value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!values.nim.trim() || !values.nama.trim()) {
      setError('NIM dan nama wajib diisi.')
      return
    }
    if (values.ipk < 0 || values.ipk > 4) {
      setError('IPK harus antara 0 dan 4.')
      return
    }
    setError('')
    onSubmit({ ...values, nim: values.nim.trim(), nama: values.nama.trim() })
    if (!editing) setValues(emptyForm)
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>{editing ? `Ubah data ${editing.nama}` : 'Tambah mahasiswa'}</h2>
      <label>NIM
        <input name="nim" value={values.nim} onChange={handleChange} placeholder="2201001" />
      </label>
      <label>Nama lengkap
        <input name="nama" value={values.nama} onChange={handleChange} placeholder="Nama mahasiswa" />
      </label>
      <label>Jurusan
        <select name="jurusan" value={values.jurusan} onChange={handleChange}>
          {JURUSAN_LIST.map((j) => <option key={j}>{j}</option>)}
        </select>
      </label>
      <div className="row">
        <label>IPK
          <input name="ipk" type="number" step="0.01" min="0" max="4" value={values.ipk} onChange={handleChange} />
        </label>
        <label>Status
          <select name="status" value={values.status} onChange={handleChange}>
            {STATUS_LIST.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="row">
        <button type="submit" className="btn primary">{editing ? 'Simpan perubahan' : 'Tambah data'}</button>
        {editing && <button type="button" className="btn" onClick={onCancel}>Batal</button>}
      </div>
    </form>
  )
}
