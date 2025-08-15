<template>
  <div class="input-wrap">
    <label :for="props.type">{{ props.label }}</label>
    <div class="input">
      <select 
        :name="props.type"
        :id="props.type"
        :value="selectValue"
        @change="emit('handleChange' , $event.target.value)"
      >   
        <option value="">{{ props.label }}</option>
        <option
          v-for="item in getResult?.data?.[globalStore.auctionData.classification == 'variousAuction' ? globalStore.auctionData.classification + 's' + props.type.charAt(0).toUpperCase() + props.type.slice(1) : globalStore.auctionData.classification + props.type.charAt(0).toUpperCase() + props.type.slice(1)]"
          :value="item.id"
          :key="item.id"
          >
          {{item?.name}}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()


  // define props
  const props = defineProps({
    label : String,
    type : String,
    selectValue : String
  })

  const selectValue = ref(props.selectValue)

  watchEffect(()=>{
    if(props.selectValue){
      selectValue.value = props.selectValue
    }
  })


  // define emits
  const emit = defineEmits(['handleChange'])


  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    getMethod(`drop-downs?type=${globalStore.auctionData.classification}` , null , false , false)
  })
</script>

<!-- HOW TO USE THE COMPONENT -->

<!-- 
  <AuctionSelect
    :label="label"
    :type="type"
    :selectValue="selectValue"
    @handleChange="handleSelectChange"
  />
-->