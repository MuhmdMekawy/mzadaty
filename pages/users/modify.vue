<template>
  <div :class="['page_content' , {minimized : globalStore.showSideBar}]">
    <h5>{{ $t('add_user.form_title') }}</h5>
    <hr>
    <!-- <LoadingForm  v-if="globalStore.loading" /> -->
    <div class="form">
      <!-- الصورة الشخصية -->
      <label for="image" class="image_uploader image">
        <img 
          class="uploaded_img" 
          v-if="body?.image?.url" 
          :src="body?.image?.url" 
          alt="image" 
          loading="lazy"
        />
        <img 
          v-else 
          src="../../assets/images/upload-icon.png" 
          alt="upload" 
          loading="lazy" 
        />
      </label>
      <input 
        type="file" 
        id="image" 
        hidden
        accept="image/*" 
        @change="handleUploadImage"
      />
      <label for="image" class="image">
        {{ $t('add_user.form_image_label') }} 
        <span> 
          {{ $t('add_user.optional') }} 
        </span>
      </label>
      <!-- اسم المستخدم -->
      <div class="input-wrap"> 
        <label for="name">{{ $t('add_user.form_name_label') }}</label>
        <div class="input">
          <i class="pi pi-user"></i>
          <input 
            id="name"
            type="text"
            :placeholder="$t('add_user.form_name_label')"
            v-model="body.name"
          > 
        </div>
      </div>
      <!-- اسم العميل -->
      <div class="input-wrap"> 
        <label for="userName">{{ $t('add_user.form_client_name_label') }}</label>
        <div class="input">
          <i class="pi pi-user"></i>
          <input 
            id="userName"
            type="text"
            :placeholder="$t('add_user.form_client_name_label')"
            v-model="body.userName"
          > 
        </div>
      </div>
      <!-- رقم الجوال -->
      <PhoneInput 
        :phone="body.phone"
        :country_code="body.countryCode"
        @updatePhone="body.phone = $event"
        @updateCountry="body.countryCode = $event.code"
      />
      <!-- البريد الالكتروني -->
      <div class="input-wrap"> 
        <label for="email">{{ $t('add_user.form_email_label') }}</label>
        <div class="input">
          <i class="pi pi-envelope"></i>
          <input 
            id="email"
            type="text"
            :placeholder="$t('add_user.form_email_label')"
            v-model="body.email"  
          > 
        </div>
      </div>
      <!-- كلمة المرور -->
      <div class="input-wrap"> 
        <label for="password">{{ $t('add_user.form_password_label') }}</label>
        <div class="input">
          <input 
            id="password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('add_user.form_password_label')"
            v-model="body.password"
          > 
          <i class="pi" :class="{'pi-lock': !showPassword, 'pi-lock-open': showPassword}" @click="showPassword = !showPassword"></i>
        </div>
      </div>
      <!-- تاكيد كلمة المرور -->
      <div class="input-wrap"> 
        <label for="confirm_password">{{ $t('add_user.form_confirm_password_label') }}</label>
        <div class="input">
          <input 
            id="confirm_password"
            :type="showConfirmPassword ? 'text' : 'password'"
            :placeholder="$t('add_user.form_confirm_password_label')"
            v-model="body.confirmedPassword"
          > 
          <i class="pi" :class="{'pi-lock': !showConfirmPassword, 'pi-lock-open': showConfirmPassword}" @click="showConfirmPassword = !showConfirmPassword"></i>
        </div>
      </div>
      <!-- الصلاحيات -->
      <div class="input-wrap">
        <label for="permissions">{{ $t('add_user.form_permissions_label') }}</label>
        <div class="input">
          <MulitSelectPermissions 
            :permissions="body.permissions"
            @handlePermissions="handlePermissions"
          />
        </div>
      </div>
    </div>
    <MainBtn 
      :buttonText="route.query.id ? $t('permissions.edit_btn') : $t('add_user.form_button')"
      @handleSubmit="handleUser"
    />
  </div>
</template>

