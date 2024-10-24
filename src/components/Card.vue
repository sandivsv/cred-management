<template>
  <div class="flex flex-col xl:flex-row items-center gap-4">
    <div class="sm:min-w-[340px] xl:min-w-[380px] max-w-sm mx-auto mt-10">
      <button
        @click="toggleCardNumber"
        class="w-full flex justify-end bg-white text-indigo-600 rounded px-4 py-2 text-sm font-semibold"
      >
        <span v-if="showCardNumber" class="flex items-center px-2 rounded bg-[#0FA1DB30]">
          <EyeIcon class="w-4 h-4 mr-1"/>
          Hide Card Number
        </span> 
        <span v-else class="flex items-center px-2 rounded bg-[#0FA1DB30]">
          <EyeIcon class="w-4 h-4 mr-1"/>
          Show Card Number 
        </span>
      </button>
      <!-- Credit Card Design -->
      <div class="relative bg-gradient-to-r  text-white rounded-lg shadow-lg p-6 transition-transform"
        :class="[
          isClicked 
          ? clickedData !== 'gpay' && clickedData !== 'set' ? 'bg-[#6A94A5]' : clickedData == 'set' ? 'from-[#4086F4] to-indigo-500' : 'from-[#0C3F62] to-indigo-500'
          : 'from-[#0C3F62] to-indigo-500',
          
        ]"
      >
        <!-- <h2 class="text-lg font-semibold">Bank Card</h2> -->
        <p class="mt-6 mb-2 text-xl font-[500] capitalize font-Montserrat">{{ data.name }}</p>
  
        <div class="flex text-2xl tracking-widest">
          <!-- <transition name="fade"> -->
            <span v-if="showCardNumber">{{ formattedCardNumber }}</span>
            <span v-else>•••• •••• •••• {{ last4Digits }}</span>
          <!-- </transition> -->
        </div>
  
        <div class="mt-4 flex justify-between items-center">
          <span>Valid Till: {{ formatedDate }}</span>
          <span class="flex items-center">CVV: &nbsp;
            <span v-if="showCardNumber"> {{ data.cvv }} </span>
            <span v-else class="text-2xl"> ••• </span>
          </span>

          <img class="h-12" src="/images/masterCard.png" alt="card type">
        </div>
  
        <img class="absolute top-4 right-4" src="/images/hdfc.png" alt="bank card">

        <div v-if="isClicked" class="absolute top-4 left-4">
          <LockIcon v-if="clickedData == 'lock'" class="w-5 h-5 text-white" />
          <ArchieveIcon v-else-if="clickedData == 'archive'" class="w-5 h-5 text-white" />
          <RightIcon v-else-if="clickedData == 'set'" class="w-5 h-5 text-white" />
          <img v-else-if="clickedData == 'gpay'" src="/images/gpay2.png" alt="gpay">
        </div>
      </div>
    </div>

    <div class="w-[220px] p-4 mt-4 xl:mt-[70px] bg-[#C2E2EE] rounded-lg">
      <div class="grid grid-cols-2 gap-4 my-[6px]">
        <!-- Lock Card -->
        <div class="flex flex-col items-center space-y-1">
          <div @click="handleClicked('lock')" class="cursor-pointer p-2 bg-[#0FA1DB] rounded-full">
            <LockIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-sm text-[#0FA1DB] font-medium">Lock Card</span>
        </div>

        <!-- Archive -->
        <div class="flex flex-col items-center space-y-1">
          <div @click="handleClicked('archive')"  class="cursor-pointer p-2 bg-[#0FA1DB] rounded-full">
            <ArchieveIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-sm text-[#0FA1DB] font-medium">Archive</span>
        </div>

        <!-- Set As Default -->
        <div class="flex flex-col items-center space-y-1">
          <div @click="handleClicked('set')"  class="cursor-pointer p-2 bg-[#0FA1DB] rounded-full">
            <RightIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-sm text-center text-[#0FA1DB] font-medium">Set As Default</span>
        </div>

        <!-- Add to GPay -->
        <div class="flex flex-col items-center space-y-1">
          <div @click="handleClicked('gpay')"  class=" cursor-pointer bg-[#0FA1DB] rounded-full">
            <img class="w-9 h-9" src="/images/gpay.png" alt="gpay">
          </div>
          <span class="text-sm text-center w-16 text-[#0FA1DB] font-medium">Add to GPay</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref, computed, watchEffect } from 'vue';
  import { useToastStore } from '@/stores/toast'

  const toastStore = useToastStore()
  const { showToast } = toastStore

  const props = defineProps({
    cardData : {
      type: Object,
      required: true
    }
  })

  interface Card {
    id?: number
    name?: string
    bank_name?: string
    card_type?: string
    card_number?: string
    cvv?: string
    valid_till?: string
    set_default?: boolean
    gpay?: boolean
  }

  const data = computed(() => {
    return props.cardData || {} as Card
  })

  const showCardNumber = ref<boolean>(false);
  const isClicked = ref<boolean>(false);

  const clickedData = ref<any>('');

  watchEffect (() => {
    if(data.value && data.value.id) {
      isClicked.value = false
      showCardNumber.value = false
    }
  })
  
  const toggleCardNumber = () => {
    showCardNumber.value = !showCardNumber.value;
    if(!showCardNumber.value) showToast('Card number has been hidden', 'success')
    else showToast('Card number has been shown', 'success')
  };
  
  const formattedCardNumber = computed(() =>
    data.value.card_number.replace(/(\d{4})(?=\d)/g, '$1 ')
  );

  const formatedDate = computed(() => {
    const date = new Date(data.value.valid_till);
    return `${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`;
  });
  
  const last4Digits = computed(() => data.value.card_number.slice(-4));
  

  const handleClicked = (data: any) => {
    clickedData.value = data;
    isClicked.value = true;

    if(data == 'archive') showToast('Card has been archived', 'success')
    else if(data == 'lock') showToast('Card has been locked', 'success')
    else if(data == 'set') showToast('Card has been set as default', 'success')
    else if(data == 'gpay') showToast('Card has been added to GPay', 'success')

  }
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
  