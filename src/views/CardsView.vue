<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useCardsStore } from '@/stores/card'
import CreditCard from '@/components/Card.vue'
import addEditCard from '@/components/addEditCard.vue'

const cardsStore = useCardsStore()
let { showAddEditModal, addEditCardData, cardsData } = storeToRefs(cardsStore)

const tab = ref<string>('saved')

const showDetails = ref<boolean>(true) 
const showCardDetails = ref<boolean>(false)

const showCreditIndex = ref<number>(0)
const showDebitIndex = ref<number>(0)

const transactionData = ref<any>([
    {
        id: 1,
        name: 'Ordered Food',
        amount: -1000,
        amountLabel: '-$ 1000',
        date: '20th Feb 2022',
        message: 'Ordered food from restaurant'
    },
    {
        id: 2,
        name: 'Ticket Refund',
        amount: 50.89,
        amountLabel: '+$ 50.89',
        date: '15th Feb 2023',
        message: 'Ticket refund'
    },
    {
        id: 3,
        name: 'Interest Earned',
        amount: 67.25,
        amountLabel: '+$ 67.25',
        date: '20th Feb 2022',
        message: 'Ordered food from restaurant'
    },
    {
        id: 4,
        name: 'Electricity Bill paid',
        amount: -105.78,
        amountLabel: '-$ 105.78',
        date: '20th Feb 2022',
        message: 'Electricity bill paid'
    }
])


const creditData = computed(() => {
    if(cardsData.value && cardsData.value.length > 0) {
        return cardsData.value.filter((card: any) => card.card_type.toLowerCase() === 'credit')
    } else {
        return []
    }
})

const debitData = computed(() => {
    if(cardsData.value && cardsData.value.length > 0) {
        return cardsData.value.filter((card: any) => card.card_type.toLowerCase() === 'debit')
    } else {
        return []
    }
})


</script>

