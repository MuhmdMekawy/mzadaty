<template>
  <div class="popup">
    <div class="content">
      <div class="image">
        <img src="/assets/images/products_number.png" alt="image" loading="lazy">
      </div>
      <div class="head centered">
        <h3 class="title">
          {{$t('add_auction.minimum_products_popup_title')}}
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .popup{
    .content{
      .image{
        max-width: 300px;
      }
      .head.centered{
        h3.title{
          font-size: 18px;
        }
      }
    }
  }
</style>