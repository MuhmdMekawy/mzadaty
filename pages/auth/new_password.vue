<template>
  <div class="authentication_page">
    <div class="auth_page">
      <div class="image">
        <img src="/assets/images/new_password.png" alt="image" loading="lazy">
      </div>
      <div class="head centered">
        <h3 class="title">
          {{ $t('new_password.title') }}
        </h3>
        <p>{{ $t('new_password.text') }}</p>
      </div>
      <div class="form">
        <div class="input-wrap"> 
          <label for="password">{{ $t('new_password.form_password_label') }}</label>
          <div class="input">
            <input 
              id="password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('new_password.form_password_label')"
              v-model="body.password"
            > 
            <i class="pi" :class="{'pi-lock': !showPassword, 'pi-lock-open': showPassword}" @click="showPassword = !showPassword"></i>
          </div>
        </div>
        <div class="input-wrap"> 
          <label for="confirm_password">{{ $t('new_password.form_confirm_password_label') }}</label>
          <div class="input">
            <input 
              id="confirm_password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :placeholder="$t('new_password.form_confirm_password_label')"
              v-model="body.confirmedPassword"
            > 
            <i class="pi" :class="{'pi-lock': !showConfirmPassword, 'pi-lock-open': showConfirmPassword}" @click="showConfirmPassword = !showConfirmPassword"></i>
          </div>
        </div>
        <MainBtn 
          :buttonText="$t('new_password.form_submit_btn')"
          @handleSubmit = "handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  // define i18n
  const { t } = useI18n()

  definePageMeta({
    layout : false
  })

  // define api methods
  const {
    submitMethod,
    showErrorToast
  } = useApiMethods()


  // define body
  const body = ref({
    password : "",
    confirmedPassword : ""
  })

  // define password show
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  // define submit 
  const handleSubmit = () =>{
    if(!body.value.password){
      showErrorToast(t('new_password_validations.form_password_required'))
    }else if(body.value.password && body.value.password.length < 6){
      showErrorToast(t('new_password_validations.form_password_length'))
    }else if(!/[a-zA-Z@]/.test(body.value.password)){
      showErrorToast(t('new_password_validations.form_password_contain_letter'))
    }else if(!body.value.confirmedPassword){
      showErrorToast(t('new_password_validations.form_confirm_password_required'))
    }else if(body.value.password !== body.value.confirmedPassword){
      showErrorToast(t('new_password_validations.form_password_not_match'))
    }else{
      submitMethod('change-password' , true , body.value , 'PATCH' , '/')
    }
  }
</script>

<style lang="scss" scoped>
  .form .input-wrap {
    margin-block: 20px;
    .input{
      border: 0.5px solid #E6E6E6 !important;
      input{
        width: 100% !important; 
      }
    }
  }
</style>