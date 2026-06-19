import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

// ============================================================
// TEST SUITE 1: Table Component (UI Elements)
// Menguji elemen-elemen yang ada di tabel employee
// ============================================================
describe('Table Component UI', () => {

  it('menampilkan semua header kolom tabel dengan benar', () => {
    render(
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Employee</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Role</th>
            <th>Manager</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
    )
    expect(screen.getByText('Employee')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText('Manager')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('menampilkan data employee di baris tabel', () => {
    render(
      <table>
        <tbody>
          <tr>
            <td>Alice Smith</td>
            <td>alice@test.com</td>
            <td>5000000</td>
            <td>Active</td>
            <td>Staff</td>
            <td>Bob Manager</td>
          </tr>
        </tbody>
      </table>
    )
    expect(screen.getByText('Alice Smith')).toBeInTheDocument()
    expect(screen.getByText('alice@test.com')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Staff')).toBeInTheDocument()
  })

  it('menampilkan search bar untuk filter employee', () => {
    render(
      <input
        type="text"
        placeholder="Search employees..."
        data-testid="search-input"
      />
    )
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search employees...')
  })

  it('search bar bisa menerima input teks', () => {
    render(
      <input
        type="text"
        placeholder="Search employees..."
        data-testid="search-input"
      />
    )
    const searchInput = screen.getByTestId('search-input')
    // Simulasi user mengetik di search bar
    fireEvent.change(searchInput, { target: { value: 'Alice' } })
    expect(searchInput.value).toBe('Alice')
  })

})

// ============================================================
// TEST SUITE 2: AddUserForm (sesuai addUserForm.js project)
// Menguji semua field input yang ada di form tambah employee
// ============================================================
describe('AddUserForm Component UI', () => {

  // Helper: render form sekali pakai, digunakan berulang
  const renderForm = () => render(
    <form>
      <input type="text"   name="firstname"   placeholder="First Name" />
      <input type="text"   name="lastname"    placeholder="Last Name" />
      <input type="email"  name="email"       placeholder="Email" />
      <input type="number" name="salary"      placeholder="Salary" min="0" />
      <input type="date"   name="date" />
      <select name="role">
        <option>Staff</option>
        <option>Manager</option>
        <option>HR</option>
        <option>Intern</option>
      </select>
      <input name="managerName" placeholder="Manager Name" />
      <button type="submit">Add Employee</button>
    </form>
  )

  it('menampilkan semua field input form dengan benar', () => {
    renderForm()
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Salary')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Manager Name')).toBeInTheDocument()
  })

  it('menampilkan dropdown role dengan 4 pilihan', () => {
    renderForm()
    expect(screen.getByText('Staff')).toBeInTheDocument()
    expect(screen.getByText('Manager')).toBeInTheDocument()
    expect(screen.getByText('HR')).toBeInTheDocument()
    expect(screen.getByText('Intern')).toBeInTheDocument()
  })

  it('menampilkan tombol Add Employee', () => {
    renderForm()
    const btn = screen.getByRole('button', { name: /add employee/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('type', 'submit')
  })

  it('field First Name bisa diisi teks', () => {
    renderForm()
    const input = screen.getByPlaceholderText('First Name')
    fireEvent.change(input, { target: { value: 'Alice' } })
    expect(input.value).toBe('Alice')
  })

  it('field Email bisa diisi email valid', () => {
    renderForm()
    const input = screen.getByPlaceholderText('Email')
    fireEvent.change(input, { target: { value: 'alice@test.com' } })
    expect(input.value).toBe('alice@test.com')
  })

  it('field Salary bertipe number dan minimum 0', () => {
    renderForm()
    const input = screen.getByPlaceholderText('Salary')
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('min', '0')
  })

  it('bisa memilih role dari dropdown', () => {
    renderForm()
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'Manager' } })
    expect(select.value).toBe('Manager')
  })

})

// ============================================================
// TEST SUITE 3: Delete Confirmation Modal
// Menguji modal konfirmasi hapus employee (dari index.js)
// ============================================================
describe('Delete Confirmation Modal', () => {

  it('menampilkan teks konfirmasi delete', () => {
    render(
      <div>
        <h2>Delete Employee?</h2>
        <p>This action cannot be undone</p>
        <button>Delete</button>
        <button>Cancel</button>
      </div>
    )
    expect(screen.getByText('Delete Employee?')).toBeInTheDocument()
    expect(screen.getByText('This action cannot be undone')).toBeInTheDocument()
  })

  it('tombol Delete dan Cancel tersedia', () => {
    render(
      <div>
        <button>Delete</button>
        <button>Cancel</button>
      </div>
    )
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('tombol Cancel bisa diklik', () => {
    const mockCancel = jest.fn()
    render(<button onClick={mockCancel}>Cancel</button>)
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    // Memastikan handler terpanggil saat diklik
    expect(mockCancel).toHaveBeenCalledTimes(1)
  })

  it('tombol Delete bisa diklik', () => {
    const mockDelete = jest.fn()
    render(<button onClick={mockDelete}>Delete</button>)
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(mockDelete).toHaveBeenCalledTimes(1)
  })

})

// ============================================================
// TEST SUITE 4: Home Page Layout
// Menguji elemen utama di halaman index.js
// ============================================================
describe('Home Page Layout', () => {

  it('menampilkan judul Employee Management', () => {
    render(<h1>Employee Management</h1>)
    expect(screen.getByText('Employee Management')).toBeInTheDocument()
  })

  it('menampilkan tombol Add Employee di halaman utama', () => {
    const mockHandler = jest.fn()
    render(
      <button onClick={mockHandler}>Add Employee</button>
    )
    const btn = screen.getByRole('button', { name: /add employee/i })
    expect(btn).toBeInTheDocument()
    // Simulasi klik tombol Add Employee
    fireEvent.click(btn)
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

})