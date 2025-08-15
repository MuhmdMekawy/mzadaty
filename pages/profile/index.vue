<template>
  <div :class="['static_pages', {mini_width : globalStore.showSideBar}]">
    <div class="static_page page" v-if="!globalStore?.loading">
      <div class="image" @click="globalStore.handleShowImagePopup(getResult?.data?.avatar)">
        <img :src="getResult?.data?.avatar" alt="image" loading="lazy">
      </div>
      <div class="form">
        <label for="name">{{ $t('profile.name_label') }}</label>
        <div class="input">
          <i class="pi pi-user"></i>
          <input 
            disabled
            type="text"
            id="name"
            :placeholder="getResult?.data?.name"
          >
        </div>
        <label for="phone">{{ $t('profile.phone_label') }}</label>
        <div class="input">
          <i class="pi pi-mobile"></i>
          <input 
            disabled
            type="text"
            id="phone"
            :placeholder="`${getResult?.data?.phone} ${getResult?.data?.countryCode}`"
          >
        </div>
        <label for="email">{{ $t('profile.email_label') }}</label>
        <div class="input">
          <i class="pi pi-envelope"></i>
          <input 
            disabled
            type="email"
            id="email"
            :placeholder="getResult?.data?.email"
          >
        </div>
        <label for="city">{{ $t('profile.city_label') }}</label>
        <div class="input">
          <i class="pi pi-building"></i>
          <input 
            disabled
            type="text"
            id="city"
            :placeholder="getResult?.data?.cityText"
          >
        </div>
        <label for="classification">{{ $t('profile.classification_label') }}</label>
        <div class="input classification_input">
          <span
            v-for="item in getResult?.data?.classifications" :key="item?.id"
          >
            {{item?.name}}
          </span>
        </div>
        <label for="bank_name">{{ $t('profile.bank_name_label') }}</label>
        <div class="input">
          <input 
            disabled
            type="text"
            id="bank_name"
            :placeholder="getResult?.data?.bankName"
          >
        </div>
        <label for="bank_account_name">{{ $t('profile.bank_account_name_label') }}</label>
        <div class="input">
          <input 
            disabled
            type="text"
            id="bank_account_name"
            :placeholder="getResult?.data?.accountName"
          >
        </div>
        <label for="bank_account_number">{{ $t('profile.bank_account_number_label') }}</label>
        <div class="input">
          <input 
            disabled
            type="text"
            id="bank_account_number"
            :placeholder="getResult?.data?.accountNumber"
          >
        </div>
        <label for="bank_account_iban">{{ $t('profile.bank_account_iban_label') }}</label>
        <div class="input">
          <input 
            disabled
            type="text"
            id="bank_account_iban"
            :placeholder="getResult?.data?.iban"
          >
        </div>
        <label for="identity_number">{{ $t('profile.identity_number_label') }}</label>
        <div class="input">
          <input 
            disabled
            type="text"
            id="identity_number"
            :placeholder="getResult?.data?.nationalId"
          >
        </div>
      </div>
    </div>
    <div class="static_page page" v-else>
      <div class="image">
        <Skeleton width="200px" height="200px" />
      </div>
      <div class="form" v-for="i in 10" :key="i">
        <label style="margin-bottom: 10px;">
          <Skeleton width="100%" height="40px" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define i18n
  const {t} = useI18n()


  // define globalStore
  const globalStore = useGlobalStore()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    globalStore.handlePageName(t('sidebar.profile'));
    getMethod('profile' , '' , true , false)
  })
</script>

<style lang="scss" scoped>
  label {
    font-size: 14px;
    font-weight: 400;
    display: block;
  }
  .image{
    max-width: unset;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid $secColor;
    cursor: pointer;
  }
  .input{
    @include displayFlex($gap : 5px);
    padding: 2px 8px;
    &:not(:last-of-type){
      margin-bottom: 15px;
    }
    input{
      font-size: 12px;
    }
    &.classification_input{
      justify-content: flex-start;
      height: 32px;
      flex-wrap: wrap;
      overflow-y: scroll;
      span{
        font-size: 14px;
        font-weight: 200;
        color: $secColor;
        display: inline-block;
        &:not(:last-of-type){
          &::after{
            content: ' - ';
          }
        }
      }

    }
  }
</style>