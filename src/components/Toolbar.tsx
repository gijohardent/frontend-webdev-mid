import type { Status } from '../types'
import { STATUS_LIST } from '../types'

interface Props {
  search: string
  onSearch: (value: string) => void
  status: Status | 'Semua'
  onStatus: (value: Status | 'Semua') => void
}

export default function Toolbar({ search, onSearch, status, onStatus }: Props) {
  return (
    <div className="toolbar">
      <input
        type="search"
        placeholder="Cari nama atau NIM"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select value={status} onChange={(e) => onStatus(e.target.value as Status | 'Semua')}>
        <option>Semua</option>
        {STATUS_LIST.map((s) => <option key={s}>{s}</option>)}
      </select>
    </div>
  )
}
