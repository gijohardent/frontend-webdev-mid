import { useState, useEffect } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Student, StudentFormValues as FormValues } from '../types'
import { jurusanList, statusList } from '../data'

interface StudentFormProps {
  editingStudent: Student | null
  onSubmit: (values: FormValues) => void
  onCancel: () => void
}

const emptyForm: FormValues = {
  nim: '',
  nama: '',
  jurusan: jurusanList[0],
  ipk: 0,
  status: 'Aktif',
}

const StudentForm = ({ editingStudent, onSubmit, onCancel }: StudentFormProps) => {
  // Satu object state untuk semua input
  const [form, setForm] = useState<FormValues>(emptyForm)
  const [error, setError] = useState('')

  // Isi form saat masuk mode ubah, kosongkan saat kembali ke mode tambah
  useEffect(() => {
    setForm(editingStudent ?? emptyForm)
    setError('')
  }, [editingStudent])

  // Satu handler untuk semua input, dibedakan lewat atribut name
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: name === 'ipk' ? Number(value) : value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!form.nim.trim() || !form.nama.trim()) {
      setError('NIM dan nama wajib diisi.')
      return
    }
    if (form.ipk < 0 || form.ipk > 4) {
      setError('IPK harus antara 0 dan 4.')
      return
    }

    setError('')
    onSubmit(form)
    if (!editingStudent) setForm(emptyForm)
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? 'Ubah data mahasiswa' : 'Tambah mahasiswa'}</h2>

      <label>
        NIM
        <input name="nim" value={form.nim} onChange={handleChange} placeholder="2201001" />
      </label>

      <label>
        Nama lengkap
        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama mahasiswa" />
      </label>

      <label>
        Jurusan
        <select name="jurusan" value={form.jurusan} onChange={handleChange}>
          {jurusanList.map((j) => (
            <option key={j}>{j}</option>
          ))}
        </select>
      </label>

      <div className="row">
        <label>
          IPK
          <input name="ipk" type="number" step="0.01" value={form.ipk} onChange={handleChange} />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            {statusList.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="row">
        <button type="submit" className="btn primary">
          {editingStudent ? 'Simpan perubahan' : 'Tambah data'}
        </button>
        {editingStudent && (
          <button type="button" className="btn" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

export default StudentForm
