<template>
  <div class="popup">
    <div class="content">
      <h4 class="centered">
        {{ $t('logout_popup.title') }}
      </h4>
      <div class="image circle">
        <img src="/assets/images/logout.png" alt="image" loading="lazy">
      </div>
      <div class="flex_buttons" v-if="!globalStore.loading" >
        <button 
          class="main-btn reversed" 
          @click="emit('handleShowLogoutPopup')"
        >
          {{ $t('logout_popup.cancel') }}
        </button>
        <MainBtn 
          :buttonText="$t('logout_popup.confirm')"
          @handleSubmit="handleLogout"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  // define emits 
  const emit = defineEmits('handleShowLogoutPopup')

  // define global Store
  const globalStore = useGlobalStore()

  // define api methods
  const {
    submitMethod,
    submitResult
  } = useApiMethods()

  // define handle logout 
  const handleLogout = () => {
    submitMethod('signout' , true , {deviceId : globalStore.device_id} , 'POST' , 'reload_page')
  }

  watchEffect(()=>{
    if(submitResult?.value?.data?.key == 'success'){
      window.sessionStorage.clear();
      useCookie('authStore').value = ''
      useCookie('globalStore').value = ''
      useCookie('i18n_redirected').value = ''
    }
  })

</script>

<style lang="scss" scoped>
  .main-btn{
    &:not(.reversed){
      background: $dangerColor;
      &:hover{
        border-color: $dangerColor !important;
        color: $dangerColor;
      }
    }
  }
</style>