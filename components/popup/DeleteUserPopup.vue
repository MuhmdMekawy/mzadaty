<template>
  <div class="popup">
    <div class="content">
      <!-- <button class="close_btn pi pi-times"></button> -->
      <h3 class="title centered">
        {{ $t('delete_user.text') }}
      </h3>
      <hr>
      <div class="image">
        <img v-if="route.path.endsWith('/settings')" src="/assets/images/delete_account.png" alt="img" loading="lazy">
        <img v-else src="/assets/images/delete_user.png" alt="image" loading="lazy">
      </div>
      <div class="flex_buttons">
        <button class="main-btn danger" @click="emit('handleDeleteUser')">
          {{ $t('delete_user.confirm') }}
        </button>
        <button class="main-btn reversed" @click="emit('handleShowDeleteUser')">
          {{ $t('delete_user.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define emits
  const emit = defineEmits(['handleShowDeleteUser', 'handleDeleteUser'])

  // define route 
  const route = useRoute()
</script>

<style lang="scss" scoped>
  .popup{
    .content{
      .image{
        max-width: 320px;
        margin: 20px auto 0;
      }
      h3.title{
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .flex_buttons{
        .main-btn{
          margin-top: 0;
        }
      }
    }
  }
</style>  