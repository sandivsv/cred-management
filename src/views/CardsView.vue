<script setup lang="ts">
import CreditCard from '@/components/Card.vue'
</script>

<template>
  <main>
    
    <div class="text-xl font-bold">
      Hello World
    </div>
    <div>
      <!-- write here something -->
      <div class="text-xl">
        Hello World
      </div>
      <div class="">
        Hello World
      </div>
      <div>
        <!-- write here something -->
        <CreditCard
            cardNumber="1234567890123456"
            cardHolder="John Doe"
            expiry="12/26"
            type="Visa"
        />
      </div>
    </div>
  </main>
</template>
