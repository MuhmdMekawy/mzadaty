<template>
  <div :class="['static_pages', {mini_width : globalStore.showSideBar}]">
    <div class="static_page page settings_page">
      <NuxtLink :to="localeRoute('/settings/profile')">
        <i class="pi pi-user-edit"></i>
        <span>{{ $t('settings.profile') }}</span>
        <i :class="'pi pi-angle-' + (globalStore.lang == 'ar' ? 'left' : 'right')"></i>
      </NuxtLink>
      <NuxtLink :to="localeRoute('/settings/password')">
        <i class="pi pi-lock"></i>
        <span>{{ $t('settings.password') }}</span>
        <i :class="'pi pi-angle-' + (globalStore.lang == 'ar' ? 'left' : 'right')"></i>
      </NuxtLink>
      <NuxtLink :to="localeRoute('/settings/phone')">
        <i class="pi pi-mobile"></i>
        <span>{{ $t('settings.phone') }}</span>
        <i :class="'pi pi-angle-' + (globalStore.lang == 'ar' ? 'left' : 'right')"></i>
      </NuxtLink>
      <NuxtLink @click="handleIsNotify">
        <i class="pi pi-bell"></i>
        <span>{{ $t('settings.notifications') }}</span>
        <InputSwitch v-model="authStore.userData.isNotify"/>
      </NuxtLink>
      <button class="delete_account" @click="showDeleteUserPopup = true">
        <i class="pi pi-trash"></i>
        <span>{{ $t('settings.delete_account') }}</span>
      </button>
    </div>
    <DeleteUserPopup 
      v-if="showDeleteUserPopup"
      @handleDeleteUser="handleDeleteAccount"
      @handleShowDeleteUser="showDeleteUserPopup = false"
    />
  </div>
</template>

<script setup>
  import InputSwitch from 'primevue/inputswitch';

  // define i18n
  const { t } = useI18n()

  // define globalStore
  const globalStore = useGlobalStore()

  // define auth store
  const authStore = useAuthStore()

  // define locale route 
  const localeRoute = useLocaleRoute()
  

  // handle show delete user popup
  const showDeleteUserPopup = ref(false)
  

  // define apimethods
  const {
    submitMethod
  } = useApiMethods()

  // handle is notify 
  const handleIsNotify = () => {
    submitMethod('notify' , true , null , 'PATCH' , '')
  }

  // define handle delete account
  const handleDeleteAccount = () =>{
    useCookie('globalStore').value = ''
    useCookie('authStore').value = ''
    useCookie('i18n_redirected').value = ''
    submitMethod('delete-account' , true , '' , 'DELETE' , '/auth/register')
  }

  onMounted(()=>{
    globalStore.handlePageName(t('sidebar.settings'))
  })
</script>

<style lang="scss" scoped>
  a{
    @include displayFlex($justify : flex-start , $gap : 8px);
    position: relative;
    span{
      font-size: 12px;
    }
    &:not(:last-of-type){
      padding-block-end: 18px;
    }
    .pi-angle-left,
    .pi-angle-right{
      margin-inline-start: auto;
      color: $secColor;
    }
  }

  button.delete_account{
    max-width: 200px;
    width: 100%;
    margin: 30px auto 0;
    color: $dangerColor;
    @include displayFlex($justify : center , $gap : 4px);
    font-size: 14px;
    padding-block: 10px;
    border-radius: 5px;
    i.pi{
      font-size: 14px;
    }
    &:hover{
      background-color: $dangerColor;
      color: #fff;
    }
  }
</style>