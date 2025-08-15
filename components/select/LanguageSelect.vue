<template>
  <div class="input">
    <select 
      :value="globalStore.lang"
      @change="updateLang($event.target.value)"
      >
      <option value="ar">العربية</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script setup>
  // define api Methods
  const {
    submitMethod
  } = useApiMethods()

  // define globalStore
  const globalStore = useGlobalStore()

  // define updateLang
  const updateLang = (newLang) => {
    globalStore.setLang(newLang);
    submitMethod('change-language' , true , {deviceId : globalStore.device_id} , 'PATCH' , '')
  }
</script>

<style lang="scss" scoped>
  .input {
    padding: 4px 10px;
    border-color: $mainColor;
    select{
      color: $mainColor;
      cursor: pointer;
    }
  }
</style>
