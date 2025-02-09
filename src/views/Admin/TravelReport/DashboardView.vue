<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import type { TravelSchedule } from '@/model/TravelSchedule'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'
import { getTravelReports, removeTravelSchedule } from '@/api/travel-schedule'

const pageTitle = ref('Travel Report Tables')
const error = ref<string | null>(null);
const showAlert = ref(false);
const alertMessage = ref('');
const travelScheduleData = ref([]);

onMounted(async () => {
  refreshTravelScheduleData();
});

const refreshTravelScheduleData = async () => {
  try {
    const response = await getTravelReports();
    console.log(response);
    travelScheduleData.value = response.map(item => ({
      id: item.id,
      destination: item.destination,
      departure_date: item.departure_date,
      departure_time: item.departure_time,
      quota: item.quota,
      ticket_price: item.ticket_price,
      total_passenger: item.ticket_bookings_count 
    }));
  } catch (err) {
    error.value = 'An error occurred while fetching data';
    console.error(err);
  }
}

const TravelScheduleColumns = ref([
  { label: 'No', field: 'id' },
  { label: 'Destinasi', field: 'destination' },
  { label: 'Tanggal Keberangkatan', field: 'departure_date' },
  { label: 'Jam Keberangkatan', field: 'departure_time' },
  { label: 'Quota', field: 'quota' },
  { label: 'Harga Tiket', field: 'ticket_price' },
  { label: 'Total Penumpang', field: 'total_passenger' },
]);

const createRoute = () => `/travel-schedules/create`;
const editRoute = (id: string) => `/travel-schedules/edit/${id}`;
const viewRoute = (id: string) => `/travel-schedules/view/${id}`;
const deleteRoute = (id: string) => `/travel-schedules/${id}`;

const handleDeleteTravelSchedule = async (id: string) => {
  try {
    const response = await removeTravelSchedule(id);
    console.log(response);
   alertMessage.value = response.data.message;
    showAlert.value = true;
    setTimeout(async () => {
      showAlert.value = false;
      await refreshTravelScheduleData();
    }, 3000); 
  } catch (err) {
    console.error('Error deleting TravelSchedule:', err);
  }
};
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <AlertSuccess v-if="showAlert" :message="alertMessage" />
    <div class="flex flex-col gap-10">
      <TableThree 
        :columns="TravelScheduleColumns" 
        :tableData="travelScheduleData" 
        :createRoute="createRoute"  
        :editRoute="editRoute" 
        :viewRoute="viewRoute"
        :deleteRoute="deleteRoute" 
        @delete="handleDeleteTravelSchedule" 
      />
    </div>
  </DefaultLayout>
</template>
