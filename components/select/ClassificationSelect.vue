<template>
  <div class="input card flex justify-center w-full">
    <MultiSelect 
      v-model="selectedClassifications" 
      :options="getResult?.data" 
      optionLabel="name" 
      optionValue="id"
      :placeholder="!props.classification_id.length ? $t('register.form_classification_label') : ''"
      class="w-full" 
      @change="handleChange"
      v-if="!useGlobalStore().loading"
      />
    <Skeleton v-else width="100%" height="37px" />
    <!-- Display selected names as chips -->
    <div class="selected-sections">
      <span v-for="(id, index) in selectedClassifications" :key="index">
        {{ getClassificationName(id) }}
        <button 
          class="pi pi-times" 
          @click="removeClassification(id)"
        ></button>
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

  // define props
  const props = defineProps({
    classification_id: {
      type: Array,
      default: () => []
    }
  })

  // define emits
  const emit = defineEmits(['updateClassification'])

  const selectedClassifications = ref([])

  // // Initialize with prop values
  // watch(() => props.classification_id, (newVal) => {
  //   selectedClassifications.value = newVal.map(item => item.id || item)
  // }, { immediate: true })


  watchEffect(()=>{
    if(props.classification_id) {
      selectedClassifications.value = props.classification_id.map(item => item.id || item)
    }
  })

  const getClassificationName = (id) => {
    return getResult?.value?.data.find(item => item.id === id)?.name || ''
  }

  const handleChange = () => {
    const selectedClassification = getResult?.value?.data
      .filter(item => selectedClassifications.value.includes(item.id))
    emit('updateClassification', selectedClassification)
  }

  const removeClassification = (id) => {
    selectedClassifications.value = selectedClassifications.value.filter(itemId => itemId != id)
    const remainingClassifications = getResult?.value?.data
      .filter(item => selectedClassifications.value.includes(item.id))
    emit('updateClassification', remainingClassifications)
  }

  onMounted(() => {
    getMethod('classifications', '', false, false)
  })
</script>

<style lang="scss" scoped>
/* Your existing styles remain the same */
.input{
  display: flex;
  justify-content: flex-start;
  height: 40px !important; 
  position: relative;
}

.selected-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  position: absolute;
  inset-inline-start: 0;
  bottom: 5px;
  width: 95%;
  height: 30px;
  overflow-y: scroll;
  padding-inline-start: 5px;
  box-shadow:none;
  
  span{
    background: rgba($color: $secColor, $alpha: 0.4);
    border-radius: 5px;
    font-size: 12px;
    font-weight: 400;
    color: $mainColor;
    padding: 5px 10px;
    padding-inline-end: 25px;
    position: relative;
    @include displayFlex();
    height: 30px;
    
    .pi-times{
      position: absolute;
      inset-inline-end: 5px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 8px;
      @include circle(15px);
      background: $dangerColor;
      color: #fff;
    }
  }
}

.p-multiselect{
  width: 100%;
  padding-inline: 5px;
  height: 35px;
  border: none;
}
</style>