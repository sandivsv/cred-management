<template>
  <teleport to="body">
    <div v-if="show" :id="id" :style="{ zIndex: zIndexValue }">
      <div class="bg-gray-900 bg-opacity-50 fixed inset-0" :style="{ zIndex: zIndexValue+1 }" />
      <div
        ref="modalRef"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        tabindex="0"
        :style="{ zIndex: zIndexValue+2 }"
        @click.self="clickOutside"
        @keyup.esc="closeWithEsc"
      >
        <div
          :class="`${modalSizeClasses[size]}`"
          class="relative p-4 ml-0 lg:ml-[240px] w-full h-full"
          @click.self="clickOutside"
        >
          <!-- Modal content -->
          <div class="modal-shadow relative border-2 bg-white rounded-lg shadow" :class="{'mt-10': !popup}">

            <!-- Modal header -->
            <div
              :class="[$slots.header ? ' ' : '', popup || !showHeader?'':'p-4 pb-2']"
              class="shadow-custom font-[500] text-[#0C3F62] rounded-t flex justify-between items-center"
            >
              <slot name="header" />

              <!-- for close button  --> 
              <button
                v-if="!persistent"
                aria-label="close"
                class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1 ml-auto inline-flex items-center dark:hover:text-white"
                :class="{ 'mt-2 mr-2': popup }"
                type="button"
                @click="closeModal"
              >
                <slot name="close-icon">
                  <CloseIcon class="w-4 h-4" />
                </slot>
                
              </button>
            </div>


            <div class = "">
            <!-- Modal body -->
              <div :class="$slots.header ? '' : 'pt-0'"
                class="modal-body p-2 pr-1 max-h-[75vh] overflow-y-scroll"
              >
                <slot name="body" />
              </div>

              <!-- Modal footer -->
              <div
                v-if="$slots.footer"
                :class="{'': !popup}"
                class="p-2 rounded-b "
              >
                <slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
  
<script lang="ts" setup>
  import { onMounted, ref,computed,  type Ref } from 'vue'
  import type { ModalSize } from '@/stores/types'
  
  interface ModalProps {
    notEscapable?: boolean,
    persistent?: boolean
    size?: ModalSize,
    id?: string
    show?: boolean
    popup?: boolean
    showHeader?: boolean
  }
  
  const props = withDefaults(defineProps<ModalProps>(), {
    notEscapable: false,
    persistent: false,
    size: '2xl',
    id: `modal-${Math.random().toString(16).slice(2)}`,
    show: false,
    popup: false,
    showHeader: true
  })
  
  const emit = defineEmits(['close', 'click:outside'])
  const modalSizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-sm md:max-w-md lg:max-w-lg',
    xl: 'max-w-md md:max-w-lg lg:max-w-xl',
    '2xl': 'max-w-lg md:max-w-xl lg:max-w-2xl',
    '3xl': 'max-w-lg md:max-w-xl lg:max-w-3xl',
    '4xl': 'max-w-lg md:max-w-xl lg:max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  }

  function getHighestZIndex() {
    const elements = [...document.querySelectorAll('body *')] as HTMLElement[]
    const zIndexes = elements.map(el => parseFloat(window.getComputedStyle(el).zIndex))
      .filter(zIndex => !isNaN(zIndex))
    return Math.max(0, ...zIndexes)
  }

  // Compute the zIndex value dynamically
  const zIndexValue = computed(() => getHighestZIndex() + 1)
  
  function closeModal () {
    emit('close')
  }
  function clickOutside () {
    if (!props.persistent) {
      emit('click:outside')
      closeModal()
    }
  }
  
  function closeWithEsc () {
    if (!props.notEscapable && !props.persistent) closeModal()
  }
  const modalRef: Ref<HTMLElement | null> = ref(null)
  onMounted(() => {
    if (modalRef.value) {
      modalRef.value.focus()
    }
  })
</script>


<style scoped>
.modal-body::-webkit-scrollbar {
  width: 1px;
  height: 4px;
}
.modal-body::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background-image: linear-gradient(
    to right,
    #9aa981 50%,
    #9aa981 100%,
    #9aa981 100%
  );
}
.shadow-custom {
  box-shadow: 0px 2px 5px 0px #0000005C;
}
.modal-shadow {
  box-shadow: 0px 0px 15px 5px #00000040;
}
</style>
