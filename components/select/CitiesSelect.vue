<template>
  <div class="input">
    <select 
      v-if="getResult"
      id="city_id" 
      :value="props.city_id" 
      @change="emit('updateCity', $event.target.value)"
    >
      <option value="">{{ $t('register.form_city_label') }}</option>
      <option 
        v-for="city in getResult?.data"
        :key="city?._id"
        :value="city?._id"
      >
        {{city?.name}}
      </option>
    </select>
    <Skeleton v-else height="30px" />
  </div>
</template>

<script setup>
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define props
  const props = defineProps({
    country : {
      type : String,
      default : ""
    },
    city_id : {
      type : String,
      default : ""
    },
  })

  // define emits
  const emit = defineEmits(['updateCity'])

  watchEffect(()=>{
    props.country && getMethod(`cities?countryId=${props.country}` , null , false , false)
  })
</script>

<style lang="scss" scoped>

</style>