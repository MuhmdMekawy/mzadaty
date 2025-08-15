<template>
  <div class="authentication_page">
    <div class="auth_page">
      <div class="content">
        <div class="image">
          <img src="../../assets/images/logo.png" alt="logo" loading="lazy" />
        </div>
        <div class="form">
          <div class="head centered">
            <h3>{{ $t('register.page_title') }}</h3>
            <p>{{ $t('register.form_head_title') }}</p>
          </div>
          <!-- رفع الصورة الشخصيه -->
          <label for="image" class="image_uploader image">
            <img class="uploaded_img" v-if="body?.image" :src="body?.image?.url" alt="image" loading="lazy">
            <img v-else src="../../assets/images/upload-icon.png" alt="upload" loading="lazy" />
          </label>
          <input 
            type="file" 
            id="image" 
            hidden
            accept="image/*" 
            @change="handleUploadImage"
          />
          <label for="image" class="image">{{ $t('register.form_image_label') }} <span> {{ $t('register.optional') }} </span></label>
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
          <!-- رقم الجوال -->
          <PhoneInput 
            :phone="body.phone"
            :country_code="body.country_code"
            @updatePhone="body.phone = $event"
            @updateCountry="updateCountry"
          />
          <!-- البريد الالكتروني -->
          <div class="input-wrap"> 
            <label for="email">{{ $t('register.form_email_label') }} <span> {{ $t('register.optional') }} </span></label>
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
          <!-- كلمة المرور -->
          <div class="input-wrap"> 
            <label for="password">{{ $t('register.form_password_label') }}</label>
            <div class="input">
              <input 
                id="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('register.form_password_label')"
                v-model="body.password"
              > 
              <i class="pi" :class="{'pi-lock': !showPassword, 'pi-lock-open': showPassword}" @click="showPassword = !showPassword"></i>
            </div>
          </div>
          <!-- تاكيد كلمة المرور -->
          <div class="input-wrap"> 
            <label for="confirm_password">{{ $t('register.form_confirm_password_label') }}</label>
            <div class="input">
              <input 
                id="confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                :placeholder="$t('register.form_confirm_password_label')"
                v-model="body.confirm_password"
              > 
              <i class="pi" :class="{'pi-lock': !showConfirmPassword, 'pi-lock-open': showConfirmPassword}" @click="showConfirmPassword = !showConfirmPassword"></i>
            </div>
          </div>
          <!-- التصنيف -->
          <div class="input-wrap"> 
            <label for="classification_id">{{ $t('register.form_classification_label') }}</label>
          <ClassificationSelect 
            :classification_id="body.classification_id"
            @updateClassification="body.classification_id = $event"
          />
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
          <!-- الشروط والاحكام -->
          <div class="input-wrap"> 
            <div class="input">
              <input 
                id="terms"
                type="checkbox"
                v-model="body.terms"
              > 
              <label class="terms">
                {{ $t('register.form_terms_label') }} 
                <NuxtLink @click="showTermsPopup = true">
                  {{ $t('register.form_terms_link') }}
                </NuxtLink>
              </label>
            </div>
          </div>
          <MainBtn 
            :buttonText="$t('login.form_button')"
            @handleSubmit="handleSubmit"
          />
          <p>
            {{ $t('register.form_login_link') }} 
            <NuxtLink :to="localeRoute('/auth/login')">
              {{ $t('register.form_login') }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
    <TermsPopup 
      v-if="showTermsPopup"
      @closeTermsPopup="showTermsPopup = false"
    />
  </div>
</template>

<script setup>
  // define i18n
  const { t } = useI18n()

  // define locale route
  const localeRoute = useLocaleRoute()

  definePageMeta({
    layout : false
  })

  // handle terms popup
  const showTermsPopup = ref(false)

  // define api methods
  const {
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
    password : "",
    confirm_password : "",
    classification_id : [],
    bank_name : "",
    bank_account_name : "",
    bank_account_number : "",
    bank_account_iban : "",
    identity_number : "",
    terms : false,
  })

  // define password show
  const showPassword = ref(false)

  // define confirm password show
  const showConfirmPassword = ref(false)

  // handle image upload
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
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
      showErrorToast(t("register_validations.image_type_error"))
    }
  }

  // handle update country
  const updateCountry = (newCountry) =>{
    body.value.country = newCountry?._id
    body.value.country_code = newCountry?.code
  }

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
    else if(!body.value.password){
      showErrorToast(t("register_validations.password_required"))
    }
    else if(!body.value.confirm_password){
      showErrorToast(t("register_validations.confirm_password_required"))
    }
    else if(body.value.password !== body.value.confirm_password){
      showErrorToast(t("register_validations.password_mismatch"))
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
    else if(!body.value.terms){
      showErrorToast(t("register_validations.terms_required"))
    }else{
      const registerForm = new FormData();
      if(body.value.image){
        registerForm.append('avatar', body?.value?.image?.file);
      }
      registerForm.append('name', body?.value?.name);
      registerForm.append('countryCode', body?.value?.country_code);
      registerForm.append('phone', body?.value?.phone);
      if(body?.value?.email){
        registerForm.append('email', body?.value?.email);
      }
      registerForm.append('country', body?.value?.country);
      registerForm.append('city', body?.value?.city_id);
      registerForm.append('password', body?.value?.password);
      registerForm.append('confirmedPassword', body?.value?.confirm_password);
      const classificationObj = body?.value?.classification_id.map(item => item.id)
      registerForm.append('classifications', JSON.stringify(classificationObj));
      // registerForm.append('classifications' ,typeof(body?.value?.classification_id) == 'object' ? JSON.stringify([body?.value?.classification_id[0]?.id]) : [body?.value?.classification_id]);
      registerForm.append('bankName', body?.value?.bank_name);
      registerForm.append('accountName', body?.value?.bank_account_name);
      registerForm.append('accountNumber', body?.value?.bank_account_number);
      registerForm.append('iban', body?.value?.bank_account_iban);
      registerForm.append('nationalId', body?.value?.identity_number);

      submitMethod('signup-provider' , false , registerForm , 'POST' , '/');
    }
  }
</script>

<style lang="scss" scoped>  
  label.terms{
    cursor: pointer;
  }
</style>