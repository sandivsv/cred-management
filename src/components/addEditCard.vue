<script setup lang="ts">
import { ref, computed, watch, reactive, toRefs, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { email, required, minLength, maxLength, decimal, integer, url } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useCardsStore } from '@/stores/card'
import { useToastStore } from '@/stores/toast'



const toastStore = useToastStore()
const { showToast } = toastStore

const cardsStore = useCardsStore()
let { showAddEditModal, addEditCardData, cardsData } = storeToRefs(cardsStore)

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

const card = computed<Card>(() => {
  return addEditCardData.value || {}
})

function submitForm() {
  validate.value.$touch()
}

function closeModel() {
  showAddEditModal.value = false
  addEditCardData.value = {}
  resetValidation()
}

let formData = reactive({
  id: 0,
  name: '',
  bank_name: '',
  card_type: '',
  card_number: '',
  cvv: '',
  valid_till: '',
  set_default: false,
  gpay: false
})

watch(card, (newCard, oldCard) => {
  if (newCard !== oldCard) {
    formData.id = newCard.id !== undefined ? newCard.id : 0
    formData.name = newCard.name !== undefined ? newCard.name : ''
    formData.bank_name = newCard.bank_name !== undefined ? newCard.bank_name : ''
    formData.card_type = newCard.card_type !== undefined ? newCard.card_type : ''
    formData.card_number = newCard.card_number !== undefined ? newCard.card_number : ''
    formData.cvv = newCard.cvv !== undefined ? newCard.cvv : ''
    formData.valid_till = newCard.valid_till !== undefined ? newCard.valid_till : ''
    formData.set_default = newCard.set_default !== undefined ? newCard.set_default : false
    formData.gpay = newCard.gpay !== undefined ? newCard.gpay : false
  }
})

const rules = {
  id: {},
  name: { 
    required,
    minLength: minLength(3),
    maxLength: maxLength(35)
  },
  bank_name: {required},
  card_type: { required },
  card_number: {required},
  cvv: { required },
  valid_till: { 
    required,

  },
  set_default: { },
  gpay: { }
}

let validate = useVuelidate(rules, toRefs(formData))
function resetValidation() {
  validate = useVuelidate(rules, toRefs(formData))
}

const today = ref('');

onMounted(() => {
  setTodayDate()
});

const setTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  today.value = `${year}-${month}-${day}`;
}

const rawCardNumber = ref('');
const formatCardNumber = (event: any) => {
  let input = event.target.value.replace(/\D/g, '');
  input = input.substring(0, 16);
  formData.card_number = input.replace(/(\d{4})(?=\d)/g, '$1 ');

  rawCardNumber.value = input;
};

const validateCVV = (event: any) => {
  let input = event.target.value.replace(/\D/g, '');
  formData.cvv = input.substring(0, 3);
};


async function save(id: any | 0) {
  validate.value.$touch()
  if (validate.value.$invalid) {
    showToast('Please check the filled form!', 'warning')
  } else {
    formData.card_number = rawCardNumber.value

    let id = Math.floor(Math.random() * 1000000000) + 1
    formData.id = id

    showToast('Card saved successfully!', 'success')
    
    // store in local storage
    localStorage.getItem('cards') ? null : localStorage.setItem('cards', '[]')
    let cards = JSON.parse(localStorage.getItem('cards') || '[]')
    cards.push(formData)
    cardsData.value = cards
    localStorage.setItem('cards', JSON.stringify(cards))


    // await addEditCard(id, formData)
    showAddEditModal.value = false
    addEditCardData.value = {}
    resetValidation()
  }
}
</script>

