<template>
  <div :class="['page_content' , {minimized : globalStore.showSideBar}]">
    <div class="statistics_tabs">
      <div class="tab">
        <div class="tab_text">
          <div class="image">
            <img src="/assets/images/current_auction.png" alt="image" loading="lazy">
          </div>
          <div class="head">
            <h3 class="title">{{ $t('home.current_auctions') }}</h3>
            <p>{{ globalStore?.lang == 'ar' ? 'عدد المشتركين' : 'Number of subscribers' }}</p>
            <h4>{{ getResult?.data?.currentSubscribersCount }}</h4>
          </div>
        </div>
        <div class="tab_image image">
          <img src="/assets/images/statistics.png" alt="image" loading="lazy">
        </div>
      </div>
      <div class="tab">
        <div class="tab_text">
          <div class="image">
            <img src="/assets/images/coming_auction.png" alt="image" loading="lazy">
          </div>
          <div class="head">
            <h3 class="title">{{ $t('home.coming_auctions') }}</h3>
            <p>{{ globalStore?.lang == 'ar' ? 'عدد المشتركين' : 'Number of subscribers' }}</p>
            <h4>{{ getResult?.data?.comingSubscribersCount }}</h4>
          </div>
        </div>
        <div class="tab_image image">
          <img src="/assets/images/statistics.png" alt="image" loading="lazy">
        </div>
      </div>
      <div class="tab">
        <div class="tab_text">
          <div class="head">
            <h3 class="title">{{ $t('home.total_earns') }}</h3>
            <h4>{{ getResult?.data?.totalProfit?.text }}</h4>
          </div>
        </div>
        <div class="tab_image image">
          <img src="/assets/images/earns.png" alt="image" loading="lazy">
        </div>
      </div>
    </div>
    <button class="main-btn add_auction" @click="showAuctionsPopup = true">
      <i class="pi pi-hammer"></i>
      <span>{{ $t('home.add_btn') }}</span>
    </button>
    <h3 class="title">{{ $t('home.current_auctions') }}</h3>
    <div class="grid_content" v-if="globalStore.loading">
      <div class="auction" v-for="i in 18">
        <div class="info">
          <div class="image">
            <Skeleton width="100px" height="100px"/>
          </div>
          <h3 style="flex-grow: 1;">
            <Skeleton width="100%" height="20px"/>
          </h3>
        </div>
      </div>
    </div>
    <div class="grid_content" v-else>
      <Auction 
        v-for="auction in getResult?.data?.list"
        :key="auction.id"
        :auction="auction"
      />
    </div>
    <Empty v-if="!globalStore.loading && getResult?.data?.list?.length == 0" />
    <AuctionsPopup  
      v-if="showAuctionsPopup"
      @handleShowAuctionsPopup="showAuctionsPopup = false"
    />
  </div>
</template>

<script setup>
  // define globalStore
  const globalStore = useGlobalStore()

  // define api methods
  const{
    getMethod,
    getResult
  } = useApiMethods()

  // handle auction popup
  const showAuctionsPopup = ref(false)

  onMounted(()=>{
    globalStore.handlePageName(globalStore.lang == 'ar' ? 'مرحبا بك'  : 'Welcome')

    getMethod('home-dashboard' , 1 , true , false)
  })
</script>

<style lang="scss" scoped>
  .statistics_tabs{
    @include displayGrid(30% , 20px clamp(20px , 100% , 33px));
    .tab{
      border-radius: 8px;
      padding: 12px 15px;
      @include displayFlex($align : flex-end , $gap : 0);
      box-shadow: 0px 0px 8px 0px #BABABA2E;
      .tab_text{
        @include displayFlex($align : flex-start , $gap : 10px);
        flex-shrink: 0;
        .image{
          @include circle(40px);
          background: #fff;
          flex-shrink: 0;
          padding: 8px;
        }
        .head{
          padding-block-start: 10px;
          margin-bottom: 0;
          h3.title{
            font-size: 18px;
            font-weight: 600;
          }
          p{
            font-size: 14px;
            font-weight: 400;
            margin-block: 8px;
          }
          h4{
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
      &:first-of-type{
        background: #E7EDFE;
      }
      &:nth-of-type(2){
        background: #FFEFE2 ;
      }
      &:nth-of-type(3){
        background: #D4F9E6;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 5px;
        .tab_image{
          margin-inline-end: clamp(0px , 100% , 30px);
          @media (max-width: 1200px) {
            margin-inline-end: 0;
          }
        }
      }
    }
  }
  .add_auction{
    max-width: 250px;
    margin: 0 ;
    margin-block: 30px;
    margin-inline-start: auto;
    font-size: 16px;
    gap: 8px;
    height: 50px;
    i.pi{
      font-size: 20px;
    }
  }
  h3.title{
    text-align: start;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
</style>