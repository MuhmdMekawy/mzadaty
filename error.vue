<template>
  <div class="error_page">
    <div class="image">
      <img src="/assets/images/logo.png" alt="logo image" loading="lazy">
    </div>
    <h1>
      4 
      <!-- <span>0</span> -->
      <div class="image">
        <img src="/assets/images/error_eyes.gif" alt="image gif" loading="lazy">
      </div>
      4
    </h1>
    <h3>
      {{ 
        globalStore.lang == 'en'?
        'Page is Not Found ' :
        'الصفحة غير موجوده'
      }}
    </h3>
    <NuxtLink :to="localeRoute('/')" @click="globalStore.setLang(useCookie('i18n_redirected').value)" class="main-btn">
      {{ 
        globalStore.lang == 'en'?
        'Go To Home Page' :
        'أذهب للرئيسية'
      }}
    </NuxtLink>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define locale route
  const localeRoute = useLocaleRoute()
</script>

<style lang="scss" scoped>
  .error_page{
    @include displayFlex($direction : column , $gap : 0);
    height: 100vh;
    background: #fff;
    .image{
      width: 300px;
      margin: 0 auto;
      @media (max-width : 560px){
        width: 200px;
      }
    }

    h1{
      font-size: clamp(80px , 10vw  , 200px);
      margin-bottom: 0px;
      color: $mainColor;
      @include displayFlex($gap : 0);
      span{
        color: $secColor;
      }
      .image{
        width: 150px;
        margin: 0;
        @media (max-width : 560px){
          width: 80px;
        }
      }
    }

    h3{
      font-size: clamp(30px , 100% , 300px);
      margin-bottom: 10px;
    }
    a{
      max-width: 500px;
    }
  }
</style>