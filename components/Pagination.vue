<template>
  <div class="pagination" v-if="props.data && props.data?.lastPage != 1">
    <div class="card">
      <Paginator 
        :rows="Number(props.data.perPage)" 
        :totalRecords="props.data.total"
        :page="Number(props.data.currentPage)"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
  import Paginator from 'primevue/paginator';

  // Define emits
  const emit = defineEmits(['handlePagination']);

  // define api methods
  const {
    getMethod
  } = useApiMethods()

  // Define props
  const props = defineProps({
    data: {
      type: Object,
      default: () => null,
    },
    endPoint : String
  });

  // Handle changes in page number of pagination
  const onPageChange = (event) => {
    // console.log(event.page)
    getMethod(props.endPoint , event.page + 1 , true , false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });  
  };
</script>

<style lang="scss" scoped>
  .pagination{
    margin-block-start: 30px;
  }
</style>


<!-- HOW TO IMPORT AND WHAT DATA TO PASS -->

  <!-- 
    <Pagination 
    :data="getResult?.paginatie"
    :endPoint="'EndPoint'"
    />
  -->