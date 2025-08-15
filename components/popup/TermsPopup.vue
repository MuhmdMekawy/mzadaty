<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('closeTermsPopup')"></button>
      <!-- <h4 class="centered">{{ $t('terms.title') }}</h4> -->
      <div class="image">
        <img src="/assets/images/mzadaty_logo.png" alt="image" loading="lazy">
      </div>
      <p v-if="getResult" v-html="getResult?.data"></p>
      <Skeleton v-else height="1rem" v-for="i in 25" style="margin-bottom: 10px;" />
    </div>
  </div>
</template>

<script setup>
  import Skeleton  from 'primevue/skeleton';

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define emits
  const emit = defineEmits(['closeTermsPopup'])

  onMounted(()=>{
    getMethod('terms' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  .popup .content .image{
    max-width: 130px;
  }
</style>