<script setup>
  // define i18n 
  const { t } = useI18n()

  // define route
  const route = useRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define body 
  const body = ref({
    image: {
      url: '',
      file: null
    },
    name : '',
    userName: '',
    email: '',
    phone: '',
    countryCode: '',
    country : '',
    permissions: [],
    password: '',
    confirmedPassword: '',
  })

  // handle show password
  const showPassword = ref(false)

  // handle show confirmed password
  const showConfirmPassword = ref(false)

  // handle image upload
  const imageChanged = ref(false)
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    imageChanged.value = true;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        body.value.image = {
          file: file,
          url: URL.createObjectURL(file)
        };
      };
      reader.readAsDataURL(file);
    }
  }

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    showErrorToast
  } = useApiMethods()

  // handle permissions
  const handlePermissions = (newPermissions) => {
    body.value.permissions = newPermissions
  }


  watchEffect(()=>{
    if(getResult?.value){
      body.value.image.url = getResult?.value?.data?.avatar
      body.value.name = getResult?.value?.data?.name
      body.value.userName = getResult?.value?.data?.userName
      body.value.email = getResult?.value?.data?.email
      body.value.phone = getResult?.value?.data?.phone
      body.value.permissions = getResult?.value?.data?.permissions
    }
  })

  // handle add / edit user
  const handleUser  = () => {
    if(!body.value.name){
      showErrorToast(t('add_user.validations.name_required'))
    }
    else if(body.value.name && body.value.name.length < 2){
      showErrorToast(t('add_user.validations.name_length'))
    }
    else if(!body.value.userName){
      showErrorToast(t('add_user.validations.client_name_required'))
    }
    else if(body.value.userName && body.value.userName.length < 2){
      showErrorToast(t('add_user.validations.client_name_length'))
    }
    else if(!body.value.email){
      showErrorToast(t('add_user.validations.email_required'))
    }
    else if(!body.value.phone){
      showErrorToast(t('add_user.validations.phone_required'))
    }
    else if(!body.value.password){
      showErrorToast(t('add_user.validations.password_required'))
    }
    else if(body.value.password.length < 6){
      showErrorToast(t('add_user.validations.password_length'))
    }
    else if(!/[a-zA-Z]/.test(body.value.password)){
      showErrorToast(t('add_user.validations.password_contain_letter'))
    }
    else if(!/[!@#$%^&*(),.?":{}|<>\-_=+]/.test(body.value.password)){
      showErrorToast(t('add_user.validations.password_contain_special_character'))
    }
    else if(!body.value.confirmedPassword){
      showErrorToast(t('add_user.validations.confirm_password_required'))
    }
    else if (body.value.confirmedPassword !== body.value.password) {
      showErrorToast(t('add_user.validations.confirm_password_mismatch'))
    }
    else if(!body.value.permissions.length){
      showErrorToast(t('add_user.validations.permissions_required'))
    }
    else{
      const userFormData = new FormData()
      if(body.value.image && imageChanged.value){
        userFormData.append('avatar' , body.value.image.file)
      }
      userFormData.append('name' , body.value.name)
      userFormData.append('userName' , body.value.userName)
      if(route.query.id){
        userFormData.append('id' , route.query.id)
      }
      userFormData.append('email' , body.value.email)
      userFormData.append('phone' , body.value.phone)
      userFormData.append('countryCode' , body.value.countryCode)
      userFormData.append('password' , body.value.password)
      userFormData.append('confirmedPassword' , body.value.confirmedPassword)
      const permissionsObj = body.value.permissions.map(permission => permission.id)
      userFormData.append('permissions' , JSON.stringify(permissionsObj))
      submitMethod('users' , true , userFormData , route.query.id ?  'PATCH' : 'POST' , '/users')
    }
  }

  onMounted(()=>{
    globalStore.handlePageName(route.query.id ? t('add_user.edit_user') :  t('add_user.page_name'))
    route.query.id && getMethod(`users/${route.query.id}` , null , true , false)
  })
</script>

<style lang="scss" scoped>
  .page_content{
    background: #fff;
    border-radius: 12px;
    padding: clamp(10px , 100% , 20px);
  }
  .image_uploader{
    width: 80px;
    height: 80px;
  }
  label.image:not(.image_uploader){
    font-size: 14px;
  }
  h5{
    font-size: 14px;
    font-weight: 500;
  }
  hr{
    margin: 8px 0;
  }
  .form{
    label{
      font-size: 12px;
    }
  }
</style>