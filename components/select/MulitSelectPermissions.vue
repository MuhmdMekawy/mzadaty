<template>
  <div 
    class=" card flex justify-center w-full"
  >
    <MultiSelect 
      v-model="selectedPermissions" 
      :options="getResult?.data" 
      optionLabel="title" 
      filter 
      :placeholder="$t('permissions.permissions_placeholder')"
      class="w-full" 
      @change="emit('handlePermissions', selectedPermissions)"
    />
    <div class="selected-sections" v-if="selectedPermissions?.length > 0">
      <span v-for="permission in selectedPermissions" :key="permission?.id">
        {{ permission?.title }}
        <button class="pi pi-times" @click="removePermission(permission?.id)"></button>
      </span>
    </div>  
  </div>
</template>

<script setup>
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define route 
  const route = useRoute()

    // define props
    const props = defineProps({
      permissions : Object
    })

  const selectedPermissions = ref('');

  const removePermission = (id) => {
    selectedPermissions.value = selectedPermissions?.value?.filter(permission => permission.id != id);
    emit('handlePermissions', selectedPermissions.value)
  };

  // define emits 
  const emit = defineEmits(['handlePermissions'])

  onMounted(()=>{
    if(route.path.startsWith('/users') || route.path.startsWith('/en/users')) {
      getMethod('permissions' , '' , true , false)
    }else{
      getMethod('permissions/dynamic' , '' , true , false)
    }
  })
  
  watchEffect(()=>{
    if(props.permissions && props.permissions.length > 0) {
      selectedPermissions.value = props.permissions;
    }
  })
</script>


<style lang="scss" scoped>
  .input{
    display: flex;
    justify-content: flex-start;
    height: 50px !important; 
    position: relative; 
    // margin-bottom: 0 !important;
  }

  .multiSelect_placeholder{
    position: absolute;
    bottom: 0px;
    color: #6c757da6;
    z-index: 999;
  }
  .selected-sections {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    position: absolute;
    inset-inline-start: 0;
    top: 50%;
    transform: translateY(-50%);
    max-width: 90%;
    width: fit-content;
    height: 32px;
    overflow-y: scroll;
    padding-inline-start: 5px;
    span{
      background: #F2F2F2;
      border: 0.5px solid #F2F2F2;
      border-radius: 15px;
      color: $mainColor;
      padding: 0px 10px;
      padding-inline-end: 25px;
      position: relative;
      @include displayFlex();
      font-size: 11px;
      font-weight: 400;
      .pi-times{
        position: absolute;
        inset-inline-end: 5px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 7px;
        @include circle(15px);
        color: $dangerColor;
        background: #fff;
        @include displayFlex();
        border: 1px solid $dangerColor;
      }
    }
  }

  .input{
    // border-radius: 0;
    width: 100%;
    // margin-block-start: 10px;
    // margin-bottom: 18px;
  }

  input{
    border: none;
  }

  .p-multiselect{
    width: 100%;
    padding-inline: 5px;
    height: 35px;
    border: none;

  }


  .selected-item {
    display: flex;
    align-items: center;
    background-color: #E0BDB0;
    color: $mainColor;
    border-radius: 25px;
    padding: 5px 10px 0;
    position: relative;
    // padding-inline-end: 20px;
  }

  .remove-btn {
    border: none;
    cursor: pointer;
    font-size: 8px;
    font-weight: bold;
    position: absolute;
    left: -5px;
    top: 0px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    color: #fff;
    padding: 2px;
    @include displayFlex();
    .pi{
      font-size: 9px;
      color: #fff;
      margin-bottom: 0;
    }
  }
</style>

