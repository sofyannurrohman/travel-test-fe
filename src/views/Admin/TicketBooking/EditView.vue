<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'
import type { TicketBooking } from '@/model/TicketBooking'
import { getTicketBookingByID, updateTicketBooking } from '@/api/ticket-booking'

const route = useRoute()
const ticketBookingId = route.params.id

const data = ref<TicketBooking>({
  user_id: 0,
  travel_schedule_id: 0,
  status: '',
  quantity: 0
})
const showAlert = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

onMounted(async () => {
  try {
    const response = await getTicketBookingByID(String(ticketBookingId))
    console.log(response)
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})

const handleSubmit = async () => {
  if (!data.value.user_id || !data.value.travel_schedule_id || !data.value.status) {
    console.error('Please fill in all required fields.')
    return
  }

  try {
    showAlert.value = true
    alertTitle.value = 'User updated Successfully'
    alertMessage.value = 'The user and avatar were successfully uploaded.'
    await updateTicketBooking(String(ticketBookingId), data.value)
  } catch (error) {
    console.error('Error updating user:', error)
  }
}
</script>

<template>
  <DefaultLayout>
    <AlertSuccess v-if="showAlert" :title="alertTitle" :message="alertMessage" />

    <DefaultCard cardTitle="Update User">
      <form @submit.prevent="handleSubmit">
        <div class="p-6.5">
          <div class="mb-4.5 flex flex-col xl:flex-row">
            <InputGroup
              v-model="data.user_id"
              label="User ID"
              type="text"
              placeholder="Enter user id"
              customClasses="w-full"
            />
          </div>

          <InputGroup
            v-model="data.travel_schedule_id"
            label="Phone"
            type="text"
            placeholder="Enter phone number"
            customClasses="mb-4.5"
            required
          />
          <InputGroup
            v-model="data.status"
            label="status"
            type="status"
            placeholder="Enter status address"
            customClasses="mb-4.5"
            required
          />
          <InputGroup
            v-model="data.quantity"
            label="quantity"
            type="quantity"
            placeholder="Leave empty to keep current quantity"
            customClasses="mb-4.5"
          />

          <button
            type="submit"
            class="flex w-full justify-center rounded bg-primary p-3 mt-6 font-medium text-gray hover:bg-opacity-90"
          >
            Update
          </button>
        </div>
      </form>
    </DefaultCard>
  </DefaultLayout>
</template>
