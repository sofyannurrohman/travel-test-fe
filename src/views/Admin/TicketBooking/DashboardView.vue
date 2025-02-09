<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'
import { getAllTicketBooking, removeTicketBooking } from '@/api/ticket-booking'
const pageTitle = ref('Ticket Booking Tables')
const error = ref<string | null>(null);
const showAlert = ref(false);
const alertMessage = ref('');

const data = ref([]);

onMounted(async () => {
 refreshData() 
});

const refreshData = async () => {
  try {
    const response = await getAllTicketBooking();
    data.value = response.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      'user.name': item.user?.name || 'N/A', // Safely accessing nested object
      'travel_schedule.destination': item.travel_schedule?.destination, // If this is a destination, replace it properly
      'travel_schedule.departure_date': item.travel_schedule?.departure_date || 'N/A',
      'travel_schedule.departure_time': item.travel_schedule?.departure_time || 'N/A',
      
    }));
  } catch (err) {
    error.value = 'An error occurred while fetching data';
    console.error(err);
  }
};
const TicketBookingColumns = ref([
  { label: 'ID', field: 'id' },
  { label: 'Nama Penumpang', field: 'user.name' },
  { label: 'Destinasi', field: 'travel_schedule.destination' },
  { label: 'Tanggal Keberangkatan', field: 'travel_schedule.departure_date' },
  { label: 'Waktu Keberangkatan', field: 'travel_schedule.departure_time' },
  { label: 'Quantity', field: 'quantity' },

]);

const createRoute = () => `/admin/ticket-bookings/create`;
const editRoute = (id: string) => `/admin/ticket-bookings/edit/${id}`;
const viewRoute = (id: string) => `/admin/ticket-bookings/view/${id}`;
const deleteRoute = (id: string) => `/admin/ticket-bookings/${id}`;

const handleDeleteTicketBooking = async (id: string) => {
  try {
    const response = await removeTicketBooking(id);
    console.log(response.data.message);
    alertMessage.value = response.data.message;
    showAlert.value = true;
    setTimeout(async () => {
      showAlert.value = false;
      await refreshData()
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
      <TableThree :columns="TicketBookingColumns" :tableData="data" :createRoute="createRoute"  :editRoute="editRoute" :viewRoute="viewRoute"
        :deleteRoute="deleteRoute" @delete="handleDeleteTicketBooking" />
    </div>
  </DefaultLayout>
</template>