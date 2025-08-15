<template>
  <!-- رقم الجوال -->
  <div class="input-wrap"> 
    <label for="phone">{{ $t('login.form_phone_label') }}</label>
    <div class="input">
      <i class="pi pi-mobile"></i>
      <input 
        id="phone"
        type="number"
        :placeholder="$t('login.form_phone_label')"
        :value="props.phone"
        @change="emit('updatePhone' , $event.target.value)"
        @keydown.prevent.enter="emit('updatePhone' , $event.target.value)"
      > 
      <CountriesSelect 
        @updateCountry="emit('updateCountry' , $event)"
      />
    </div>
  </div>
</template>

<script setup>
  // define props
  const props = defineProps({
    phone : {
      type : String,
      default : ""
    },
  })

  // define emits 
  const emit = defineEmits(['updatePhone' , 'updateCountry'])
</script>

<style lang="scss" scoped>
  .form .input-wrap .input{
    border: 0.5px solid #E6E6E6 !important;
    margin-top: 8px;
    input{
      width: 100% !important; 
    }
  }
</style>

<!-- HOW TO IMPORT AND HOW TO PASS  -->

<!-- 
  <PhoneInput 
    :phone="YOUR TARGRET VALUE => body.phone"
    :country_code="YOUR TARGRET VALUE => body.countryCode"
    @updatePhone="YOUR FUNCTION => body.phone = $event"
    @updateCountry="YOUR FUNCTION => body.countryCode = $event"
  />
-->