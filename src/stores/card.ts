import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { defineStore } from 'pinia'


export const useCardsStore = defineStore('Cards', () => {

  const cardsData = ref<any>([])
  const showAddEditModal = ref<boolean>(false)
  const addEditCardData = ref<any>({})

  let dummyData =  [
    {
      id: 1,
      name: 'Harry Potter Smith',
      bank_name: 'HDFC',
      card_type: 'debit',
      card_number: '1234567890123456',
      cvv: '123',
      valid_till: '2027-12-31',
      set_default: true,
      gpay: false
    },
    {
      id: 2,
      name: 'John Doe Smith',
      bank_name: 'HDFC',
      card_type: 'credit',
      card_number: '1234567890123456',
      cvv: '123',
      valid_till: '2027-12-31',
      set_default: true,
      gpay: false
    }
  ]

  const getcardsData = () => {

    try {
      localStorage.getItem('cards') ? null : localStorage.setItem('cards', '[]')

      let data = JSON.parse(localStorage.getItem('cards') || '[]') || []

      if(data.length == 0){
        cardsData.value = dummyData
      } else {
        cardsData.value = data
      }

    } catch (error) {
      console.error(error)
    }

  }

  getcardsData()


  return {

    showAddEditModal,
    addEditCardData,
    cardsData

  }
})
