<template>
  <DefaultLayout>
    <div class="p-6">
      <h1 class="text-xl font-semibold mb-4">Upload Bukti Pembayaran</h1>
      <div class="border p-4 rounded bg-gray-100">
        <p><strong>ID Invoice:</strong> {{ invoiceId }}</p>
        <form @submit.prevent="uploadPayment">
          <label class="block mb-2">Unggah Bukti Pembayaran:</label>
          <input type="file" @change="onFileChange" accept="image/*" class="mb-4" />
          
          <div v-if="previewUrl" class="mb-4">
            <img :src="previewUrl" alt="Preview" class="max-w-xs rounded shadow" />
          </div>
          
          <button type="submit" :disabled="!selectedFile" class="bg-blue-500 text-white p-2 rounded w-full">
            Kirim
          </button>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import axios from "axios";

export default {
  components: { DefaultLayout },
  data() {
    return {
      invoiceId: this.$route.params.id, // Ensure this is correctly passed in the route
      selectedFile: null,
      previewUrl: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewUrl = URL.createObjectURL(file);
      }
    },
    async uploadPayment() {
      if (!this.selectedFile) {
        alert("Silakan pilih file sebelum mengunggah.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("payment_proof", this.selectedFile);

        // ✅ Ensure correct API call with `invoiceId`
        await axios.post(`/api/payments/${this.invoiceId}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Bukti pembayaran berhasil diunggah!");
        this.$router.push(`/invoice/${this.invoiceId}`);
      } catch (error) {
        console.error(error);
        alert("Gagal mengunggah bukti pembayaran. Silakan coba lagi.");
      }
    },
  },
};
</script>
