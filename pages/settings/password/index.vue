<template>
  <div :class="['static_pages ', {mini_width: globalStore.showSideBar}]">
    <div class="static_page page">
      <div class="image">
        <img src="/assets/images/password_image.png" alt="image" loading="lazy">
      </div>
      <div class="form">
        <!-- كلمة المرور الحالية -->
        <div class="input-wrap"> 
          <label for="password">{{ $t('edit_password.password_label') }}</label>
          <div class="input">
            <input 
              id="password"
              :type="showCurrentPassword ? 'text' : 'password'"
              :placeholder="$t('edit_password.password_label')"
              v-model="body.password"
            > 
            <i class="pi" :class="{'pi-lock': !showCurrentPassword, 'pi-lock-open': showCurrentPassword}" @click="showCurrentPassword = !showCurrentPassword"></i>
          </div>
        </div>
        <!-- كلمة المرور الجديدة -->
        <div class="input-wrap"> 
          <label for="new_password">{{ $t('edit_password.new_password_label') }}</label>
          <div class="input">
            <input 
              id="new_password"
              :type="showNewPassword ? 'text' : 'password'"
              :placeholder="$t('edit_password.new_password_label')"
              v-model="body.newPassword"
            > 
            <i class="pi" :class="{'pi-lock': !showNewPassword, 'pi-lock-open': showNewPassword}" @click="showNewPassword = !showNewPassword"></i>
          </div>
        </div>
        <!-- تاكيد كلمة المرور الجديدة -->
        <div class="input-wrap"> 
          <label for="confirm_password">{{ $t('edit_password.confirm_password_label') }}</label>
          <div class="input">
            <input 
              id="confirm_password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :placeholder="$t('edit_password.confirm_password_label')"
              v-model="body.confirmedPassword"
            > 
            <i class="pi" :class="{'pi-lock': !showConfirmPassword, 'pi-lock-open': showConfirmPassword}" @click="showConfirmPassword = !showConfirmPassword"></i>
          </div>
        </div>
        <MainBtn 
          :buttonText="$t('edit_password.edit_btn')"
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

  // define show current password
  const showCurrentPassword = ref(false)

  // define show new password
  const showNewPassword = ref(false)

  // define show confirm password
  const showConfirmPassword = ref(false)

  // define body 
  const body = ref({
    password:'',
    newPassword:'',
    confirmedPassword:''
  })

  // define api methods
  const {
    submitMethod,
    showErrorToast
  } = useApiMethods()


  // define handle submit
  const handleSubmit = () =>{
    if(!body.value.password){
      showErrorToast(t('edit_password.validations.password_required'))
      return
    }
    else if(body.value.password.length < 6){
      showErrorToast(t('edit_password.validations.password_length'))
      return
    }
    else if(!/[a-zA-Z]/.test(body.value.password)){
      showErrorToast(t('edit_password.validations.password_contain_letter'))
      return
    }
    else if(!/[!@#$%^&*(),.?":{}|<>\-_]/.test(body.value.password)){
      showErrorToast(t('edit_password.validations.password_contain_special_character'))
      return
    }
    else if(!body.value.newPassword){
      showErrorToast(t('edit_password.validations.new_password_required'))
      return
    }
    else if(body.value.newPassword.length < 6){
      showErrorToast(t('edit_password.validations.new_password_length'))
      return
    }
    else if(!/[a-zA-Z]/.test(body.value.newPassword)){
      showErrorToast(t('edit_password.validations.new_password_contain_letter'))
      return
    }
    else if(!/[!@#$%^&*(),.?":{}|<>\-_]/.test(body.value.newPassword)){
      showErrorToast(t('edit_password.validations.new_password_contain_special_character'))
      return
    }
    else if(!body.value.confirmedPassword){
      showErrorToast(t('edit_password.validations.confirm_password_required'))
      return
    }
    else if(body.value.confirmedPassword !== body.value.newPassword){
      showErrorToast(t('edit_password.validations.confirm_password_match'))
      return
    }else{
      submitMethod('update-password' , true , body.value , 'PATCH' , '/')
    }
  }

  onMounted(()=>{
    globalStore.handlePageName(t('edit_password.page_name'))
  })
</script>

<style lang="scss" scoped>
  .static_page .image{
    max-width: 300px;
  }
</style>  