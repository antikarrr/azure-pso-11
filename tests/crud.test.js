import { getUsers, addUser, updateUser, deleteUser } from '../src/lib/helper'

test('getUsers mengembalikan data', async () => {
  const result = await getUsers()
  expect(result).toBeDefined()
})

test('addUser berhasil', async () => {
  const mockData = {
    name: "Test User",
    email: "test@test.com",
    salary: "5000000",
    status: "Active"
  }
  const result = await addUser(mockData)
  expect(result).toBeDefined()
})

test('updateUser berhasil', async () => {
  const result = await updateUser('id123', { name: "Updated" })
  expect(result).toBeDefined()
})

test('deleteUser berhasil', async () => {
  const result = await deleteUser('id123')
  expect(result).toBeDefined()
})