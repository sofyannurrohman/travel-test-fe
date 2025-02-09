<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Import auth store

const authStore = useAuthStore(); // Access Pinia store
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/login',
      {
        email: String(email.value),
        password: String(password.value),
      },
    )
    console.log(response.data)

    const { token, user } = response.data

    authStore.login(token, user) // Use Pinia store instead of localStorage

    if (user.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/')
    }
  } catch (error) {
    errorMessage.value = 'Invalid email or password.'
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <DefaultAuthCard subtitle="Mulai sekarang" title="Login TravelKuy">
      <form @submit.prevent="login">
        <InputGroup
          label="Email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
        >
        </InputGroup>
        <InputGroup
          label="Password"
          v-model="password"
          type="password"
          placeholder="6+ Characters, 1 Capital letter"
        >
        </InputGroup>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

        <div class="mb-5 mt-6">
          <input
            type="submit"
            value="Sign In"
            class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </DefaultAuthCard>
  </div>
</template>
