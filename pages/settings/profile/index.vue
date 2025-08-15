<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <div class="form">
        <!-- رفع الصورة الشخصيه -->
        <label for="image" class="image image_label">
          {{$t('edit_profile.image_label')}}
        </label>
        <label for="image" class="image_uploader image">
          <img class="uploaded_img" v-if="body?.image" :src="imageChanged ? body?.image?.url : body?.image" alt="image" loading="lazy">
          <img v-else src="/assets/images/upload-icon.png" alt="upload" loading="lazy" />
        </label>
        <input 
          type="file" 
          id="image" 
          hidden
          accept="image/*" 
          @change="handleUploadImage"
        />
        <!-- إسم المستخدم -->
        <div class="input-wrap"> 
          <label for="name">{{ $t('register.form_name_label') }}</label>
          <div class="input">
            <i class="pi pi-user"></i>
            <input 
              id="name"
              type="text"
              :placeholder="$t('register.form_name_label')"
              v-model="body.name"
            > 
          </div>
        </div>
        <!-- البريد الالكتروني -->
        <div class="input-wrap"> 
          <label for="email">{{ $t('register.form_email_label') }} </label>
          <div class="input">
            <i class="pi pi-envelope"></i>
            <input 
              id="email"
              type="email"
              :placeholder="$t('register.form_email_label')"
              v-model="body.email"
            > 
          </div>
        </div>
        <!-- المدينة -->
        <div class="input-wrap"> 
          <label for="city_id">{{ $t('register.form_city_label') }}</label>
          <CitiesSelect 
            :country="body.country"
            :city_id="body.city_id"
            @updateCity="body.city_id = $event"
          />
        </div>
        <!-- التصنيف -->
        <div class="input-wrap"> 
          <label for="classification_id">{{ $t('register.form_classification_label') }}</label>
          <ClassificationSelect 
            :classification_id="body.classification_id"
            @updateClassification="body.classification_id =$event"
          />
          <!-- {{ [body.classification_id.map(item => item.id).join(', ')] }} -->
          <div 
            class="classification_tab" 
            v-if="body.classification_id.length > 0" 
            v-for="classification in body.classification_id"
            :key="classification.id"
          >
            <span>{{ classification?.name }}</span>
            <button class="pi pi-trash danger_btn" @click="body.classification_id.splice(body.classification_id.indexOf(classification), 1)"></button>
          </div>
        </div>
        <!-- البنك -->
        <div class="input-wrap"> 
          <label for="bank_name">{{ $t('register.form_bank_name_label') }}</label>
          <div class="input">
            <input 
              id="bank_name"
              type="text"
              :placeholder="$t('register.form_bank_name_label')"
              v-model="body.bank_name"
            > 
          </div>
        </div>
        <!-- اسم الحساب -->
        <div class="input-wrap"> 
          <label for="bank_account_name">{{ $t('register.form_bank_account_name_label') }}</label>
          <div class="input">
            <input 
              id="bank_account_name"
              type="text"
              :placeholder="$t('register.form_bank_account_name_label')"
              v-model="body.bank_account_name"
            > 
          </div>
        </div>
        <!-- رقم الحساب البنكي -->
        <div class="input-wrap"> 
          <label for="bank_account_number">{{ $t('register.form_bank_account_number_label') }}</label>
          <div class="input">
            <input 
              id="bank_account_number"
              type="text"
              :placeholder="$t('register.form_bank_account_number_label')"
              v-model="body.bank_account_number"
            > 
          </div>
        </div>
        <!-- رقم الآيبان -->
        <div class="input-wrap"> 
          <label for="bank_account_iban">{{ $t('register.form_bank_account_iban_label') }}</label>
          <div class="input">
            <input 
              id="bank_account_iban"
              type="text"
              :placeholder="$t('register.form_bank_account_iban_label')"
              v-model="body.bank_account_iban"
            > 
          </div>
        </div>
        <!-- رقم الهوية -->
        <div class="input-wrap"> 
          <label for="identity_number">{{ $t('register.form_identity_number_label') }}</label>
          <div class="input">
            <input 
              id="identity_number"
              type="text"
              :placeholder="$t('register.form_identity_number_label')"
              v-model="body.identity_number"
            > 
          </div>
        </div>
        <MainBtn 
          :buttonText="$t('edit_profile.edit_btn')"
          @handleSubmit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  // define globalStore
  const globalStore = useGlobalStore()

  // define i18n
  const { t } = useI18n()


  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    showErrorToast
  } = useApiMethods()

  // define body
  const body = ref({
    image : "",
    name : "",
    country_code : "+966",
    country : "",
    phone : "",
    email : "",
    city_id : "",
    classification_id : [],
    bank_name : "",
    bank_account_name : "",
    bank_account_number : "",
    bank_account_iban : "",
    identity_number : "",
  })

  // handle image upload
  const imageChanged = ref(false)
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    imageChanged.value = true;
    if (file && file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        body.value.image = {
          file: file,
          url: URL.createObjectURL(file)
        };
      };
      reader.readAsDataURL(file);
    } else {
      showErrorToast(t("register_validations.image_type_error"));
    }
  }

  // // handle update country
  // const updateCountry = (newCountry) =>{
  //   body.value.country = newCountry?._id
  //   body.value.country_code = newCountry?.code
  // }
  // handle submit
  const handleSubmit = () => {
    if(!body.value.name){
      showErrorToast(t("register_validations.username_required"))
    }
    else if(body.value.name && body.value.name.length < 2){
      showErrorToast(t("register_validations.username_length"))
    }
    else if(!body.value.phone){
      showErrorToast(t("register_validations.phone_required"))
    }
    else if(body.value.phone && (body.value.phone.length < 9 )){
      showErrorToast(t("register_validations.phone_length"))
    }
    else if(!body.value.city_id){
      showErrorToast(t("register_validations.city_required"))
    }
    else if(!body.value.classification_id){
      showErrorToast(t("register_validations.classification_required"))
    }
    else if(!body.value.bank_name){
      showErrorToast(t("register_validations.bank_name_required"))
    }
    else if(!body.value.bank_account_name){
      showErrorToast(t("register_validations.bank_account_name_required"))
    }
    else if(!body.value.bank_account_number){
      showErrorToast(t("register_validations.bank_account_number_required"))
    }
    else if(body.value.bank_account_number && (body.value.bank_account_number.length < 9 || body.value.bank_account_number.length > 18)){
      showErrorToast(t("register_validations.bank_account_number_length"))
    }
    else if(!body.value.bank_account_iban){
      showErrorToast(t("register_validations.bank_account_iban_required"))
    }
    else if(!body.value.identity_number){
      showErrorToast(t("register_validations.identity_number_required"))
    }
    else{
      const profileFrom = new FormData();
      if(body.value.image && imageChanged.value){
        profileFrom.append('avatar', body?.value?.image?.file);
      }
      profileFrom.append('name', body?.value?.name);
      // profileFrom.append('countryCode', body?.value?.country_code);
      // profileFrom.append('phone', body?.value?.phone);
      if(body?.value?.email){
        profileFrom.append('email', body?.value?.email);
      }
      profileFrom.append('country', body?.value?.country);
      profileFrom.append('city', body?.value?.city_id);
      const classificationObj = body?.value?.classification_id.map(item => item.id)
      profileFrom.append('classifications', JSON.stringify(classificationObj));
      profileFrom.append('bankName', body?.value?.bank_name);
      profileFrom.append('accountName', body?.value?.bank_account_name);
      profileFrom.append('accountNumber', body?.value?.bank_account_number);
      profileFrom.append('iban', body?.value?.bank_account_iban);
      profileFrom.append('nationalId', body?.value?.identity_number);
      // console.log(body?.value?.image?.file)
      // const formData = ref ({
      //   avatar: body?.value?.image?.file,
      //   name: body?.value?.name,
      //   countryCode: body?.value?.country_code,
      //   phone: body?.value?.phone,
      //   email: body?.value?.email,
      //   country: body?.value?.country,
      //   cityId: body?.value?.city_id,
      //   classifications: body?.value?.classification_id.map(item => item.id),
      //   bankName: body?.value?.bank_name,
      //   accountName: body?.value?.bank_account_name,
      //   accountNumber: body?.value?.bank_account_number,
      //   iban: body?.value?.bank_account_iban,
      //   nationalId: body?.value?.identity_number
      // })

      submitMethod('update-provider-profile' , true , profileFrom , 'PATCH' , '/profile');
    }
  }

  watchEffect(()=>{
    if(getResult?.value){
      body.value.image = getResult?.value?.data?.avatar
      body.value.name = getResult?.value?.data?.name
      body.value.country_code = getResult?.value?.data?.countryCode
      body.value.country = getResult?.value?.data?.countryId
      body.value.phone = getResult?.value?.data?.phone
      body.value.email = getResult?.value?.data?.email
      body.value.city_id = getResult?.value?.data?.cityId
      body.value.classification_id = getResult?.value?.data?.classifications
      body.value.bank_name = getResult?.value?.data?.bankName
      body.value.bank_account_name = getResult?.value?.data?.accountName
      body.value.bank_account_number = getResult?.value?.data?.accountNumber
      body.value.bank_account_iban = getResult?.value?.data?.iban
      body.value.identity_number = getResult?.value?.data?.nationalId
    }
  })

  onMounted(()=>{
    globalStore.handlePageName(t('edit_profile.page_name'))
    getMethod('profile' , null , true , false)
  })
</script>

<style lang="scss" scoped>  
  .form{
    label.image{
      cursor: pointer;
      &.image_label{
        max-width: unset !important;
        margin-bottom: 10px !important;
      }
    }
    .image_uploader{
      display: block;
      border: 2px dashed $mainColor;
      @include circle(120px);
      @include displayFlex();
      margin: 0px auto 15px;
      transition: 0.3s;
      img{
        width: 30px;
        object-fit: contain ;
      }
      .uploaded_img{
        object-fit: cover ;
        width: 100% !important;
      }
      &:hover{
        background: rgba($color: $mainColor, $alpha: 0.4);
      }
    }
    label.image:not(.image_uploader){
      text-align: center;
      width: 100%;
      display: block;
      text-wrap-mode: nowrap;
      span{
        color: $secColor;
      }
    }
  }
  .classification_tab{
    @include displayFlex($justify : space-between);
    margin-top: 10px;
    span{ 
      font-size: 14px;
      font-weight: 400;
    }
    button.pi-trash{
      color: $dangerColor;
    }
  }
</style>