<template>
  <Modal size="lg" :show="showAddEditModal" @close="closeModel">

    <template #header>
      <div class="flex flex-wrap items-center font-bold text-lg sm:text-xl">
        {{ card.id ? `Edit Card` : `New Card` }}
      </div>
    </template>

    <template #body>
      <form class="p-4 grid grid-cols-1 gap-4" @submit.prevent="save(card.id)">
        <!-- Card name  -->
        <div class="input-form" :class="{ 'text-[#C62828]': validate.name.$error }">
          <label for="name" class="form-label w-full flex flex-col sm:flex-row">
            Name:
            <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500 dark:text-slate-200"></span>
          </label>
          <input id="name" v-model.trim="validate.name.$model" type="text" name="name"
            class="form-control" :class="{ 'is-invalid': validate.name.$error }"
            placeholder="i.e. James Carlon"
          />
          <template v-if="validate.name.$error">
            <div v-for="(error, index) in validate.name.$errors"
              :key="index" class="text-xs mt-1"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>


        <!-- bank_name   -->
        <div class="input-form" :class="{ 'text-[#C62828]': validate.bank_name.$error }">
          <label for="bank_name" class="form-label w-full flex flex-col sm:flex-row">
            Bank Name:
          </label>
          <input id="bank_name" v-model.trim="validate.bank_name.$model" type="text" name="bank_name"
            class="form-control" :class="{ 'is-invalid': validate.bank_name.$error }"
            placeholder="i.e. HDFC BANK"
          />
          <template v-if="validate.bank_name.$error">
            <div v-for="(error, index) in validate.bank_name.$errors"
              :key="index" class="text-xs mt-1"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>

        
        <!-- Card type  -->

        <div class="input-form" :class="{ 'text-[#C62828]': validate.card_type.$error }">
          <label for="card_type" class="form-label w-full flex flex-col sm:flex-row">
            Select Card Type:
          </label>
          <select v-model.trim="validate.card_type.$model" id="card_type" name="card_type" >
            <option value="">Choose an option</option>
            <option key="credit" value="credit">Credit</option>
            <option key="debit" value="debit">Debit</option>
          </select>
          <template v-if="validate.card_type.$error">
            <div v-for="(error, index) in validate.card_type.$errors"
              :key="index" class="text-xs mt-1"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>

       

        <!-- bank_name   -->
        <div class="input-form" :class="{ 'text-[#C62828]': validate.card_number.$error }">
          <label for="card_number" class="form-label w-full flex flex-col sm:flex-row">
            Card Number:
          </label>
          <input id="card_number" v-model.trim="validate.card_number.$model" type="text" name="card_number"
            class="form-control" :class="{ 'is-invalid': validate.card_number.$error }"
            placeholder="i.e. 1234 5678 9012 3456" @input="formatCardNumber"
          />
          

          <template v-if="validate.card_number.$error">
            <div v-for="(error, index) in validate.card_number.$errors"
              :key="index" class="text-xs mt-1"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>

        

        <!-- Card card_number  -->
        <div class="flex gap-x-4">
          <div class="input-form" :class="{ 'text-[#C62828]': validate.valid_till.$error }">
            <label for="valid_till" class="form-label w-full flex flex-col sm:flex-row">
              Valid Till:
              <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500 dark:text-slate-200"> </span>
            </label>
            <input id="valid_till" v-model.trim="validate.valid_till.$model" type="date" name="valid_till"
              class="form-control" :class="{ 'is-invalid': validate.valid_till.$error }"
              placeholder="i.e. 2027-12-31" :min="today"
            />
            <template v-if="validate.valid_till.$error">
              <div v-for="(error, index) in validate.valid_till.$errors"
                :key="index" class="text-xs mt-1"
              >
                {{ error.$message }}
              </div>
            </template>
          </div>


          <!-- cvv -->

          <div class="input-form" :class="{ 'text-[#C62828]': validate.cvv.$error }">
            <label for="cvv" class="form-label w-full flex flex-col sm:flex-row">
              CVV:
              <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500 dark:text-slate-200"> </span>
            </label>
            <input id="cvv" v-model.trim="validate.cvv.$model" type="password" name="cvv"
              class="form-control w-24" :class="{ 'is-invalid': validate.cvv.$error }"
              placeholder="i.e. 123" @input="validateCVV"
            />
            <template v-if="validate.cvv.$error">
              <div v-for="(error, index) in validate.cvv.$errors"
                :key="index" class="text-xs mt-1"
              >
                {{ error.$message }}
              </div>
            </template>
          </div>


        </div>


        <!-- set default card -->
        <div class="flex items-center" :class="{ 'text-[#C62828]': validate.set_default.$error }">
          <input id="set_default" v-model.trim="validate.set_default.$model" type="checkbox" name="set_default"
            class="checkbox w-5 h-5 mr-1" :class="{ 'is-invalid': validate.set_default.$error }" 
          />
          
          <label for="set_default" class="form-label text-sm font-[500] w-full flex flex-col sm:flex-row">
            Set this card as Default
          </label>
          
          <template v-if="validate.set_default.$error">
            <div v-for="(error, index) in validate.set_default.$errors"
              :key="index" class="text-xs mt-1"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>

        <!-- gpay  -->
        <div class="flex items-center" :class="{ 'text-[#C62828]': validate.gpay.$error }">
          <input id="gpay" v-model.trim="validate.gpay.$model" type="checkbox" name="gpay"  
            class="checkbox w-5 h-5 mr-1" :class="{ 'is-invalid': validate.gpay.$error }"
          />
          
          <label for="gpay" class="form-label text-sm font-[500] w-full flex flex-col sm:flex-row">
            Add this card to GPay?
          </label>
          
          <template v-if="validate.gpay.$error">
            <div v-for="(error, index) in validate.gpay.$errors"
              :key="index" class="text-xs mt-1"
            >
              {{ error.$message }}
            </div>
          </template> 
        </div>


        <div class="-mx-5 mt-6 border-b-2 border-[#6a94a580]">
          
        </div>
        

        <div class="flex justify-end items-end pt-1 gap-2">
          <button type="button" class="btn-close" @click="closeModel">Close</button>
          <button type="submit" class="btn-submit" @click="submitForm">Submit</button>
        </div>
      </form>
    </template>
  </Modal>
</template>
