<template>
  <div class="mt-6 container mx-auto">
    <h2 class="text-xl font-bold mb-4">Tujuan Populer</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(destination, index) in destinations" :key="index" class="relative">
        <img :src="destination.image" class="w-full h-40 object-cover rounded-lg shadow-md" />
        <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-start justify-end p-4 text-white">
          <h3 class="font-bold text-lg">{{ destination.name }}</h3>
          <p class="text-sm">Keberangkatan dari {{ destination.from }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gambirImg from '@/assets/images/gambir.jpg';
import surabayaImg from '@/assets/images/surakarta.jpg';
import bandungImg from '@/assets/images/bandung.jpg';

const destinations = [
  { name: "Gambir, Jakarta", from: "Surabaya, Tegal, Malang", image: gambirImg },
  { name: "Surabaya Gubeng", from: "Jakarta, Bandung", image: surabayaImg },
  { name: "Lempuyangan, Yogyakarta", from: "Jakarta, Jember", image: bandungImg }
];
</script>
