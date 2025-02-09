<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Manajemen Pengguna</h1>
  
      <!-- Tombol Tambah Pengguna -->
      <button
        class="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        @click="openUserForm"
      >
        Tambah Pengguna
      </button>
  
      <!-- Tabel Pengguna -->
      <div class="bg-white p-4 rounded-lg shadow">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2">ID</th>
              <th class="border border-gray-300 px-4 py-2">Nama</th>
              <th class="border border-gray-300 px-4 py-2">Email</th>
              <th class="border border-gray-300 px-4 py-2">Role</th>
              <th class="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.name }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <button class="bg-yellow-500 text-white px-3 py-1 rounded" @click="editUser(user)">
                  Edit
                </button>
                <button class="bg-red-500 text-white px-3 py-1 ml-2 rounded" @click="deleteUser(user.id)">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal Form Pengguna -->
      <div v-if="showUserForm" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna' }}</h2>
  
          <form @submit.prevent="submitUser">
            <div class="mb-4">
              <label class="block text-sm font-medium">Nama</label>
              <input type="text" v-model="userForm.name" class="w-full border border-gray-300 p-2 rounded" required>
            </div>
  
            <div class="mb-4">
              <label class="block text-sm font-medium">Email</label>
              <input type="email" v-model="userForm.email" class="w-full border border-gray-300 p-2 rounded" required>
            </div>
  
            <div class="mb-4">
              <label class="block text-sm font-medium">Role</label>
              <select v-model="userForm.role" class="w-full border border-gray-300 p-2 rounded">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
  
            <div class="flex justify-end">
              <button type="button" class="bg-gray-500 text-white px-3 py-2 rounded mr-2" @click="closeUserForm">
                Batal
              </button>
              <button type="submit" class="bg-blue-500 text-white px-3 py-2 rounded">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        users: [],
        showUserForm: false,
        isEditing: false,
        userForm: {
          id: null,
          name: '',
          email: '',
          role: 'user'
        }
      }
    },
    async mounted() {
      await this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:8000/api/admin/users')
          this.users = response.data
        } catch (error) {
          console.error('Gagal mengambil data pengguna', error)
        }
      },
      openUserForm(user = null) {
        this.isEditing = !!user
        this.userForm = user ? { ...user } : { id: null, name: '', email: '', role: 'user' }
        this.showUserForm = true
      },
      closeUserForm() {
        this.showUserForm = false
      },
      async submitUser() {
        try {
          if (this.isEditing) {
            await axios.put(`http://localhost:8000/api/admin/users/${this.userForm.id}`, this.userForm)
          } else {
            await axios.post('http://localhost:8000/api/admin/users', this.userForm)
          }
  
          this.fetchUsers()
          this.closeUserForm()
        } catch (error) {
          console.error('Gagal menyimpan pengguna', error)
        }
      },
      async deleteUser(userId) {
        if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return
  
        try {
          await axios.delete(`http://localhost:8000/api/admin/users/${userId}`)
          this.fetchUsers()
        } catch (error) {
          console.error('Gagal menghapus pengguna', error)
        }
      }
    }
  }
  </script>
  