<template>
  <div class="authentication_page">
    <div class="auth_page">
      <div class="content">
        <div class="image">
          <img src="../../assets/images/verify.png" alt="logo" loading="lazy" />
        </div>
        <div class="head centered">
          <h3 class="title">
            {{ $t('verify_page.code_title') }}
          </h3>
        </div>
        <div class="form" style="direction: ltr;">
          <InputOtp v-model="body.activationCode" integerOnly @key.enter="handleSubmit"/>
          <MainBtn 
            :buttonText="$t('verify_page.verify_btn')"
            @handleSubmit="handleSubmit"
          />
        </div>
        <h5 class="code_text">
          {{$t("verify_page.have_code") }} 
          <span>{{ formattedMinutes }}:{{ formattedSeconds }}</span> 
          <button 
            @click="handleResendCode"
            :class="{'disabled' : isTimerRunning}"
          >
            {{ $t('verify_page.resend')}}
          </button>
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup>
  import InputOtp from 'primevue/inputotp';

  // define i18n
  const { t } = useI18n()

  // define global store
  const globalStore = useGlobalStore()

  definePageMeta({
    layout : false
  })

  // define body 
  const body = ref({
    countryCode : globalStore.countryCode,
    phone : globalStore.userPhone,
    activationCode : "",
    deviceId : globalStore.device_id,
    deviceType : "web",
    userType : "provider"
  })

  // Use the timer helper function 
  const { 
    formattedMinutes, 
    formattedSeconds, 
    isTimerRunning, 
    startTimer, 
    stopTimer 
  } = useTimer(2, 0);

  // define api methods
  const {
    submitMethod,
    showErrorToast
  } = useApiMethods()

    // handle resend code
  const handleResendCode = () =>{
    startTimer()
    submitMethod('send-code' , false ,{
      countryCode : globalStore.countryCode,
      phone : globalStore.userPhone,
      userType : "provider"
    } , 'PATCH' , '')
  }

  // handle submit
  const handleSubmit = () => {
    if(!body.value.activationCode) {
      showErrorToast(t('verify_page.code_required'))
      return
    }
    else if(body.value.activationCode.length < 4) {
      showErrorToast(t('verify_page.code_error'))
      return
    }
    else{
      submitMethod('activate' , false ,body.value , 'POST' , globalStore.pageBeforeActivation == 'forget-password' ? '/auth/new_password' : '/')
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    startTimer();
  });

  onUnmounted(() => {
    stopTimer();
  });
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
    .head.centered h3{
      font-size: 14px;
      font-weight: 400;
    }
  }
  .code_text{
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    span{
      color: $secColor;
      margin-inline-end: 3px;
    }

    button{
      font-size: 16px;
      color: $mainColor;
      text-decoration: underline;
      &:hover{
        transform: scale(1.05);
        text-decoration: none;
      }
      &.disabled{
        pointer-events: none;
        color: $secColor;
      }
    }
  }
</style>