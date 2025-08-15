<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowAuctionsPopup')"></button>
      <h3 class="title centered">
        {{ $t('add_auction.title') }}
      </h3>
      <div v-for="i in 6" v-if="globalStore.loading" class="loading_link auction_tab">
        <div class="image">
          <Skeleton width="30px" height="30px"/>
        </div>
        <h5>
          <Skeleton width="100%" height="20px"/>
        </h5>
      </div>
      <div 
        v-for="classification in getResult?.data?.classifications?.filter((item) => item.isVisible)" 
        @click="handleAddAuction(classification)"
        :key="classification.id"
        class="auction_tab"
        v-else>
        <div class="image">
          <img :src="classification?.icon" alt="image" loading="lazy">
        </div>
        <h5>
          {{ classification?.name }}
          <!-- {{ 
            globalStore.lang == 'ar' ? 
            classification?.nameAr : 
            classification?.nameEn 
          }} -->
        </h5>
        <i :class="'pi pi-angle-' + (globalStore.lang == 'ar' ? 'left' : 'right')"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define i18n
  const { t } = useI18n()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define global store
  const globalStore = useGlobalStore()

  // define emits
  const emit = defineEmits(['handleShowAuctionsPopup'])

  // define router 
  const router = useRouter()

  // define locale route
  const localeRoute = useLocaleRoute()

  // handle Add Auction 
  const handleAddAuction = (classification) =>{
    globalStore.handlePageName(t('add_auction.page_name') + ' ' + classification?.name)
    globalStore.auctionData.auctionProcess = 'add'
    globalStore.auctionData.name = classification?.name
    globalStore.auctionData.classification = classification?.slug
    globalStore.auctionData.classificationId = classification?.id
    globalStore.auctionData.endpoint = classification?._slug
    globalStore.auctionData.comission = classification?.auctionCommission
    router.push(localeRoute('/modify_auction?classification=' + classification?.slug + '&classificationId=' + classification?.id))
  }


  onMounted(()=>{
    getMethod('profile' , '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .popup{
    .content{
      background: #ededed !important;
      max-width: 750px;
      h3.title{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .auction_tab{
        @include displayFlex($justify : flex-start , $gap : 8px);
        width: 100%;
        padding: 8px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0px 0px 8px 0px #BABABA2E;
        transition: 0.3s;
        cursor: pointer;
        .image{
          width: 30px;
          height: 30px;
          border-radius: 4px;
          overflow: hidden;
          margin: 0;
        }
        h5{
          font-size: 14px;
          font-weight: 700;
          flex-grow:1;
          text-align: start;
        }
        i.pi{
          margin-inline-start: auto;
        }
        &:not(:last-of-type){
          margin-bottom: 8px;
        }
        &:not(.loading_link){
          &:hover{
            background: $mainColor;
            color: #fff;
            box-shadow: none;
          }
        }
      }
    }
  }
</style>