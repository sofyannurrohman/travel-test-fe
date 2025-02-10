<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getAllTravelSchedulesByUser } from '@/api/travel-schedule';
import type { TravelSchedule } from '@/model/TravelSchedule';
import type { TicketBooking } from '@/model/TicketBooking';
import { createTicketBookingByUser } from '@/api/ticket-booking';

const authStore = useAuthStore()
const router = useRouter()
const showModal = ref(false)
const travels = ref<TravelSchedule[]>([]) // Store travel options
const userId = computed(() => authStore.user?.id || 0) // Get user_id from Pinia store

const data = ref<TicketBooking>({
  user_id: userId.value,
  travel_schedule_id: 0,
  status: 'pending', // Default status
  quantity: 1
})
// Alert states
const showAlert = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

const showSuccessModal = ref(false)
const successMessage = ref('')
let bookingId = ''

const handleInputClick = () => {
  if (!authStore.isAuthenticated) {
    showModal.value = true
  }
}

const goToLogin = () => {
  showModal.value = false
  router.push('/sign-in')
}

// Fetch travel options when component mounts
onMounted(async () => {
  try {
    const response = await getAllTravelSchedulesByUser();
    console.log(response)
    travels.value = response 
  } catch (error) {
    console.error('Error fetching travel options:', error)
  }
})
const handleSubmit = async () => {
  console.log('Submitting data:', data.value)

  if (!data.value.user_id || !data.value.travel_schedule_id || !data.value.quantity) {
    alertTitle.value = 'Validation Error'
    alertMessage.value = 'Please fill in all required fields.'
    showAlert.value = true
    return
  }

  try {
    const payload: TicketBooking = {
      user_id: Number(userId.value),
      travel_schedule_id: Number(data.value.travel_schedule_id),
      status: 'pending', // Default status if empty
      quantity: Number(data.value.quantity)
    }

    const response = await createTicketBookingByUser(payload)
    console.log(response)
    bookingId = response.data.id
    // Show success message
    showAlert.value = true
    alertTitle.value = 'Ticket Booked Successfully'
    alertMessage.value = 'Your ticket has been booked.'

    // Reset form
    data.value = {
      user_id: 0,
      travel_schedule_id: 0,
      status: 'pending',
      quantity: 1
    }
    // Show success modal
    successMessage.value = 'Your ticket has been successfully booked!'
    showSuccessModal.value = true
  } catch (error: any) {
    console.error('Error:', error)

    // Handle API errors
    alertTitle.value = 'Error'
    alertMessage.value = error.response?.data?.message || 'Something went wrong!'
    showAlert.value = true
  }}
  const goToInvoice = () => {
  showSuccessModal.value = false
  router.push(`/booking/history/${userId.value}`) // Redirect to Invoice page
}
</script>


<template>
  <h1 class="text-lg font-bold">Pesan Ticket</h1>
<div class="flex mb-8">
 <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Pilih Travel</span>
        </div>
        <select v-model="data.travel_schedule_id" class="select select-bordered" @click="handleInputClick">
          <option disabled selected>Pick one</option>
          <option v-for="travel in travels" :key="travel.id" :value="travel.id">
            {{ travel.destination }} - {{ travel.departure_date }} ({{ travel.departure_time }})
          </option>
        </select>
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Jumlah kursi</span>
        </div>
        <input type="number" v-model="data.quantity" placeholder="Masukan jumlah kursi yang dipesan" class="input input-bordered w-full max-w-xs" @click="handleInputClick"/>
      </label>

      <button class="col-span-1 md:col-span-4 bg-orange-500 text-white p-3 rounded-lg">
        Pesan Sekarang
      </button>
    </div>

  </form>
</div>
  <!-- Success Modal -->
  <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-2">Success</h2>
        <p>{{ successMessage }}</p>
        <button @click="goToInvoice" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">OK</button>
      </div>
    </div>

  <!-- Login Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg text-center w-96">
      <h2 class="text-xl font-semibold">Login Required</h2>
      <p class="text-gray-600 mt-2">You must sign in first to fill this form.</p>
      <div class="mt-4 flex justify-center space-x-4">
        <button @click="goToLogin" class="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Login
        </button>
        <button @click="showModal = false" class="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
      </div>
    </div>
  </div>
</template>
