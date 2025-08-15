<template>
  <div :class="['page_content auction_page' , {minimized : globalStore.showSideBar}]">
    <div class="auction_item" v-if="!globalStore.loading">
      <AuctionTimer 
        v-if="getResult?.data?.showTimer"
        :showTimer = "getResult?.data?.showTimer"
        :isComing = "getResult?.data?.isComing"
        :timeNow = "getResult?.data?.timeNow"
        :startedAt = "getResult?.data?.startedAt"
        :endedAt  = "getResult?.data?.endedAt"
      /> 
      <ul class="static_page">
        <h3 class="title">
          {{ $t('auction_details.page_title') }}
        </h3>
        <li>
          <h4>
            <i class="pi pi-hammer"></i>
            <span>{{ $t('auction_details.auction_name') }}</span>
          </h4>
          <h4>{{getResult?.data?.name}}</h4>
        </li>
        <li>
          <h4>
            <i class="pi pi-calendar"></i>
            <span>{{ $t('auction_details.start_date') }}</span>
          </h4>
          <h4>{{getResult?.data?.startAuction}}</h4>
        </li>
        <li>
          <h4>
            <i class="pi pi-calendar"></i>
            <span>{{ $t('auction_details.end_date') }}</span>
          </h4>
          <h4>{{getResult?.data?.endAuction}}</h4>
        </li>
        <li>
          <h4>
            <i class="pi pi-clock"></i>
            <span>{{ $t('auction_details.start_time') }}</span>
          </h4>
          <h4>{{getResult?.data?.startAuctionTime}}</h4>
        </li>
        <li>
          <h4>
            <i class="pi pi-clock"></i>
            <span>{{ $t('auction_details.end_time') }}</span>
          </h4>
          <h4>{{getResult?.data?.endAuctionTime}}</h4>
        </li>
        <li>
          <h4>
            <i class="pi pi-map-marker"></i>
            <span>{{ $t('auction_details.location') }}</span>
          </h4>
          <h4>{{getResult?.data?.location}}</h4>
        </li>
        <li>
          <h4>
            <i class="pi pi-sitemap"></i>
            <span>{{ $t('auction_details.products_count') }}</span>
          </h4>
          <h4>{{getResult?.data?.productsCount}}</h4>
        </li>
        <li>
          <h4>
            <i class="pi pi-money-bill"></i>
            <span>{{ $t('auction_details.commission') }}</span>
          </h4>
          <h4>{{getResult?.data?.commission}}</h4>
        </li>
      </ul>
      <div class="auction_status mt-5" v-if="getResult?.data?.bidPrice">
        {{ $t('auction_details.bid') }} : {{getResult?.data?.bidPriceText}}
      </div>
      <!-- سبب الالغاء -->
      <div class="static_page !mt-5" v-if="getResult?.data?.reason">
        <h3 class="title">
          {{ $t('auction_details.reason') }}
        </h3>
        <hr>
        <p>
          {{getResult?.data?.reason}}
        </p>
      </div> 
    </div>
    <!-- LOADING ITEM -->
    <div class="auction_item" v-else>
      <ul class="static_page">
        <h3 class="title">
          <Skeleton width="200px" style="margin-bottom: 5px;" height="2rem" />
        </h3>
        <li v-for="i in 6" :key="i">
          <Skeleton width="100%" height="2rem" />
        </li>
      </ul>
    </div>
    <!-- LOADING ITEM -->
    <div class="auction_item" v-if="!globalStore.loading">
      <div class="static_page">
        <h3 class="title">
          {{ $t('auction_details.description_info') }}
        </h3>
        <hr>
        <p>
          {{getResult?.data?.description}}
        </p>
      </div>
      <div class="static_page products_info" v-if="getResult?.data?.productData?.length > 0">
        <h3 class="title">
          {{ $t('auction_details.products_info_title') }}
        </h3>
        <hr>
        <template v-for="(product, index) in getResult?.data?.productData" :key="product.id">
          <NuxtLink 
            class="main-btn reversed sec_btn" 
            :to="$localeRoute(`/auction_details?id=${route.params.id}&product=${product.id}`)" 
            v-if="product"
          >
            <span>{{ $t(`auction_details.product_${index + 1}`) }}</span>
            <i class="pi pi-arrow-left"></i>
          </NuxtLink>
        </template>
      </div>
      <!-- لإعادة جدولة المزاد -->
      <button class="main-btn !mt-0" v-if="getResult?.data?.reschedulingAuctionButton" @click="handleReschedulingAuction">
        {{ $t('auction_details.reschedule_btn') }}
      </button>
    </div>

    <!-- LOADING ITEM -->
    <div class="auction_item" v-else>
      <div class="static_page">
        <h3 class="title">
          <Skeleton width="200px" style="margin-bottom: 5px;" height="2rem" />
        </h3>
        <hr>
        <p v-for="i in 5" :key="i">
          <Skeleton width="100%" height="1rem" style="margin-bottom: 8px;"/>
        </p>
      </div>
      <div class="static_page products_info">
        <h3 class="title">
          <Skeleton width="200px" height="2rem" />
        </h3>
        <hr>
        <Skeleton v-for="i in 2" :key="i" width="100%" height="3rem" style="margin-bottom: 8px;" />
      </div>
    </div>
    <!-- LOADING ITEM -->
  </div>
</template>

<script setup>
  // define i18n
  const{ t } = useI18n()

  // define global store
  const globalStore = useGlobalStore()

  // define locale route
  const localeRoute = useLocaleRoute()


  // define route 
  const route = useRoute()

  // define router 
  const router = useRouter()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

    // handle rescheduling auction
  const handleReschedulingAuction = () => {
    // console.log(getResult?.value?.data)
    // HANDLE EDIT AUCTION
    globalStore.auctionData.auctionProcess = 'edit'
    globalStore.auctionData.classification = getResult?.value?.data?.classification
    globalStore.auctionData.classificationId = getResult?.value?.data?.id
    globalStore.auctionData.endpoint = getResult?.value?.data?._slug
    globalStore.auctionData.comission = getResult?.value?.data?.commission
    router.push(localeRoute('/modify_auction?classification=' + getResult?.value?.data?.classification + '&classificationId=' + getResult?.value?.data?.id))
  }
  
  onMounted(()=>{
    globalStore.handlePageName(t('auction_details.page_title'))
    getMethod(`auction-details?id=${route.params.id}` , null , true , false)
  })
</script>

<style lang="scss" scoped>
</style>