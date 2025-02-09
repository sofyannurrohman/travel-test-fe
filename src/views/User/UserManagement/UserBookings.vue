<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'
import type { TicketBooking } from '@/model/TicketBooking'
import { getAllTicketBookingByUser } from '@/api/ticket-booking'

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const pageTitle = ref('Booking History')
const error = ref<string | null>(null)
const showAlert = ref(false)
const alertMessage = ref('')
const data = ref<any>([])
const bank = 'VA BRI: 123123123123'
const userId = computed(() => authStore.user?.id || 0) // Get user_id from Pinia store

onMounted(async () => {
  refreshTicketBookingData()
})

const refreshTicketBookingData = async () => {
  try {
    console.log('Fetching ticket bookings for user:', userId.value)
    const response = await getAllTicketBookingByUser(String(userId.value))
    console.log('Response data:', response)

    // Ensure correct structure
    data.value = response.map((booking: any) => ({
      id: booking.id,
      destination: booking.travel_schedule.destination,
      departure_date: booking.travel_schedule.departure_date,
      quantity: booking.quantity,
      bank: bank,
      status: booking.payment?.status || 'unknown' // Use payment status
    }))
  } catch (err) {
    error.value = 'An error occurred while fetching data'
    console.error(err)
  }
}

const TicketBookingColumns = ref([
  { label: 'ID', field: 'id' },
  { label: 'Destinasi', field: 'destination' },
  { label: 'Tanggal Keberangkatan', field: 'departure_date' },
  { label: 'Quantity', field: 'quantity' },
  { label: 'Bank Pembayaran', field: 'bank' },
  { label: 'Status', field: 'status' }
])

const createRoute = () => `/`
const editRoute = (id: string) => `/travel-schedules/edit/${id}`
const viewRoute = (id: string) => `/travel-schedules/view/${id}`
const deleteRoute = (id: string) => `/travel-schedules/${id}`
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <AlertSuccess v-if="showAlert" :message="alertMessage" />
    <div class="flex flex-col gap-10">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- Head -->
          <thead>
            <tr>
              <th>#</th>
              <th v-for="col in TicketBookingColumns" :key="col.field">
                {{ col.label }}
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <!-- Body -->
          <tbody>
            <tr v-for="(booking, index) in data" :key="booking.id">
              <th>{{ index + 1 }}</th>
              <td v-for="col in TicketBookingColumns" :key="col.field">
                {{ booking[col.field] }}
              </td>
              <td>
                <router-link :to="`/upload-payment/${booking.id}`" class="btn btn-primary btn-sm">
                  Upload Bukti Pembayaran
                </router-link>
                <router-link :to="`/invoice/${booking.id}`" class="btn btn-secondary btn-sm ml-2">
                  Cetak Invoice
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DefaultLayout>
</template>
