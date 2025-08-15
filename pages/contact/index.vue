<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <div class="image">
        <img src="/assets/images/contact.png" alt="image" loading="lazy">
      </div>
      <div class="form">
        <div class="input-wrap">
          <label for="name">{{ $t('contact.form_name_label') }}</label>
          <div class="input">
            <i class="pi pi-user"></i>
            <input 
              id="name"
              type="text"
              :placeholder="$t('contact.form_name_label')"
              v-model="body.name"
            >
          </div>
        </div>
        <div class="input-wrap">
          <PhoneInput 
            :phone="body.phone"
            :country_code="body.countryCode"
            @updatePhone="body.phone = $event"
            @updateCountry="body.countryCode = $event"
          />
        </div>
        <div class="input-wrap">
          <label for="title">{{ $t('contact.form_title_label') }}</label>
          <div class="input">
            <input 
              id="title"
              type="text"
              :placeholder="$t('contact.form_title_label')"
              v-model="body.title"
            >
          </div>
        </div>
        <div class="input-wrap">
          <label for="message">{{ $t('contact.form_message_label') }}</label>
          <div class="input">
            <textarea 
              id="message"
              :placeholder="$t('contact.form_message_label')"
              v-model="body.description"
            />
          </div>
        </div>
        <MainBtn 
          :buttonText="$t('contact.form_button')"
          @handleSubmit="handleSubmit"
        />
        <ul class="social_images">
          <li v-for="social in getResult?.data" :key="social?.value">
            <NuxtLink class="image" :to="social?.linkUrl">
              <img :src="social?.linkImage" alt="link image" loading="lazy">
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>  
  </div>
</template>

<script setup>
  // define globalStore
  const globalStore = useGlobalStore()

  // define i18n
  const {t} = useI18n()

  // define body
  const body = ref({
    name : useAuthStore().userData.name ,
    countryCode : useAuthStore().userData.countryCode  ,
    phone : useAuthStore().userData.phone,
    title : '',
    description : ''
  })

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    showErrorToast
  } = useApiMethods()


  // define handle submit
  const handleSubmit = () =>{
    if(!body.value.name){
      showErrorToast(t('contact_validations.name_required'))
    }
    else if(body.value.name && body.value.name.length < 2){
      showErrorToast(t('contact_validations.name_length'))
    }
    else if(!body.value.phone){
      showErrorToast(t('contact_validations.phone_required'))
    }
    else if(body.value.phone && (body.value.phone.length < 9 )){
      showErrorToast(t('contact_validations.phone_length'))
    }
    else if(!body.value.title){
      showErrorToast(t('contact_validations.title_required'))
    }
    else if(body.value.title && body.value.title.length < 2){
      showErrorToast(t('contact_validations.title_length'))
    }
    else if(!body.value.description){
      showErrorToast(t('contact_validations.message_required'))
    }
    else if(body.value.description && body.value.description.length < 10){
      showErrorToast(t('contact_validations.message_length'))
    }else{
      submitMethod('contactus' , true , body.value , 'POST' , '/')
    } 
  }

  onMounted(()=>{
    globalStore.handlePageName(t('sidebar.contact'))
    getMethod('socials' , null , false , false)
  })
</script>

<style lang="scss" scoped>
  .page{
    .image{
      max-width: 300px;
    }
    .form{
      .input-wrap{
        &:not(:last-of-type){
          margin-bottom: 10px;
        }
      }
    }
    .social_images{
      @include displayFlex($wrap : wrap);
      li{
        width: 50px;
      }
    }
  }
</style>