<template>
    <main class=" ">
        <div class="router-view min-h-scree pb-2 bg-white rounded-sm m-2 sm:m-6 mb-20">
            <div class="tab-bar flex items-center justify-between">
                <div class="flex items-center gap-x-2">
                    <!-- two tab bar -->
                    <button @click="tab='saved'" class="flex items-center p-3 rounded-sm font-Montserrat text-sm font-semibold tracking-tighter"
                        :class="[tab==='saved' ? 'text-[#0FA1DB] border-b border-[#6A94A5]' : 'text-[#0C3F62]']"
                    >
                         Saved Cards
                    </button>
                    <button @click="tab='gd'" class="flex items-center p-3 rounded-sm font-Montserrat text-sm font-semibold tracking-tighter "
                        :class="[tab==='gd' ? 'text-[#0FA1DB] border-b border-[#6A94A5]' : 'text-[#0C3F62]']"
                    >
                         GD Cards
                    </button>
                     
                </div>
                <button @click="showAddEditModal = true" class="flex items-center m-2 py-1 px-3 rounded-sm font-Montserrat text-sm font-semibold tracking-tighter bg-[#0FA1DB] text-white">
                    <PlusIcon class="w-3 h-3 mr-1"/> Add Card
                </button>
            </div>

            <div class="flex flex-col-reverse md:grid grid-cols-5 gap-4 m-4">
                <div class="col-span-2 space-y-4">
                    <div>
                        <div class="flex items-center justify-between p-5 bg-[#F8F8F8] rounded">
                            <div class="flex items-center font-Montserrat text-sm text-[#0FA1DB] font-[500] tracking-tighter">
                                <DashboardIcon class="w-4 h-4 mr-3"/>
                                Card Details
                            </div>

                            <div @click="showCardDetails = !showCardDetails" class="cursor-pointer p-1 rounded-full bg-[#C2E2EE] text-[#0C3F62]" :class="[showCardDetails ? 'rotate-180' : '']">
                                <DownIcon class="w-3 h-3"/>
                            </div>
                        </div>
                        <div v-if="showCardDetails" class="border border-t-0 mt-0 m-[1px] border-[#6A94A5] transition-all duration-300 " :class="showCardDetails ? 'block h-auto' : 'hidden h-0'">

                            <div v-for="(data, i) in cardsData" :key="i" class="flex items-center justify-between px-2 py-2 mx-5 border-b border-[#0FA1DB] bg-white"
                                :class="[i === transactionData.length - 1 ? 'border-b-0' : '']"
                            > 
                                <div class="flex items-center">
                                    <div class="p-2 bg-[#C2E2EE] text-[#0FA1DB] rounded-full">
                                        <ProfileIcon class="w-4 h-4"/>
                                    </div>

                                    <div class="flex flex-col items-start ml-2 mt-3">
                                        <div class="font-Montserrat text-sm text-[#0C3F62] font-[500] tracking-tighter">
                                            {{ data.name }} 
                                        </div>
                                        <div class="font-Montserrat text-xs text-[#6A94A5] font-[500] tracking-tighter">
                                            {{ data.valid_till }}
                                        </div>
                                        <div class="font-Montserrat capitalize text-xs text-[#0FA1DB] font-[500] tracking-tighter">
                                            {{ data.card_type }} Card, ended with {{ data.card_number.slice(-4) }}
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center font-Montserrat text-xs font-[500] tracking-tighter text-[#0FA1DB]">
                                    {{ data.bank_name }}
                                </div>


                            </div>

                        </div>
                    </div>


                    <div>
                        <div class="flex items-center justify-between p-5 bg-[#F8F8F8] rounded">
                            <div class="flex items-center font-Montserrat text-sm text-[#0FA1DB] font-[500] tracking-tighter">
                                <TransactionIcon class="w-4 h-4 mr-3"/>
                                Today's Transactions
                            </div>

                            <div @click="showDetails = !showDetails" class="cursor-pointer p-1 rounded-full bg-[#C2E2EE] text-[#0C3F62]" :class="[showDetails ? 'rotate-180' : '']">
                                <DownIcon class="w-3 h-3"/>
                            </div>
                        </div>
                        
                        <div v-if="showDetails" class="border border-t-0 mt-0 m-[1px] border-[#6A94A5] transition-all duration-300 " :class="showDetails ? 'block h-auto' : 'hidden h-0'">

                            <div v-for="(data, i) in transactionData" :key="i" class="flex items-center justify-between px-2 py-2 mx-5 border-b border-[#0FA1DB] bg-white"
                                :class="[i === transactionData.length - 1 ? 'border-b-0' : '']"
                            > 
                                <div class="flex items-center">
                                    <div class="p-2 bg-[#C2E2EE] text-[#0FA1DB] rounded-full">
                                        <DownloadIcon class="w-4 h-4"/>
                                    </div>

                                    <div class="flex flex-col items-start ml-2 mt-3">
                                        <div class="font-Montserrat text-sm text-[#0C3F62] font-[500] tracking-tighter">
                                            {{ data.name }}
                                        </div>
                                        <div class="font-Montserrat text-xs text-[#6A94A5] font-[500] tracking-tighter">
                                            {{ data.date }}
                                        </div>
                                        <div class="font-Montserrat text-xs text-[#0FA1DB] font-[500] tracking-tighter">
                                            {{ data.message }}
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center font-Montserrat text-xs font-[500] tracking-tighter"
                                    :class="[data.amount > 0 ? 'text-green-500' : 'text-red-500']"
                                >
                                    {{ data.amountLabel }}
                                </div>


                            </div>

                        </div>
                    </div>

                </div>


                <div class="col-span-3">
                    <div>
                        <div class="flex flex-col font-Montserrat text-xl text-[#0FA1DB] font-semibold tracking-tighter">
                            Credit Cards
                            <div class="w-[100px] border-b-2 border-[#0FA1DB]"></div>
                        </div>
                        <div>
                            <CreditCard
                                :cardData = "creditData[showCreditIndex]"
                            />
                        </div>
                        <div class="flex items-center justify-center w-full h-10 xl:w-[65%] mt-2 text-center cursor-pointer text-[2rem] tracking-widest text-[#0FA1DB] font-[500]"> 
                            <span v-for="(item, index) in creditData" @click="showCreditIndex = index" :key="index"  class="p-[1px]" :class="{'text-[3rem]' : index === showCreditIndex}"> • </span>
                        </div>
                    </div>



                    <div class="mt-4">
                        <div class="flex flex-col font-Montserrat text-xl text-[#0FA1DB] font-semibold tracking-tighter">
                            Debit Cards
                            <div class="w-[100px] border-b-2 border-[#0FA1DB]"></div>
                        </div>
                        <div>
                            <CreditCard
                                :cardData = "debitData[showDebitIndex]"
                            />
                        </div>
                        <div class="flex items-center justify-center w-full h-10 xl:w-[65%] mt-2 text-center cursor-pointer text-[2rem] tracking-widest text-[#0FA1DB] font-[500]"> 
                            <span v-for="(item, index) in creditData" @click="showDebitIndex = index" :key="index" class="p-[1px]" :class="{'text-[3rem]' : index === showCreditIndex}"> • </span>
                        </div>
                    </div>

                </div>



            </div>







        </div>

        <div class="flex items-center justify-center bg-[#6A94A5] h-[34px] text-white font-Inter text-xs" >
            © 2022 GIRIRAJ DIGITAL All Rights Reserved.
        </div>


        <addEditCard />
    </main>

</template>


<style lang="scss" scoped>
.tab-bar {
    box-shadow: 0px 1px 2px 0px #6a94a5c5;
}
</style>
