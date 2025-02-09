<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manajemen Pemesanan</h1>

    <!-- Tabel Pemesanan -->
    <div class="bg-white p-4 rounded-lg shadow">
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Nama Penumpang</th>
            <th class="border border-gray-300 px-4 py-2">Tujuan</th>
            <th class="border border-gray-300 px-4 py-2">Tanggal Keberangkatan</th>
            <th class="border border-gray-300 px-4 py-2">Status Pembayaran</th>
            <th class="border border-gray-300 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id">
            <td class="border border-gray-300 px-4 py-2">{{ booking.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ booking.passenger_name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ booking.destination }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ booking.departure_date }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <span :class="getStatusClass(booking.payment_status)">
                {{ booking.payment_status }}
              </span>
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                @click="viewBooking(booking.id)"
              >
                Detail
              </button>
              <button
                v-if="booking.payment_status === 'pending'"
                class="bg-green-500 text-white px-3 py-1 rounded"
                @click="confirmPayment(booking.id)"
              >
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
      bookings: []
    }
  },
  async mounted() {
    await this.fetchBookings()
  },
  methods: {
    async fetchBookings() {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/bookings')
        this.bookings = response.data
      } catch (error) {
        console.error('Gagal mengambil data pemesanan', error)
      }
    },
    getStatusClass(status) {
      return {
        'text-green-500': status === 'paid',
        'text-red-500': status === 'pending'
      }
    },
    async confirmPayment(bookingId) {
      if (!confirm('Apakah Anda yakin ingin mengonfirmasi pembayaran ini?')) return

      try {
        await axios.post(`http://localhost:8000/api/admin/bookings/${bookingId}/confirm`)
        this.fetchBookings()
        alert('Pembayaran berhasil dikonfirmasi!')
      } catch (error) {
        console.error('Gagal mengonfirmasi pembayaran', error)
        alert('Terjadi kesalahan, coba lagi.')
      }
    },
    viewBooking(bookingId) {
      this.$router.push(`/admin/bookings/${bookingId}`)
    }
  }
}
</script>

<style scoped>
.bg-white {
  background-color: white;
}
</style>
