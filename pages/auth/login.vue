<template>
  <div class="authentication_page">
    <div class="auth_page">
      <div class="content">
        <div class="image">
          <img src="../../assets/images/logo.png" alt="logo" loading="lazy" />
        </div>
        <div class="form">
          <div class="head centered">
            <h3>{{ $t('login.page_title') }}</h3>
            <p>{{ $t('login.form_head_title') }}</p>
          </div>
          <!-- رقم الجوال -->
          <PhoneInput 
            :phone="body.phone"
            :country_code="body.countryCode"
            @updatePhone="body.phone = $event"
            @updateCountry="body.countryCode = $event.code"
          />
          <!-- كلمة المرور -->
          <div class="input-wrap"> 
            <label for="password">{{ $t('login.form_password_label') }}</label>
            <div class="input">
              <input 
                id="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('login.form_password_label')"
                v-model="body.password"
              > 
              <i class="pi" :class="{'pi-lock': !showPassword, 'pi-lock-open': showPassword}" @click="showPassword = !showPassword"></i>
            </div>
          </div>
          <NuxtLink :to="localeRoute('/auth/forget_password')" class="forget_password">
            {{$t('login.form_forget_password')}}
          </NuxtLink>
          <MainBtn 
            :buttonText="$t('login.form_button')"
            @handleSubmit="handleSubmit"
          />
          <p>
            {{ $t('login.form_register_link') }} 
            <NuxtLink :to="localeRoute('/auth/register')">
              {{ $t('login.form_register') }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define i18n
  const { t } = useI18n()

  // define router 
  const router = useRouter()  

  // define locale route
  const localeRoute = useLocaleRoute()
  
  definePageMeta({
    layout: false
  })

  // define body 
  const body = ref({
    phone : "",
    password : "",
    countryCode : "",
    userType : "provider",
    deviceId :globalStore.device_id,
    deviceType : "web"
  })

  // define password show
  const showPassword = ref(false)

  // define api methods
  const {
    submitMethod,
    submitResult,
    showErrorToast
  } = useApiMethods()

  const handleSubmit = () => {
    if(!body.value.phone){
      showErrorToast(t("login_validations.phone_required"))
    }
    else if(body.value.phone && (body.value.phone.length < 9 )){
      showErrorToast(t("login_validations.phone_length"))
    }
    else if(!body.value.password){
      showErrorToast(t("login_validations.password_required"))
    }else{
      globalStore.setUserPhone(body.value.countryCode , body.value.phone)
      globalStore.handlePageBeforeActivation('login')
      submitMethod('signin' , true , body.value , 'POST' , '')
    }
  }

  watchEffect(()=>{
    if(submitResult?.value){
      if(submitResult?.value?.data?.key == 'success'){
        router.push(localeRoute('/'))
      }else if(submitResult?.value?.data?.key == 'needActive'){
        router.push(localeRoute('/auth/activation_code'))
      }
    }
  })
</script>

<style lang="scss" scoped>
  .form {
    .input-wrap{
      &:last-of-type {
        margin-top: 40px;
        .input {
          border: 0.5px solid #E6E6E6;
          input{
            width: 100%;
          }
        }
      }
      + a{
        display: block;
        width: fit-content;
        margin-inline-start: auto;
        font-size: 13px;
        margin-block-start: 8px;
      }
    }
  }
</style>