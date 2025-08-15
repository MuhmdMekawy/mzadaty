<template>
  <div class="empty">
    <i class="pi pi-box"></i>
    <h3>{{ emptyText }}</h3>
  </div>
</template>

<script setup>
  const globalStore = useGlobalStore();

  const emptyText = ref(getEmptyText(globalStore.lang));

  // Watch for changes in globalStore.lang and update emptyText accordingly
  watch(
    () => globalStore.lang,
    (newLang) => {
      emptyText.value = getEmptyText(newLang);
    }
  );

  // Helper function to get the correct empty text based on the language
  function getEmptyText(lang) {
    return lang === 'ar' 
      ? 'لايوجد محتوي حتي الأن' 
      : lang === 'en' 
      ? 'No Content Found Yet' : ''
      // : 'ابھی تک کوئی مواد نہیں ہے۔';
  }
</script>

<style lang="scss" scoped>
  .empty,
  .empty-chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
    min-height: 50vh;
    i {
      font-size: 150px;
      margin-bottom: 20px;
      color: $mainColor;
      animation-name: rotate;
      animation-duration: 5s;
      animation-iteration-count: infinite;
      animation-direction: alternate-reverse;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
    }
  }


  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>