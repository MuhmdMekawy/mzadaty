<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <div class="image">
        <img src="/assets/images/mzadaty_logo.png" alt="image" loading="lazy">
      </div>
      <div class="text" v-if="getResult?.data" v-html="getResult?.data"></div>
      <Skeleton v-else height="1rem" v-for="i in 15" style="margin-bottom: 10px;"></Skeleton>
    </div>  
  </div>
</template>

<script setup>
  // define i18n
  const {t} = useI18n()

  // define globalStore
  const globalStore = useGlobalStore()

  // define api mehtods
  const {
    getMethod,
    getResult 
  } = useApiMethods()


  onMounted(()=>{
    globalStore.handlePageName(t('sidebar.privacy'));
    getMethod('privacy' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  
</style>