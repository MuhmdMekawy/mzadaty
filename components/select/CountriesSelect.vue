<template>
  <ul class="countries-select">
    <span class="pi pi-angle-down" @click="toggleDropdown"></span>
    <!-- Show only the selected country -->
    <li @click="toggleDropdown">
      <div class="image">
        <img :src="selectedCountry?.image" alt="image" loading="lazy">
      </div>
      <span>{{ selectedCountry?.code }}</span>
    </li>

    <!-- Show other countries when the dropdown is open -->
    <ul v-if="isDropdownOpen" class="dropdown">
      <li v-for="country in getResult?.data" :key="country?.value" @click="selectCountry(country)">
        <div class="image">
          <img :src="country?.image" alt="image" loading="lazy">
        </div>
        <span>{{ country?.code }}</span>
      </li>
    </ul>
  </ul>
</template>

<script setup>
  // define selected country
  const selectedCountry = ref({
    "_id": "67c81f673297036778fb28ad",
    "name": "المملكة العربية السعودية",
    "image": "https://mazadaty-app.com/assets/uploads/country/image11741168486991.png",
    "code": "+966",
    "iso": "SAU"
  });


  // define emits 
  const emit = defineEmits(['updateCountry'])

  // Toggle dropdown visibility
  const isDropdownOpen = ref(false);
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  // Set selected country and close dropdown
  const selectCountry = (country) => {
    isDropdownOpen.value = false;
    selectedCountry.value = country
    emit('updateCountry', country);
  };

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()
  

  onMounted(()=>{
    emit('updateCountry', selectedCountry.value);
    getMethod('countries' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  .input {
    width: fit-content;
    padding-inline-end: 5px;

    .countries-select {
      position: relative;
      width: fit-content;

      .pi {
        position: absolute;
        inset-inline-end: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        font-size: 12px;
      }

      li {
        @include displayFlex($gap: 5px, $direction: row,$align : flex-end , $justify: flex-start);
        padding: 3px 5px;
        height: 30px;
        overflow: hidden;
        cursor: pointer;
        padding-inline-end: 15px;

        .image {
          width: 40px;
          height: 25px;
          border-radius: 4px;
          overflow: hidden;
          margin: 0;
          flex-shrink: 0;
        }

        span {
          font-size: 12px;
          @include textTruncate(1);
        }
      }

      .dropdown {
        position: absolute;
        top: 110%;
        left: 0;
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: fit-content;
        z-index: 10;
        padding: 5px;

        li {
          padding: 3px 5px;
          height: 30px;
          overflow: hidden;
          &:not(:last-of-type) {
            margin-bottom: 5px;
          }

          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
</style>
