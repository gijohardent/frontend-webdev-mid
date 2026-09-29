export type Page = 'ringkasan' | 'mahasiswa'

interface Props {
  page: Page
  onChange: (page: Page) => void
}

const items: { key: Page; label: string }[] = [
  { key: 'ringkasan', label: 'Ringkasan' },
  { key: 'mahasiswa', label: 'Data Mahasiswa' },
]

export default function Navbar({ page, onChange }: Props) {
  return (
    <header className="navbar">
      <h1 className="brand">Student Management System</h1>
      <nav>
        {items.map((item) => (
          <button
            key={item.key}
            className={page === item.key ? 'tab active' : 'tab'}
            onClick={() => onChange(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
