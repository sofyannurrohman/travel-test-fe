<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref } from 'vue'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'
import { createTravelSchedule } from '@/api/travel-schedule'
import type { TravelSchedule } from '@/model/TravelSchedule'
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css"; // Import styles

const travelScheduleData = ref<TravelSchedule>({
  destination: '',
  departure_date: '',
  departure_time: '',
  quota: 0,
  ticket_price: 0
})
const showAlert = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

const handleSubmit = async () => {
  if (
    !travelScheduleData.value.destination ||
    !travelScheduleData.value.departure_date ||
    !travelScheduleData.value.departure_time ||
    !travelScheduleData.value.quota ||
    !travelScheduleData.value.ticket_price
  ) {
    console.error('Please fill in all required fields.')
    return
  }

  try {
    const response = await createTravelSchedule(travelScheduleData.value) // Assuming the response contains the created user's ID
    showAlert.value = true
    alertTitle.value = 'User Created Successfully'
    alertMessage.value = 'The travel schedule were successfully created and uploaded.'
    travelScheduleData.value = {
      destination: '',
      departure_date: '',
      departure_time: '',
      quota: 0,
      ticket_price: 0
    }
  } catch (error) {
    console.error('Error creating user or uploading avatar:', error)
  }
}
</script>

<template>
  <DefaultLayout>
    <!-- Alert component -->
    <AlertSuccess v-if="showAlert" :title="alertTitle" :message="alertMessage" />
    <DefaultCard cardTitle="User Form">
      <form @submit.prevent="handleSubmit">
        <div class="p-6.5">
          <div class="mb-4.5 flex flex-col xl:flex-row">
            <!-- Bind data using v-model -->
            <InputGroup
              v-model="travelScheduleData.destination"
              label="Name"
              type="text"
              placeholder="Enter your user name"
              customClasses="w-full"
            />
          </div>

          <DatePicker
            v-model="travelScheduleData.departure_date"
            type="date"
            placeholder="Pilih Tanggal Keberangkatan"
            class="mb-4.5"
          />

          <DatePicker
            v-model="travelScheduleData.departure_time"
            type="time"
            placeholder="Pilih Waktu Keberangkatan"
            class="mb-4.5"
          />

          <InputGroup
            v-model="travelScheduleData.quota"
            label="Password"
            type="password"
            placeholder="Enter your password"
            customClasses="mb-4.5"
          />

          <InputGroup
            v-model="travelScheduleData.ticket_price"
            label="Password"
            type="password"
            placeholder="Enter your password"
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
