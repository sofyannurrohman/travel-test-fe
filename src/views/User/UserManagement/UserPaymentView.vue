<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import type { TravelSchedule } from '@/model/TravelSchedule'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'
import { getAllTravelSchedules, removeTravelSchedule } from '@/api/travel-schedule'

const pageTitle = ref('Travel Schedule Tables')
const error = ref<string | null>(null);
const showAlert = ref(false);
const alertMessage = ref('');
const travelScheduleData = ref<TravelSchedule[]>([]);

onMounted(async () => {
 refreshTravelScheduleData() 
});

const refreshTravelScheduleData = async () => {
  try {
    const response = await getAllTravelSchedules();
    travelScheduleData.value = response;
    console.log(travelScheduleData);
  } catch (err) {
    error.value = 'An error occurred while fetching data';
    console.error(err);
  }
}
const TravelScheduleColumns = ref([
  { label: 'ID', field: 'id' },
  { label: 'Tujuan', field: 'destination' },
  { label: 'Tanggal Keberangkatan', field: 'departure_date' },
  { label: 'Waktu Keberangkatan', field: 'departure_time' },
  { label: 'Quota', field: 'quota' },
  { label: 'Price', field: 'ticket_price' },
]);

const createRoute = () => `/travel-schedules/create`;
const editRoute = (id: string) => `/travel-schedules/edit/${id}`;
const viewRoute = (id: string) => `/travel-schedules/view/${id}`;
const deleteRoute = (id: string) => `/travel-schedules/${id}`;

const handleDeleteTravelSchedule = async (id: string) => {
  try {
    const response = await removeTravelSchedule(id);
    console.log(response.data.message);
    travelScheduleData.value = travelScheduleData.value.filter(TravelSchedule => TravelSchedule.id !== id);
    alertMessage.value = response.data.message;
    showAlert.value = true;
    setTimeout(async () => {
      showAlert.value = false;
      await refreshTravelScheduleData()
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
      <TableThree :columns="TravelScheduleColumns" :tableData="travelScheduleData" :createRoute="createRoute"  :editRoute="editRoute" :viewRoute="viewRoute"
        :deleteRoute="deleteRoute" @delete="handleDeleteTravelSchedule" />
    </div>
  </DefaultLayout>
</template>