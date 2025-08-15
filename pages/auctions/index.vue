<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <!-- @click="globalStore.auctionData.classification = 'vehicle'"  -->
      <NuxtLink 
        :to="localeRoute('/auctions/auction_types')"
        @click="globalStore.auctionData.classificationType = '0'"  
        class="auction_tab"
      >
        {{ $t('auctions.vehicles') }}
      </NuxtLink>
      <NuxtLink 
        :to="localeRoute('/auctions/auction_types')" 
        @click="globalStore.auctionData.classificationType = '1'" 
        class="auction_tab"
      >
        {{ $t('auctions.other_auctions') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  // define i18n
  const { t } = useI18n()

  // define global store
  const globalStore = useGlobalStore()

  // define locale route 
  const localeRoute = useLocaleRoute()


  onMounted(()=>{
    globalStore.handlePageName(t('sidebar.auctions'))
  })
</script>

<style lang="scss" scoped>
  .auction_tab{
    text-align: center;
    padding: clamp(20px , 100% , 45px) 20px;
    border: 1px solid $mainColor;
    border-radius: 12px;
    @include displayFlex();
    transition: 0.6s;
    &:first-of-type{
      margin-bottom: 10px;
    }
    &:hover{
      background: $mainColor;
      color: #fff;
    }
  }
</style>