<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <div class="image">
        <img src="/assets/images/verify.png" alt="image" loading="lazy">
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
</template>

<script setup>
  // define i18n
  const {t} = useI18n()

  // define global store
  const globalStore = useGlobalStore()

  // define body
  const body = ref({
    countryCode : '',
    phone : ''
  })

  // define api methods
  const {
    submitMethod,
    showErrorToast
  } = useApiMethods()

  // handle submit 
  const handleSubmit = () =>{
    if(!body.value.phone){
      showErrorToast(t('login_validations.phone_required'))
    }else if(body.value.phone && (body.value.phone.length < 9 )){
      showErrorToast(t('login_validations.phone_length'))
    }else{
      globalStore.setUserPhone(body.value.countryCode , body.value.phone)
      submitMethod('change-phone' , true , body.value , 'PATCH' , '/settings/verification_code')
    }
  }

  // onMounted
  onMounted(()=>{
    globalStore.handlePageName(t('edit_phone.page_name'))
  })
</script>

<style lang="scss" scoped>
  .static_page .image{
    max-width: 300px;
  }
</style>