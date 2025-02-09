<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import axios from 'axios'
import { ref } from 'vue'

// State untuk form
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const register = async () => {
  try {
    errorMessage.value = ''
    successMessage.value = ''

    // Validasi frontend sebelum request ke backend
    if (password.value.length < 6) {
      errorMessage.value = 'Password harus memiliki minimal 6 karakter.'
      return
    }

    if (password.value !== password_confirmation.value) {
      errorMessage.value = 'Password dan konfirmasi password tidak cocok.'
      return
    }

    const response = await axios.post('http://localhost:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: "passenger",
    })
    console.log(response);
    successMessage.value = 'Registrasi berhasil! Silakan login.'
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan.'
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <DefaultAuthCard subtitle="Mulai Sekarang" title="Daftar ke TravelKuy">
      <form @submit.prevent="register">
        <InputGroup label="Name" type="text" v-model="name" placeholder="Enter your full name" />
        <InputGroup label="Email" type="email" v-model="email" placeholder="Enter your email" />
        <InputGroup
          label="Password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
        />
        <InputGroup
          label="Confirm Password"
          type="password"
          v-model="password_confirmation"
          placeholder="Confirm your password"
        />

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>

        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded mt-4">Daftar</button>
      </form>
    </DefaultAuthCard>
  </div>
</template>
