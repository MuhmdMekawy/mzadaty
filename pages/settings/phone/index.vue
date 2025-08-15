<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <div class="image">
        <img src="/assets/images/verify.png" alt="image" loading="lazy">
      </div>
      <div class="form">
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

  // define showPassword
  const showPassword = ref(false)

  // define body
  const body = ref({
    password : ''
  })

  // define api methods
  const {
    submitMethod,
    showErrorToast
  } = useApiMethods()

  // handle submit 
  const handleSubmit = () =>{
    if(body.value.password.length < 6){
      showErrorToast(t('edit_password.validations.new_password_length'))
      return
    }
    else if(!/[a-zA-Z]/.test(body.value.password)){
      showErrorToast(t('edit_password.validations.new_password_contain_letter'))
      return
    }
    else if(!/[!@#$%^&*(),.?":{}|<>\-_]/.test(body.value.password)){
      showErrorToast(t('edit_password.validations.new_password_contain_special_character'))
      return
    }else{
      submitMethod('check-password' , true , body.value , 'PATCH' , '/settings/phone/change_phone')
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