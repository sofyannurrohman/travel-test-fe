<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Manajemen Tiket</h1>
  
      <!-- Tabel Tiket -->
      <div class="bg-white p-4 rounded-lg shadow">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2">ID</th>
              <th class="border border-gray-300 px-4 py-2">Nama Penumpang</th>
              <th class="border border-gray-300 px-4 py-2">Kode Tiket</th>
              <th class="border border-gray-300 px-4 py-2">Status</th>
              <th class="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in tickets" :key="ticket.id">
              <td class="border border-gray-300 px-4 py-2">{{ ticket.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ ticket.passenger_name }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ ticket.code }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <span :class="getStatusClass(ticket.status)">
                  {{ ticket.status }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <button class="bg-blue-500 text-white px-3 py-1 rounded" @click="viewTicket(ticket.id)">
                  Lihat
                </button>
                <button v-if="ticket.status === 'pending'" class="bg-green-500 text-white px-3 py-1 ml-2 rounded" @click="confirmTicket(ticket.id)">
                  Konfirmasi
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        tickets: []
      }
    },
    async mounted() {
      await this.fetchTickets()
    },
    methods: {
      async fetchTickets() {
        try {
          const response = await axios.get('http://localhost:8000/api/admin/tickets')
          this.tickets = response.data
        } catch (error) {
          console.error('Gagal mengambil data tiket', error)
        }
      },
      getStatusClass(status) {
        return {
          'text-green-500': status === 'confirmed',
          'text-red-500': status === 'pending'
        }
      },
      async confirmTicket(ticketId) {
        if (!confirm('Apakah Anda yakin ingin mengonfirmasi tiket ini?')) return
  
        try {
          await axios.post(`http://localhost:8000/api/admin/tickets/${ticketId}/confirm`)
          this.fetchTickets()
          alert('Tiket berhasil dikonfirmasi!')
        } catch (error) {
          console.error('Gagal mengonfirmasi tiket', error)
          alert('Terjadi kesalahan, coba lagi.')
        }
      },
      viewTicket(ticketId) {
        alert(`Menampilkan detail tiket dengan ID: ${ticketId}`)
      }
    }
  }
  </script>
  
  <style scoped>
  .bg-white {
    background-color: white;
  }
  </style>
  