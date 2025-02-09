<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref } from 'vue'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'
import 'vue-datepicker-next/index.css'
import type { TicketBooking } from '@/model/TicketBooking'
import { createTicketBooking } from '@/api/ticket-booking'

const data = ref<TicketBooking>({
  user_id: 0,
  travel_schedule_id: 0,
  status: '',
  quantity: 0
})
const showAlert = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

const handleSubmit = async () => {
  console.log(data.value)
  if (
    !data.value.user_id ||
    !data.value.travel_schedule_id ||
    !data.value.status ||
    !data.value.quantity
  ) {
    console.error('Please fill in all required fields.')
    return
  }

  try {
    const payload: TicketBooking = {
      user_id: Number(data.value.user_id),
      travel_schedule_id: Number(data.value.travel_schedule_id),
      status: data.value.status,
      quantity: Number(data.value.quantity)
    }
    const response = await createTicketBooking(payload)
    console.log(response)
    showAlert.value = true
    alertTitle.value = 'User Created Successfully'
    alertMessage.value = 'The travel schedule were successfully created and uploaded.'
    data.value = {
      user_id: 0,
      travel_schedule_id: 0,
      status: '',
      quantity: 0
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <DefaultLayout>
    <AlertSuccess v-if="showAlert" :title="alertTitle" :message="alertMessage" />
    <DefaultCard cardTitle="Ticket Booking Form">
      <form @submit.prevent="handleSubmit">
        <div class="p-6.5">
          <div class="mb-4.5 flex flex-col xl:flex-row">
            <InputGroup
              v-model="data.user_id"
              label="User ID"
              type="number"
              placeholder="Enter user id"
              customClasses="w-full"
            />
          </div>
          <InputGroup
            v-model="data.travel_schedule_id"
            label="ID Jadwal Travel"
            type="number"
            placeholder="Enter id jadwal travel"
            customClasses="mb-4.5"
          />
          <InputGroup
            v-model="data.status"
            label="Status"
            type="text"
            placeholder="Enter status"
            customClasses="mb-4.5"
          />
          <InputGroup
            v-model="data.quantity"
            label="Quantity"
            type="number"
            placeholder="Enter number"
            customClasses="mb-4.5"
          />
          <button
            type="submit"
            class="flex w-full justify-center rounded bg-primary p-3 mt-6 font-medium text-gray hover:bg-opacity-90"
          >
            Submit
          </button>
        </div>
      </form>
    </DefaultCard>
  </DefaultLayout>
</template>
