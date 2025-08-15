<template>
  <div :class="['page_content auction_page' , {minimized : globalStore.showSideBar}]">
    <div class="auction_item">
      <ProductSlider 
        :images="getResult?.data?.productData[0]?.images" 
      />
      <!-- وصف المنتج -->
      <div class="static_page">
        <h3 class="title">
          {{ $t('auction_details.product_info') }}
        </h3>
        <hr>
        <p>
          {{getResult?.data?.productData[0]?.description}}
        </p>
      </div>
      <!-- بيانات المنتج -->
      <ul class="static_page">
        <h3 class="title">
          {{ $t('auction_details.products_info_title') }}
        </h3>
        <!-- <hr> -->
        <li v-if="getResult?.data?.productData[0]?.type">
          <h4>
            <span>{{ $t('auction_details.type') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.type}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.brand">
          <h4>
            <span>{{ $t('auction_details.brand') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.brand}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.model">
          <h4>
            <span>{{ $t('auction_details.model') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.model}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.materials">
          <h4>
            <span>{{ $t('auction_details.material') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.materials}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.preciousStones">
          <h4>
            <span>{{ $t('auction_details.preciousStones') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.preciousStones}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.manufactureYear">
          <h4>
            <span>{{ $t('auction_details.manufacture_year') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.manufactureYear}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.plateNumber">
          <h4>
            <span>{{ $t('auction_details.plateNumber') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.plateNumber}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.name">
          <h4>
            <span>{{ $t('auction_details.productName') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.name}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.engineType">
          <h4>
            <span>{{ $t('auction_details.engine_type') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.engineType}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.mileage">
          <h4>
            <span>{{ $t('auction_details.mileage') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.mileage}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.exteriorColor">
          <h4>
            <span>{{ $t('auction_details.exterior_color') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.exteriorColor}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.interiorColor">
          <h4>
            <span>{{ $t('auction_details.interior_color') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.interiorColor}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.transmissionType">
          <h4>
            <span>{{ $t('auction_details.transmission_type') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.transmissionType}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.doorsNumber">
          <h4>
            <span>{{ $t('auction_details.doors_count') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.doorsNumber}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.seatsNumber">
          <h4>
            <span>{{ $t('auction_details.seats_count') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.seatsNumber}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.chassisNumber">
          <h4>
            <span>{{ $t('auction_details.chassis_number') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.chassisNumber}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.generalCondition">
          <h4>
            <span>{{ $t('auction_details.general_condition') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.generalCondition}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.operatingHours">
          <h4>
            <span>{{ $t('auction_details.operatingHours') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.operatingHours}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.technicalSpecifications">
          <h4>
            <span>{{ $t('auction_details.technical_specifications') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.technicalSpecifications}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.weight">
          <h4>
            <span>{{ $t('auction_details.weight') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.weight}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.dimensions">
          <h4>
            <span>{{ $t('auction_details.dimensions') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.dimensions}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.damageNotes">
          <h4>
            <span>{{ $t('auction_details.fault_notes') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.damageNotes}}</h4>
        </li>
        
        <li v-if="getResult?.data?.productData[0]?.specialFeatures">
          <h4>
            <span>{{ $t('auction_details.special_features') }}</span>
          </h4>
          <h4>{{getResult?.data?.productData[0]?.specialFeatures}}</h4>
        </li>
        <li class="examine_file" v-if="getResult?.data?.productData[0]?.examineFile">
          <h4>
            <span>{{ $t('auction_details.inspection_file') }}</span>
          </h4>
          <h4>
            <div class="image">
              <img src="/assets/images/pdf.png" alt="image" loading="lazy">
            </div>
            <a :href="getResult?.data?.productData[0]?.examineFile" download target="_blank">
              {{ $t('auction_details.download') }}
            </a>
          </h4>
        </li>
      </ul>
      <!-- سجل المزايدات -->
      <ul class="static_page" v-if="getResult?.data?.bids?.length > 0">
        <h3 class="title">
          {{ $t('auction_details.bids_register') }}
        </h3>
        <button @click="handleShowAllBids">
          {{ $t('auction_details.show_all_bids') }}
        </button>
        <li v-for="bid in getResult?.data?.bids" :key="bid.id">
          <h4>
            <span>{{ bid.name }}</span>
          </h4>
          <h4>{{ bid?.priceText }}</h4>
        </li>
      </ul>
      <!-- ملاحظات -->
      <div class="static_page" v-if="getResult?.data?.notes">
        <h3 class="title">
          {{ $t('auction_details.notes') }}
        </h3>
        <hr>
        <p>
          {{getResult?.data?.notes}}
        </p>
      </div> 
      <!-- سبب الالغاء -->
      <div class="static_page" v-if="getResult?.data?.reason && getResult?.data?.classification != 'equipment' && getResult?.data?.classification != 'vehicle'">
        <h3 class="title">
          {{ $t('auction_details.reason') }}
        </h3>
        <hr>
        <p>
          {{getResult?.data?.reason}}
        </p>
      </div> 
    </div>
    <div class="auction_item">
      <AuctionTimer 
        v-if="getResult?.data?.showTimer"
        :showTimer = "getResult?.data?.showTimer"
        :isComing = "getResult?.data?.isComing"
        :timeNow = "getResult?.data?.timeNow"
        :startedAt = "getResult?.data?.startedAt"
        :endedAt  = "getResult?.data?.endedAt"
      />
      <!-- وصف المزاد -->
      <div class="static_page" v-if="getResult?.data?.description && getResult?.data?.classification != 'equipment' && getResult?.data?.classification != 'vehicle'">
        <h3 class="title">
          {{ $t('auction_details.description_info') }}
        </h3>
        <hr>
        <p>
          {{getResult?.data?.description}}
        </p>
      </div>
      <!-- بيانات المزاد -->
      <ul class="static_page" v-if="getResult?.data?.classification != 'equipment' && getResult?.data?.classification != 'vehicle'">
        <h3 class="title">
          {{ $t('auction_details.auction_info_title') }}
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
        <li v-if="getResult?.data?.classification == 'vehicle' || getResult?.data?.classification == 'equipment'">
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
      <!-- فيديو عن المنتج -->
      <div class="static_page" v-if="getResult?.data?.productData[0]?.videos[0]">
        <h3 class="title">
          {{ $t('auction_details.video_info') }}
        </h3>
        <hr>
        <div class="image product_video">
          <video :src="getResult?.data?.productData[0]?.videos[0]"></video>
          <button @click="handleShowVideoPopup">
            <i class="pi pi-play"></i>
          </button>
        </div>
      </div>
      <!-- العربون -->
      <div class="auction_status" v-if="getResult?.data?.deposit">
        <!-- {{ $t('auction_details.bid') }} :  -->
        {{getResult?.data?.depositText}}
      </div>
      <!-- القيمة الحقيقية -->
      <div class="auction_status" v-if="getResult?.data?.realAuctionPrice">
        <!-- {{ $t('auction_details.bid') }} :  -->
        {{getResult?.data?.realAuctionPriceText}}
      </div>
      <!-- الفائز بالمزاد -->
      <div class="auction_status winner" v-if="getResult?.data?.alert">
        <!-- {{ $t('auction_details.bid') }} :  -->
        {{getResult?.data?.alert}}
      </div>
      <!-- لإعادة جدولة المزاد -->
      <button class="main-btn" v-if="getResult?.data?.reschedulingAuctionButton && getResult?.data?.classification != 'vehicle' && getResult?.data?.classification != 'equipment'" @click="handleReschedulingAuction">
          {{ $t('auction_details.reschedule_btn') }}
      </button>
      <!-- للموافقه والرفض علي البيع -->
      <div class="flex_buttons" v-if="getResult?.data?.ownerAcceptRejectButton">
        <button class="main-btn" @click="handleControlAuction('accept')">
          {{ $t('auction_details.accept_selling') }}
        </button>
        <button class="main-btn danger reversed" @click="handleControlAuction('reject')">
          {{ $t('auction_details.reject_selling') }}
        </button>
      </div>
      <!-- لالغاء المزاد -->
      <button 
        class="main-btn danger" 
        v-if="getResult?.data?.ownerCancelComingButton" 
        @click="handleShowCancelAuctionPopup"
      >
        {{ $t('auction_details.cancel') }}
      </button>
    </div>
    <VideoPopup 
      v-if="showVideoPopup"
      :video="getResult?.data?.productData[0]?.videos[0]"
      @handleShowVideoPopup ="handleShowVideoPopup"
    />
    <BidsPopup 
      v-if="showFullBidsPopup"
      @handleShowAllBids="showFullBidsPopup = false"
    />
    <CancelAuctionPopup 
      v-if="showCancelAuctionPopup"
      @handleShowCancelAuctionPopup="handleShowCancelAuctionPopup"
    />
  </div>
</template>

<script setup>
  // define i18n
  const {t} = useI18n()
  // define global store 
  const globalStore = useGlobalStore()
  
  // define route 
  const route = useRoute()

  // define router 
  const router = useRouter()

  // define locale route 
  const localeRoute = useLocaleRoute()

  // define api methods
  const {
    getMethod,
    submitMethod,
    getResult
  } = useApiMethods()


  // handle video popup
  const showVideoPopup = ref(false)
  const handleShowVideoPopup = () => {
    showVideoPopup.value = !showVideoPopup.value
  }

  // handle show all bids popup
  const showFullBidsPopup = ref(false)
  const handleShowAllBids = () => {
    showFullBidsPopup.value = !showFullBidsPopup.value
  }

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

  // handle cancel auction popup
  const showCancelAuctionPopup = ref(false)
  const handleShowCancelAuctionPopup = () => {
    showCancelAuctionPopup.value = !showCancelAuctionPopup.value
  }


  // handle control auction ( accept / reject)
  const handleControlAuction = (type) => {
    submitMethod(`owner-${type}-auction` , true , {
      id : route.query.id
    } , 'PATCH' , 'reload_page')
  }


  onMounted(()=>{
    globalStore.handlePageName(t('auction_details.page_title'))
    getMethod(`auction-details?id=${route.query.id}` , null , true , false)
  })
</script>

<style lang="scss" scoped>
  .static_page{
    margin-bottom: 10px !important;
    .product_video{
      max-width: 100% !important;
      height: 200px;
      border-radius: 12px;
      overflow: hidden;
      margin: 0 !important;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: #00000033;
      }
      button{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50% , -50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #fff;
        @include displayFlex();
        transition: 0.3s;
        color: #fff;
        z-index: 2;
        &:hover{
          background: #fff;
          i{
            color: $mainColor;
          }
        }
      }
    }
  }
  .page_content.auction_page ul li.examine_file{
    h4{
      &:last-of-type{
        @include displayFlex($gap : 3px);
        color: $dangerColor;
        .image{
          margin-bottom: 0;
          height: 20px;
        }
      }
    }
  }

  .flex_buttons{
    margin: 0;
    .main-btn{
      margin: 0;
      max-width: unset;
      height: 50px;
      font-size: 16px; 
    }
  }
</style>