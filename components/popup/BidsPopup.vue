<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowAllBids')"></button>
      <ul class="static_page" v-if="!globalStore.loading && getResult?.data?.length > 0">
        <h3 class="title">
          {{ $t('auction_details.bids_register') }}
        </h3>
        <li v-for="bid in getResult?.data" :key="bid.id">
          <h4>
            <span>{{ bid.name }}</span>
          </h4>
          <h4>{{ bid?.priceText }}</h4>
        </li>
      </ul>
      <ul class="static_page" v-else-if="globalStore.loading">
        <h3 class="title">
          {{ $t('auction_details.bids_register') }}
        </h3>
        <li v-for="i in 18" :key="i" class="skeleton-bid">
          <Skeleton class="skeleton-text" style="width: 100%; height: 18px;"></Skeleton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define route 
  const route = useRoute()

  // define emit
  const emit = defineEmits(['handleShowAllBids'])

  onMounted(()=>{
    getMethod(`bids?id=${route.query.id}`, null , true , false)
  })
</script>

<style lang="scss" scoped>
.popup .content {
  max-height: 500px;
  overflow-y: scroll;
  padding-top: 8px;
  h4{
    margin-bottom: 0 !important;
    border-bottom: none;
    padding: 0 !important;
  }
} 
</style>