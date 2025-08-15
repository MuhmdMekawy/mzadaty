<template>
  <div>
    <div class="popup">
      <div class="content">
        <button class="pi pi-times close_btn" @click="globalStore.handleShowImagePopup(null)">
        </button>
        <div class="image">
          <img :src="globalStore.imageSrc" alt="image" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define global Store
  const globalStore = useGlobalStore()
  
  
  // define emits 
  const emit = defineEmits(['handleShowImagePopup'])
  // define props
  const props =defineProps({
    image : {
      type : String,
      default : ""
    }
  })
</script>

<style lang="scss" scoped>
  .popup .close_btn{
    left: 12px;
    top: 12px;
  }
  .popup .content {
    border-radius: 15px !important;
    padding: 10px !important;
    .image{
      margin-bottom: 0 !important;
      max-width: unset !important;
      border-radius: 12px !important;
      overflow: hidden;
      img{
        object-fit: contain;
        max-height: 500px;
      }
    }
  }
</style>