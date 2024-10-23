<template>
    <div class="max-w-sm mx-auto mt-10">
      <!-- Credit Card Design -->
      <div
        class="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg p-6 transition-transform"
      >
        <h2 class="text-lg font-semibold">Bank Card</h2>
        <p class="mt-2 mb-6 text-sm uppercase">Card Holder</p>
  
        <div class="flex text-2xl tracking-widest">
          <!-- <transition name="fade"> -->
            <span v-if="showCardNumber">{{ formattedCardNumber }}</span>
            <span v-else>•••• **** **** {{ last4Digits }}</span>
          <!-- </transition> -->
        </div>
  
        <div class="mt-4 flex justify-between">
          <span>{{ cardExpiry }}</span>
          <span>{{ cardType }}</span>
        </div>
  
        <!-- Toggle Button -->
        <button
          @click="toggleCardNumber"
          class="absolute top-4 right-4 bg-white text-indigo-600 rounded px-4 py-2 text-sm font-semibold"
        >
          {{ showCardNumber ? 'Hide' : 'Show' }}
        </button>
      </div>
    </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'CreditCard',
    props: {
      cardNumber: {
        type: String,
        required: true,
      },
      cardHolder: {
        type: String,
        required: true,
      },
      expiry: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const showCardNumber = ref(false);
  
      // Toggles the visibility of the card number
      const toggleCardNumber = () => {
        showCardNumber.value = !showCardNumber.value;
      };
  
      // Format the card number as '1234 5678 9012 3456'
      const formattedCardNumber = computed(() =>
        props.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
      );
  
      // Extract the last 4 digits for masked view
      const last4Digits = computed(() => props.cardNumber.slice(-4));
  
      return {
        showCardNumber,
        toggleCardNumber,
        formattedCardNumber,
        last4Digits,
        cardExpiry: props.expiry,
        cardType: props.type,
      };
    },
  });
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
  