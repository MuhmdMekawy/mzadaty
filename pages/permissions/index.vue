<template>
  <div :class="['page_content' , {minimized : globalStore.showSideBar}]">
    <NuxtLink :to="localeRoute('/permissions/modify')" class="add_permission_btn main-btn reversed">
      <i class="pi pi-sitemap"></i>
      <span>{{ $t('permissions.add_btn') }}</span>
    </NuxtLink>
    <div class="grid_content">
      <div class="tab" v-for="i in 18" v-if="globalStore?.loading">
        <div class="info">
          <h3>
            <Skeleton width="100px" height="14px" style="margin-bottom: 4px;"/>
          </h3>
          <h4>
            <Skeleton width="200px" height="20px" />
          </h4>
          <ul>
            <li v-for="i in 3">
              <Skeleton width="50px" height="10px" />
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
            <i class="pi pi-sitemap"></i>
            <span>{{item?.title}}</span>
          </h3>
          <h4>
            {{ $t('permissions.partners') }}
          </h4>
          <ul>
            <li v-for="property in item?.properties" :key="property?.id">
              {{property?.title}}
            </li>
          </ul>
        </div>
        <div class="permission_control">
          <NuxtLink :to="localeRoute(`/permissions/modify?id=${item.id}`)" class="main-btn reversed">
            <i class="pi pi-user-edit"></i>
            <span>{{ $t('permissions.edit_btn') }}</span>
          </NuxtLink>
          <button class="main-btn danger reversed" @click="handleDeletePermission(item?.id)">
            <i class="pi pi-trash"></i>
            <span>{{ $t('permissions.delete_btn') }}</span>
          </button>
        </div>
      </div>
    </div>
    <Empty v-if="!globalStore?.loading && getResult?.data?.length == 0" />
    <Pagination 
      :data="getResult?.paginate"
      :end-point="'permissions'"
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
  } = useApiMethods()

  // handle delete permission
  const handleDeletePermission = (itemID) =>{
    submitMethod(`permissions/${itemID}` , true , '' , 'DELETE' , '' , 'permissions')
  }

  onMounted(()=>{
    globalStore.handlePageName(t('permissions.page_name'))
    getMethod('permissions' , 1 , true , false)
  })
</script>

<style lang="scss" scoped></style>