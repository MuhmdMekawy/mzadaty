<template>
  <div class="product_slider">
    <Carousel id="product_gallery" v-bind="galleryConfig" v-model="currentSlide">
      <Slide v-for="image in props.images" :key="image">
        <img :src="image" alt="Gallery Image" @click="globalStore.handleShowImagePopup(image)" class="gallery-image" />
      </Slide>
    </Carousel>
    <Carousel id="product_thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide" v-if="props?.images?.length > 1">
      <Slide v-for="image in props.images" :key="image.id">
        <template #default="{ currentIndex, isActive }">
          <div
            :class="['thumbnail', { 'is-active': isActive }]"
            @click="slideTo(currentIndex)"
          >
            <img :src="image" alt="Thumbnail Image" class="thumbnail-image" />
          </div>
        </template>
      </Slide>

    </Carousel>
  </div>
</template>


<script setup>
  import 'vue3-carousel/carousel.css';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';
  
  // define globalStore
  const globalStore = useGlobalStore()

  const currentSlide = ref(0);

  const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

  const galleryConfig = {
    itemsToShow: 1,
    wrapAround: true,
    slideEffect: 'fade',
    mouseDrag: false,
    touchDrag: false,
    autoplay: 1500, // Enables autoplay
    // duration: 3000, // Time interval between slides (in milliseconds)
  };

  // define props
  const props = defineProps({
    images : Object
  })

  const thumbnailsConfig = {
    height: 310,
    itemsToShow: 3,
    wrapAround: false,
    // touchDrag: true,
    gap: 5,
    // vertical : false
  };
</script>

<style lang="scss" scoped>
</style>