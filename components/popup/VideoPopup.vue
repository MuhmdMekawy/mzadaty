<template>
  <div>
    <div class="popup">
      <div class="content">
        <button class="pi pi-times close_btn" @click="emit('handleShowVideoPopup')">
        </button>
        <div class="image">
          <video :src="props.video" controls autoplay ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define global Store
  const globalStore = useGlobalStore()
  
  
  // define emits 
  const emit = defineEmits(['handleShowVideoPopup'])


  // define props
  const props =defineProps({
    video : {
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
      border-radius: 10px;
      overflow: hidden;
      video{
        max-height: 500px;
      }
    }
  }
</style>