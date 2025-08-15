<template>
  <div class="card loading-card flex justify-center">
    <img src="/assets/images/logo.png" alt="image" loading="lazy">
    <!-- <Skeleton width="50px" height="50px" shape="circle" /> -->
    <!-- 
      <ProgressSpinner 
        style="width: 50px; height: 50px" 
        strokeWidth="8" 
        fill="transparent"
        animationDuration=".5s" 
        aria-label="Custom ProgressSpinner" 
      />
    -->
  </div>
</template>

<script setup>
// import Skeleton from 'primevue/skeleton';
</script>

<style lang="scss" scoped>
  .loading-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(#fff, 0.7);
    backdrop-filter: blur(10px);
    z-index: 99999 !important;
    img{
      width: 200px;
      height: 200px;
      object-fit: contain;
      animation: spin 2s linear infinite alternate-reverse ;
    }
  }
  @keyframes spin {
    0% {
      transform:scale(0.5);
    }
    100% {
      transform:scale(1.2);
    }
  }
</style>

