<template>
  <div>
  <div class="form">
      <label class="image_uploader image">
        <Skeleton 
          width="80px" 
          height="80px" 
          class="w-full h-full"
        />
      </label>
      <div class="input-wrap" v-for="i in 10"> 
        <label for="name" style="display: block; margin-bottom: 8px;">
          <Skeleton width="150px" height="30px" />
        </label>
        <div class="input">
          <Skeleton width="100%" height="30px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .image_uploader{
    width: 80px;
    height: 80px;
  }
</style>