<template>
  <div class="authentication_page">
    <div class="auth_page">
      <div class="content">
        <div class="image">
          <img src="../../assets/images/verify.png" alt="logo" loading="lazy" />
        </div>
        <div class="form">
          <PhoneInput 
            :phone="body.phone"
            :country_code="body.countryCode"
            @updatePhone="body.phone = $event"
            @updateCountry="body.countryCode = $event.code"
          />
          <MainBtn 
            :buttonText="$t('verify_page.verify_btn')"
            @handleSubmit="handleSubmit"
          />
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

  definePageMeta({
    layout : false
  })

  // define body 
  const body = ref({
    countryCode : "",
    phone : "",
    userType : "provider"
  })


  // define api methods
  const {
    submitMethod,
    showErrorToast
  } = useApiMethods()


  // handle submit
  const handleSubmit = async () => {
    if(!body.value.phone){
      showErrorToast(t("login_validations.phone_required"))
    }else if(body.value.phone && (body.value.phone.length < 9 )){
      showErrorToast(t("login_validations.phone_length"))
    }else{
      globalStore.setUserPhone(body.value.countryCode ,body.value.phone)
      globalStore.handlePageBeforeActivation('forget-password')
      submitMethod('forget-password' , false , body.value , 'POST' , '/auth/activation_code')
    }
  }
</script>

<style lang="scss" scoped>
.page{
  .auth_page{
    .image{
      max-width: 400px;
      margin: 0 auto;
      img{
        object-fit: contain;
      }
    }
  }
}
</style>