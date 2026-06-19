import { getUsers, getUser, addUser, updateUser, deleteUser } from '../src/lib/helper'

beforeAll(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

test('getUsers mengembalikan array berisi data user', async () => {
  const mockUsers = [
    { _id: 'id1', name: 'Alice', email: 'alice@test.com', salary: '5000000', status: 'Active' },
    { _id: 'id2', name: 'Bob', email: 'bob@test.com', salary: '6000000', status: 'Active' }
  ]

  fetch.mockResolvedValueOnce({
    json: async () => mockUsers
  })

  const result = await getUsers()

  expect(Array.isArray(result)).toBe(true)
  expect(result).toEqual(mockUsers)
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('/api/users')
})

test('getUsers mengembalikan array kosong jika fetch gagal', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  expect(await getUsers()).toEqual([])
})

test('getUser mengembalikan data satu user berdasarkan ID', async () => {
  const mockUser = {
    _id: 'id123',
    name: 'Alice',
    email: 'alice@test.com',
    salary: '5000000',
    status: 'Active'
  }

  fetch.mockResolvedValueOnce({
    json: async () => mockUser
  })

  const result = await getUser('id123')

  expect(result).toEqual(mockUser)
  expect(fetch).toHaveBeenCalledWith('/api/users/id123')
})

test('getUser mengembalikan objek kosong jika fetch gagal', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  expect(await getUser('id123')).toEqual({})
})

test('addUser berhasil mengirim data dan mengembalikan success', async () => {
  const newUser = {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@test.com',
    salary: '5000000',
    status: 'Active',
    role: 'Staff',
    managerName: 'Bob'
  }

  fetch.mockResolvedValueOnce({
    json: async () => ({ success: true })
  })

  const result = await addUser(newUser)

  expect(result.success).toBe(true)
  expect(fetch).toHaveBeenCalledWith(
    '/api/users',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
  )
})

test('addUser gagal jika data tidak lengkap', async () => {
  const incompleteUser = {
    firstName: 'Alice',
    email: '',
    salary: '5000000'
  }

  fetch.mockResolvedValueOnce({
    json: async () => ({
      success: false,
      message: 'Email is required'
    })
  })

  const result = await addUser(incompleteUser)

  expect(result.success).toBe(false)
  expect(result.message).toBe('Email is required')
})

test('updateUser berhasil mengupdate data user', async () => {
  const updatedData = {
    name: 'Alice Updated',
    salary: '7000000'
  }

  fetch.mockResolvedValueOnce({
    json: async () => ({ success: true })
  })

  const result = await updateUser('id123', updatedData)

  expect(result.success).toBe(true)
  expect(fetch).toHaveBeenCalledWith(
    '/api/users/id123',
    expect.objectContaining({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
  )
})

test('updateUser mengembalikan error jika fetch gagal', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  const result = await updateUser('id123', { name: 'Test' })

  expect(result).toBeInstanceOf(Error)
})

test('deleteUser berhasil menghapus user berdasarkan ID', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({ success: true })
  })

  const result = await deleteUser('id123')

  expect(result.success).toBe(true)
  expect(fetch).toHaveBeenCalledWith(
    '/api/users/id123',
    expect.objectContaining({
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  )
})

test('deleteUser mengembalikan error jika fetch gagal', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  const result = await deleteUser('id123')

  expect(result).toBeInstanceOf(Error)
})