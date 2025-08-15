<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowCancelAuctionPopup')"></button>
      <h3 class="title centered">
        {{ $t('cancel_auction_popup.title') }}
      </h3>
      <hr>
      <div class="input-wrap">
        <label for="reason">
          {{ $t('cancel_auction_popup.reason_label') }}
        </label>
        <div class="input">
          <textarea 
            name="reason_of_cancel" 
            id="reason_of_cancel"
            :placeholder="$t('cancel_auction_popup.reason_label')"
            v-model="body.reason"
          />
        </div>
      </div>
      <MainBtn 
        :buttonText="$t('cancel_auction_popup.cancel_auction')"
        @handleSubmit="handleCancelAuction"
      />
    </div>
  </div>
</template>

<script setup>
  // define i18n
  const { t } = useI18n()



  // define body
  const body = ref({
    reason: ''
  })

  // define api methods
  const{
    submitMethod,
    showErrorToast
  } = useApiMethods()

  // define route 
  const route = useRoute()
  
  // define emits
  const emit = defineEmits(['handleShowCancelAuctionPopup'])


  // define handle cancel auction
  const handleCancelAuction = () => {
    if(!body.value.reason){
      showErrorToast(t('cancel_auction_popup.reason_required'))
      return
    }else{
      submitMethod(`owner-cancel-coming-auction?id=${route.query.id}&reason=${body.value.reason}` , true , null , 'PATCH' ,'reload_page')
      // emit('handleShowCancelAuctionPopup')
    }
  }
</script>

<style lang="scss" scoped>
  h3.title.centered{
    text-align: center;
  }
  .input-wrap{
    margin-top: 20px;
    .input,textarea{
      height: 200px;
      max-height: unset;
    }
  }
  .main-btn{
    background: $dangerColor;
    &::after,
    &::before{
      background: $dangerColor;
    }
		&:hover{
			background: #fff !important;
			color: $dangerColor !important;
      border-color: $dangerColor !important;
      &::before,
      &::after{
        background: #fff
      }
		}
  }
</style>