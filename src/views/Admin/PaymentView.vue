<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Manajemen Pembayaran</h1>
  
      <!-- Tabel Pembayaran -->
      <div class="bg-white p-4 rounded-lg shadow">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2">ID</th>
              <th class="border border-gray-300 px-4 py-2">Nama Penumpang</th>
              <th class="border border-gray-300 px-4 py-2">Total Harga</th>
              <th class="border border-gray-300 px-4 py-2">Status Pembayaran</th>
              <th class="border border-gray-300 px-4 py-2">Metode Pembayaran</th>
              <th class="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" :key="payment.id">
              <td class="border border-gray-300 px-4 py-2">{{ payment.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ payment.passenger_name }}</td>
              <td class="border border-gray-300 px-4 py-2">Rp {{ payment.total_amount }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <span :class="getStatusClass(payment.status)">
                  {{ payment.status }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-2">{{ payment.payment_method }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <button v-if="payment.status === 'pending'" class="bg-green-500 text-white px-3 py-1 rounded" @click="confirmPayment(payment.id)">
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
        payments: []
      }
    },
    async mounted() {
      await this.fetchPayments()
    },
    methods: {
      async fetchPayments() {
        try {
          const response = await axios.get('http://localhost:8000/api/admin/payments')
          this.payments = response.data
        } catch (error) {
          console.error('Gagal mengambil data pembayaran', error)
        }
      },
      getStatusClass(status) {
        return {
          'text-green-500': status === 'paid',
          'text-red-500': status === 'pending'
        }
      },
      async confirmPayment(paymentId) {
        if (!confirm('Apakah Anda yakin ingin mengonfirmasi pembayaran ini?')) return
  
        try {
          await axios.post(`http://localhost:8000/api/admin/payments/${paymentId}/confirm`)
          this.fetchPayments()
          alert('Pembayaran berhasil dikonfirmasi!')
        } catch (error) {
          console.error('Gagal mengonfirmasi pembayaran', error)
          alert('Terjadi kesalahan, coba lagi.')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .bg-white {
    background-color: white;
  }
  </style>
  