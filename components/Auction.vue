<template>
  <div class="auction">
    <div class="control_btns">
      <button class="edit_btn" v-if="props.auction.editButton" @click="handleEditAuction(props.auction)">
        <i class="pi pi-pencil"></i>
      </button>
      <button class="delete_btn" v-if="props.auction.deleteButton" @click="handleDeleteAuction(props.auction.id)">
        <i class="pi pi-trash"></i>
      </button>
    </div>
    <NuxtLink :to="props.auction?.classification == 'vehicle' || props.auction?.classification == 'equipment' ? $localeRoute(`/auctions/${props.auction.id}`) : $localeRoute(`/auction_details?id=${props.auction.id}`)" class="info">
      <div class="image">
        <img :src="props.auction.icon" :alt="props.auction.name" loading="lazy">
      </div>
      <h3>{{ props.auction.name }}</h3>
    </NuxtLink>
    <AuctionTimer 
      v-if="props.auction.showTimer"
      :showTimer = "props.auction.showTimer"
      :isComing = "props.auction.isComing"
      :timeNow = "props.auction.timeNow"
      :startedAt = "props.auction.startedAt"
      :endedAt  = "props.auction.endedAt"
    />
  </div>
</template>

<script setup>
  // define global store 
  const globalStore = useGlobalStore()

  // define router
  const router = useRouter()

  // define locale route
  const localeRoute = useLocaleRoute()

  // define props
  const props = defineProps({
    auction: Object
  });


  // define api methods
  const {
    submitMethod,
  } = useApiMethods()

  // HANDLE EDIT AUCTION
  const handleEditAuction = (auction) => {
    globalStore.auctionData.auctionProcess = 'edit'
    globalStore.auctionData.classification = auction?.classification
    globalStore.auctionData.classificationId = auction?.id
    globalStore.auctionData.endpoint = auction?._slug
    globalStore.auctionData.comission = auction?.auctionCommission
    router.push(localeRoute('/modify_auction?classification=' + auction?.classification + '&classificationId=' + auction?.id))
  }

  // HANDLE DELETE AUCTION
  const handleDeleteAuction = (id) => {
    submitMethod(`delete-auction?id=${id}` , true , null , 'DELETE' , 'reload_page')
  }

</script>


<!-- HOW TO USE THE COMPONENT -->

<!-- 
  <Auction 
    v-for="item in getResult?.data"
    :key="item?.id"
    :auction="item"
  />
-->