<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]" >
    <ul class="static_page page filter_tabs" v-if="!globalStore.loading">
      <li :class="['status_tab ' , {active : auctionStatus == 'coming'}]" @click="handleAuctionStatus('coming')">
        {{ t('auctions.statuses.coming') }}
      </li>
      <li :class="['status_tab ' , {active : auctionStatus == 'current'}]" @click="handleAuctionStatus('current')">
        {{ t('auctions.statuses.current') }}
      </li>
      <li :class="['status_tab ' , {active : auctionStatus == 'finished'}]" @click="handleAuctionStatus('finished')">
        {{ t('auctions.statuses.finished') }}
      </li>
      <li :class="['status_tab ' , {active : auctionStatus == 'closed'}]" @click="handleAuctionStatus('closed')">
        {{ t('auctions.statuses.closed') }}
      </li>
      <li :class="['status_tab ' , {active : auctionStatus == 'cancelled'}]" @click="handleAuctionStatus('cancelled')">
        {{ t('auctions.statuses.cancelled') }}
      </li>
    </ul>
    <div class="grid_content" v-if="!globalStore.loading">
      <Auction 
        v-for="item in getResult?.data"
        :key="item?.id"
        :auction="item"
      />
    </div>
    <Empty v-if="getResult?.data?.length == 0" />
    <!-- ########### Loading ########### -->
    <div v-if="globalStore.loading">
      <ul class="static_page page filter_tabs">
        <Skeleton width="100px" height="40px" v-for="i in 5" :key="i"/>
      </ul>
      <div class="grid_content">
        <div class="auction" v-for="i in 18">
          <div class="info">
            <div class="image">
              <Skeleton width="100px" height="100px"/>
            </div>
            <h3>
              <Skeleton width="150px" height="20px"/>
            </h3>
          </div>
          <div class="details">
            <h6 style="flex-grow: 1;">
              <Skeleton width="100%" height="20px"/>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define i18n
  const { t } = useI18n()

  // define global store
  const globalStore = useGlobalStore()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define auction status
  const auctionStatus = ref(globalStore.auctionData.auctionStatus ?? 'coming')
  const handleAuctionStatus = (status) => {
    auctionStatus.value = status
    globalStore.auctionData.auctionStatus = status
    getMethod(`auctions-subscribed-owner?type=owner&classificationType=${globalStore.auctionData.classificationType}&status=${status}`, 1 , true , false)
  }

  onMounted(()=>{
    globalStore.handlePageName(t('sidebar.auctions'))
    getMethod(`auctions-subscribed-owner?type=owner&classificationType=${globalStore.auctionData.classificationType}&status=${auctionStatus.value}`, 1 , true , false)
  })
</script>

<style lang="scss" scoped>

</style>