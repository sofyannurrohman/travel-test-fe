<template>
  <div class="flex flex-col min-h-screen">
    <HomeNavbar />
    
    <!-- Konten utama -->
    <div class="flex-grow container mx-auto p-6">
      <UserTicketSearch />
      <PromoSlider />
      <TravelDestinationList />
    </div>

    <!-- Footer tetap di bawah -->
    <footer class="text-center text-gray-500 py-4 border-t w-full">
      &copy; {{ new Date().getFullYear() }} TravelKuy. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import TravelDestinationList from '@/components/DestinationList/TravelDestinationList.vue'
import HomeNavbar from '@/components/Navbar/HomeNavbar.vue'
import PromoSlider from '@/components/PromoCarousel/PromoSlider.vue'
import UserTicketSearch from '@/components/TicketSearch/UserTicketSearch.vue'
</script>
