<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page page">
      <h5>{{ $t('add_permission.page_title') }}</h5>
      <hr>
      <div class="form">
        <!-- اسم الصلاحيه -->
        <div class="input-wrap">
          <label for="permission_name">{{ $t('add_permission.form_name_label') }}</label>
          <div class="input">
            <i class="pi pi-sitemap"></i>
            <input 
              type="text"
              id="permission_name"
              :placeholder="$t('add_permission.form_name_label')"
              v-model="body.name"
            >
          </div>
        </div>
        <!-- الصلاحيات -->
        <div class="input-wrap">
          <label for="permissions">{{ $t('add_permission.form_permissions_label') }}</label>
          <div class="input">
            <MulitSelectPermissions 
              :permissions="body.permissions"
              @handlePermissions="handlePermissions"
            />
          </div>
        </div>
      </div>
      <MainBtn 
        :buttonText="route.query.id ? $t('permissions.edit_btn') : $t('add_permission.form_button')"
        @handleSubmit="handlePermission"
      />
    </div>
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
    id : route.query.id,
    name : '',
    permissions : []
  })

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    showErrorToast
  } = useApiMethods()

  const handlePermissions = (newPermissions) => {
    body.value.permissions = newPermissions
  }

  watchEffect(()=>{
    if(getResult?.value){
      body.value.name = getResult?.value?.data?.title
      body.value.permissions = getResult?.value?.data?.properties
    }
  })

  // handle add permission
  const handlePermission  = () => {
    if(!body.value.name){
      showErrorToast(t('add_permission.validations.name_required'))
    }else if(!body.value.permissions.length){
      showErrorToast(t('add_permission.validations.permissions_required'))
    }else{
      submitMethod(route.query.id ? 'permissions' : 'permissions/add' , true , body.value , route.query.id ? 'PATCH' : 'POST' , '/permissions')
    }
  }

  onMounted(()=>{
    route.query.id && getMethod(`permissions/${route.query.id}` , null , true , false)
  })
</script>

<style lang="scss" scoped>
  h5{
    font-size: 14px;
    font-weight: 500;
  }
  hr{
    margin: 8px 0;
  }
</style>