<template>
  <div>
    <ul class="static_page page filter_tabs" v-if="!globalStore.loading">
      <li 
        :class="['status_tab ' , {active : finanicialStatus == 'due'}]" 
        @click="$emit('handleFinancialStatus', 'due')">
        {{ $t('transaction_statuses.due') }}
      </li>
      <li 
        :class="['status_tab ' , {active : finanicialStatus == 'new'}]" 
        @click="$emit('handleFinancialStatus', 'new')">
        {{ $t('transaction_statuses.new') }}
      </li>
      <li 
        :class="['status_tab ' , {active : finanicialStatus == 'finished'}]" 
        @click="$emit('handleFinancialStatus', 'finished')">
        {{ $t('transaction_statuses.finished') }}
      </li>
    </ul>
    <ul class="static_page page filter_tabs" v-else>
      <Skeleton width="100%" height="40px" v-for="i in 3" :key="i" />
    </ul>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()


  // define props
  const props = defineProps({
    finanicialStatus: {
      type: String,
      default: 'due'
    }
  })

  // define emits 
  const emit = defineEmits(['handleFinancialStatus'])
</script>

<style lang="scss" scoped>

</style>