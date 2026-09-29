interface NavbarProps {
  page: string
  onChangePage: (page: string) => void
}

const menus = [
  { key: 'ringkasan', label: 'Ringkasan' },
  { key: 'mahasiswa', label: 'Data Mahasiswa' },
]

const Navbar = ({ page, onChangePage }: NavbarProps) => (
  <header className="navbar">
    <h1 className="brand">Student Management System</h1>
    <nav>
      {menus.map((menu) => (
        <button
          key={menu.key}
          className={page === menu.key ? 'tab active' : 'tab'}
          onClick={() => onChangePage(menu.key)}
        >
          {menu.label}
        </button>
      ))}
    </nav>
  </header>
)

export default Navbar
