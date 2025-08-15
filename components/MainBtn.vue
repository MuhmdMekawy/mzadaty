<template>
  <button :class="['main-btn ' , globalStore.loading ? 'disabled' : '']" @click="emit('handleSubmit')">
    <ProgressSpinner v-if="globalStore.loading" style="width: 20px; height: 20px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    {{ props.buttonText }}
  </button>
</template>

<script setup>
  import ProgressSpinner from 'primevue/progressspinner';

  // define global store
  const globalStore = useGlobalStore()  

  // define props
  const props = defineProps({
    buttonText : String
  })

  // define emit
  const emit = defineEmits(['handleSubmit'])
</script>



<!-- HOW TO IMPORT AND HOW TO PASS  -->

<!-- 
  <MainBtn 
    :buttonText="YOUR TARGRET TEXT"
    @handleSubmit="handleSubmit"
  />
/> -->