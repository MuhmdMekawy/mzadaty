<template>
  <div :class="['page_content' , {minimized : globalStore.showSideBar}]">
    <NuxtLink :to="localeRoute('/users/modify')" class="add_permission_btn main-btn reversed">
      <i class="pi pi-users"></i>
      <span>{{ $t('users.add_btn') }}</span>
    </NuxtLink>
    <div class="grid_content">
      <div class="tab" v-for="i in 18" v-if="globalStore?.loading">
        <div class="info">
          <h3>
            <Skeleton width="100px" height="14px" style="margin-bottom: 4px;"/>
          </h3>
          <h4>
            <Skeleton width="150px" height="20px" />
          </h4>
          <ul>
            <li v-for="i in 3">
              <Skeleton width="20px" height="10px" />
            </li>
          </ul>
        </div>
        <div class="permission_control">
          <Skeleton width="80px" height="30px" style="margin-bottom: 4px;"/>
          <Skeleton width="80px" height="30px"/>
        </div>
      </div>
      <div 
        class="tab" 
        v-for="item in getResult?.data" 
        :key="item.id"  
        v-else-if="!globalStore?.loading && getResult?.data?.length > 0"
      >
        <div class="info">
          <h3>
            <i class="pi pi-users"></i>
            <span>{{ $t('users.name') }}</span>
          </h3>
          <h4>
            {{item.name}}
          </h4>
          <h3>
            <i class="pi pi-lock"></i>
            <span>{{ $t('users.password') }}</span>
          </h3>
          <h4>
            {{item.password}}
          </h4>
          <ul>
            <li v-for="property in item?.properties" :key="property?.id">
              {{property?.title}}
            </li>
          </ul>
        </div>
        <div class="permission_control">
          <NuxtLink :to="localeRoute(`/users/modify?id=${item.id}`)" class="main-btn reversed">
            <i class="pi pi-user-edit"></i>
            <span>{{ $t('users.edit_btn') }}</span>
          </NuxtLink>
          <button class="main-btn danger reversed" @click="handleShowDeleteUserPopup(item?.id)">
            <i class="pi pi-trash"></i>
            <span>{{ $t('users.delete_btn') }}</span>
          </button>
        </div>
      </div>
    </div>
    <Empty v-if="!globalStore?.loading && getResult?.data?.length == 0" />
    <Pagination 
      :data="getResult?.paginate"
      :end-point="'users'"
    />
    <DeleteUserPopup 
      v-if="showDeleteUserPopup"
      @handleShowDeleteUser="showDeleteUserPopup = false"
      @handleDeleteUser="handleDeleteUser"
    />
  </div>
</template>

<script setup>
  // define i18n 
  const { t } = useI18n()

  // define global store 
  const globalStore = useGlobalStore()

  // define locale route 
  const localeRoute = useLocaleRoute()

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    submitResult
  } = useApiMethods()

  // handle delete user
  const userID = ref('')
  const showDeleteUserPopup = ref(false)
  const handleShowDeleteUserPopup = (user)=> {
    userID.value = user
    if(!showDeleteUserPopup.value) {
      showDeleteUserPopup.value = true
    }else {
      showDeleteUserPopup.value = false
    }
  }
  const handleDeleteUser = () =>{
    submitMethod(`users/${userID.value}` , true , '' , 'DELETE' , '' , 'users')
  }


  watchEffect(()=>{
    if(getResult?.value?.data){
      showDeleteUserPopup.value = false
    }
  })

  onMounted(()=>{
    globalStore.handlePageName(t('users.page_name'))
    getMethod('users' , 1 , true , false)
  })
</script>

<style lang="scss" scoped></style>