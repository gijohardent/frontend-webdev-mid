import { statusList } from '../data'

interface ToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  filterStatus: string
  onFilterChange: (value: string) => void
}

const Toolbar = ({ search, onSearchChange, filterStatus, onFilterChange }: ToolbarProps) => (
  <div className="toolbar">
    <input
      type="search"
      placeholder="Cari nama atau NIM"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value)}>
      <option>Semua</option>
      {statusList.map((s) => (
        <option key={s}>{s}</option>
      ))}
    </select>
  </div>
)

export default Toolbar
