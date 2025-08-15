<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page form page">
      <h3>{{ $t('add_product_auction.title') }}</h3>
      <hr>
      <!-- تحديد النوع -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'equipment'">
        <AuctionSelect
          :label="$t('add_product_auction.type')"
          type="type"
          :selectValue="body.type"
          @handleChange="body.type = $event"
        />
      </div>
      <!-- تحديد الماركة -->
      <div class="input-wrap">
        <AuctionSelect
          :label="$t('add_product_auction.brand')"
          type="brand"
          :selectValue="body.brand"
          @handleChange="body.brand = $event"
        />
      </div>
      <!-- تحديد الطراز -->
      <div class="input-wrap">
        <AuctionSelect
          :label="$t('add_product_auction.model')"
          type="model"
          :selectValue="body.model"
          @handleChange="body.model = $event"
        />
      </div>
      <!-- سنة الصنع -->
      <div class="input-wrap">
        <label for="year">{{ $t('add_product_auction.manufacture_year') }}</label>
        <div class="input">
          <Calendar
            id="year"
            v-model="body.year"
            view="year"
            dateFormat="yy"
            :showTime="false"
            :showIcon="false"
            :maxDate="new Date(new Date().getFullYear(), 11, 31)"
          />
        </div>
      </div>
      <!-- نوع المحرك -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <AuctionSelect
          :label="$t('add_product_auction.engine_type')"
          type="engineType"
          :selectValue="body.engineType"
          @handleChange="body.engineType = $event"
        />
      </div>
      <!-- عدد الكيلومترات -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <label for="mileage">{{ $t('add_product_auction.mileage') }}</label>
        <div class="input">
          <input 
            id="mileage"
            type="number"
            :placeholder="$t('add_product_auction.mileage')"
            v-model="body.mileage"
          >
        </div>
      </div>
      <!-- اللون الخارجي -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <AuctionSelect
          :label="$t('add_product_auction.exterior_color')"
          type="exteriorColor"
          :selectValue="body.exteriorColor"
          @handleChange="body.exteriorColor = $event"
        />
      </div>
      <!-- اللون الداخلي -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <AuctionSelect
          :label="$t('add_product_auction.interior_color')"
          type="interiorColor"
          :selectValue="body.interiorColor"
          @handleChange="body.interiorColor = $event"
        />
      </div>
      <!-- نوع ناقل الحركة -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <AuctionSelect
          :label="$t('add_product_auction.transmission_type')"
          type="transmissionType"
          :selectValue="body.transmissionType"
          @handleChange="body.transmissionType = $event"
        />
      </div>
      <!-- عدد الابواب -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <label for="doors_count">{{ $t('add_product_auction.doors_count') }}</label>
        <div class="input">
          <input 
            id="doors_count"
            type="number"
            :placeholder="$t('add_product_auction.doors_count')"
            v-model="body.doorsNumber"
          >
        </div>
      </div>
      <!-- عدد المقاعد -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <label for="seatsNumber">{{ $t('add_product_auction.seats_count') }}</label>
        <div class="input">
          <input 
            id="seatsNumber"
            type="number"
            :placeholder="$t('add_product_auction.seats_count')"
            v-model="body.seatsNumber"
          >
        </div>
      </div>
      <!-- رقم الهيكل -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <label for="chassis_number">{{ $t('add_product_auction.chassis_number') }}</label>
        <div class="input">
          <input 
            id="chassis_number"
            type="text"
            :placeholder="$t('add_product_auction.chassis_number')"
            v-model="body.structureNumber"
          >
        </div>
      </div>
      <!-- الحالة العامة -->
      <div class="input-wrap">
        <AuctionSelect
          :label="$t('add_product_auction.general_condition')"
          type="generalCondition"
          :selectValue="body.generalCondition"
          @handleChange="body.generalCondition = $event"
        />
      </div>
      <!-- المواصفات الفنية -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'equipment'">
        <AuctionSelect
          :label="$t('add_product_auction.technical_specifications')"
          type="technicalSpecifications"
          :selectValue="body.technicalSpecifications"
          @handleChange="body.technicalSpecifications = $event"
        />
      </div>
      <!-- الوزن -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'equipment'">
        <label for="weight">{{ $t('add_product_auction.weight') }}</label>
        <div class="input">
          <input 
            id="weight"
            type="text"
            :placeholder="$t('add_product_auction.weight')"
            v-model="body.weight"
          >
        </div>
      </div>
      <!-- الأبعاد -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'equipment'">
        <label for="dimensions">{{ $t('add_product_auction.dimensions') }}</label>
        <div class="input">
          <input 
            id="dimensions"
            type="text"
            :placeholder="$t('add_product_auction.dimensions')"
            v-model="body.dimensions"
          >
        </div>
      </div>
      <!-- ملاحظات عن الأعطال -->
      <div class="input-wrap">
        <label for="damageNotes">
          {{ $t('add_product_auction.fault_notes') }}
          <span>
            {{ $t('add_product_auction.optional') }}
          </span>
        </label>
        <div class="input">
          <textarea 
            name="damageNotes" 
            id="damageNotes" 
            :placeholder="$t('add_product_auction.fault_notes')"
            v-model="body.damageNotes"
          />
        </div>
      </div>
      <!-- المميزات الخاصة -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <AuctionSelect
          :label="$t('add_product_auction.special_features')"
          type="specialFeatures"
          :selectValue="body.specialFeatures"
          @handleChange="body.specialFeatures = $event"
        />
      </div>
      <!-- ملف الفحص -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle'">
        <label for="examination_file">{{ $t('add_product_auction.inspection_file') }}</label>
        <div class="input">
          <label for="examination_file" v-if="!body.examineFile">
            {{ $t('add_product_auction.inspection_file') }}
          </label>
          <a :href="localExamineFile" class="local_file" target="_blank" v-else>
            <button class="close_btn" @click="body.examineFile = ''">
              <i class="pi pi-times"></i>
            </button>
            <img src="/assets/images/pdf.png" alt="image" loading="lazy">
          </a>
          <input
            type="file"
            id="examination_file"
            :placeholder="$t('add_product_auction.inspection_file')"
            @change="body.examineFile = $event.target.files[0]"
            accept=".pdf"
            hidden
          >
          <label class="pi pi-upload"></label>
        </div>
      </div>
      <!-- اضافة صور -->
      <div class="input-wrap">
        <label for="image_upload">
          {{ $t('add_product_auction.add_photos') }} 
          <!-- <span>
            {{$t('add_product_auction.optional')}}
          </span> -->
        </label>
        <div class="input">
          <label 
            for="image_upload" 
            v-if="body.images.length == 0"
          >
            {{ $t('add_product_auction.add_photos') }}
          </label>
          <div class="images" v-else>
            <div 
              v-for="(image , index) in localImages" 
              :key="image.id" 
              class="local_file" 
            >
              <button 
                class="close_btn" 
                @click="handleRemoveImage(index , image)"
              >
                <i class="pi pi-times"></i>
              </button>
              <img :src="image" @click="globalStore.handleShowImagePopup(image)" alt="image" loading="lazy">
            </div>
          </div>
          <input
            type="file"
            id="image_upload"
            :placeholder="$t('add_product_auction.add_photos')"
            @change="handleUploadImages"
            hidden
            multiple
            accept="image/*"
          >
          <label class="pi pi-upload"></label>
        </div>
      </div>
      <!-- اضافة فيديو -->
      <div class="input-wrap">
        <label for="video_upload">
          {{ $t('add_product_auction.add_video') }} 
          <span>
            {{$t('add_product_auction.optional')}}
          </span>
        </label>
        <div class="input">
          <label 
            for="video_upload"
            v-if="!body.video"
          >
          {{ $t('add_product_auction.add_video') }}
        </label>
          <div class="local_file" target="_blank" v-else>
            <button class="close_btn" @click="handleRemoveVideo(body.video)">
              <i class="pi pi-times"></i>
            </button>
            <video :src="localVideo" autoplay loop muted></video>
          </div>
          <input
            type="file"
            id="video_upload"
            :placeholder="$t('add_product_auction.add_video')"
            @change="handleUploadVideo"
            hidden
            accept="video/*"
          >
          <label class="pi pi-upload"></label>
        </div>
      </div>
      <!-- وصف -->
      <div class="input-wrap">
        <label for="description">{{ $t('add_product_auction.details') }}</label>
        <div class="input">
          <textarea 
            name="description" 
            id="description" 
            :placeholder="$t('add_product_auction.details')"
            v-model="body.description"
          />
        </div>
      </div>
      <!-- للاضافة -->
      <MainBtn 
        :buttonText="$t('add_product_auction.submitBtn')"
        @handleSubmit="handleSubmit"
      />
    </div>
  </div>
</template>


<script setup>
  // define i18n 
  const { t } = useI18n()

  // define global store
  const globalStore = useGlobalStore()

  // define router 
  const router = useRouter()

  // define localeRouter
  const localeRoute = useLocaleRoute()

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    submitResult,
    showErrorToast
  } = useApiMethods()

  // define body
  const body = ref({
    type : '',
    brand:'',
    model:'',
    year:'1900',
    engineType:'',
    mileage:'',
    exteriorColor:'',
    interiorColor:'',
    transmissionType:'',
    doorsNumber:'',
    seatsNumber:'',
    structureNumber:'',
    generalCondition:'',
    technicalSpecifications : '',
    weight : '',
    dimensions : '',
    damageNotes:'',
    specialFeatures:'',
    examineFile :'',
    video : '',
    images:[],
    deletedImages : [],
    deletedVideos : [],
    description:''
  })

  // handle locale files (examine file , video  image)
  const localExamineFile = ref('')

  const localVideo = ref('')

  const localImages = ref([])


  // handle upload images 
  const imagesChanged = ref(false)
  const handleUploadImages = (event) => {
    imagesChanged.value = true;
    const files = event.target.files;
    if (files.length > 0) {
      body.value.images = Array.from(files);
      localImages.value.push(...body.value.images.map(file => URL.createObjectURL(file)));
    }
  }

  const handleRemoveImage = (index , image) => {
    body.value.images.splice(index, 1);
    localImages.value.splice(index, 1);
    if(globalStore.auctionData.auctionProcess == 'edit'){
      body.value.deletedImages.push(image);
    }
  }

  // handle upload video
  const videoChanged = ref(false)
  const handleUploadVideo = (event) => {
    videoChanged.value = true;
    const file = event.target.files[0];
    if (file) {
      body.value.video = file;
      localVideo.value = URL.createObjectURL(file);
    }
  }

  const handleRemoveVideo = (video) => {
    body.value.video = null;
    localVideo.value = '';
    if(globalStore.auctionData.auctionProcess == 'edit'){
      body.value.deletedVideos.push(video);
    }
  }

  // watchEffect(()=>{
  //   if(body.value.examineFile){
  //     localExamineFile.value = URL.createObjectURL(body.value.examineFile)
  //   }
  //   if(body.value.video){
  //     localVideo.value = URL.createObjectURL(body.value.video)
  //   }
  // })

  // // to handle year
  // const handleYearSelect = (date) => {
  //   body.value.year = date ? new Date(date).getFullYear() : null;
  // }

  // handle submit form
  const handleSubmit = () =>{
    if(!body.value.brand){
      showErrorToast(t('add_product_auction.add_auction_validations.brand_required'))
      return false
    }
    else if (globalStore.auctionData.classification == 'equipment' && !body.value.type){
      showErrorToast(t('add_product_auction.add_auction_validations.type_required'))
      return false
    }
    else if(!body.value.model){
      showErrorToast(t('add_product_auction.add_auction_validations.model_required'))
      return false
    }
    else if(!body.value.year){
      showErrorToast(t('add_product_auction.add_auction_validations.year_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.engineType){
      showErrorToast(t('add_product_auction.add_auction_validations.engine_type_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.mileage){
      showErrorToast(t('add_product_auction.add_auction_validations.mileage_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.exteriorColor){
      showErrorToast(t('add_product_auction.add_auction_validations.exterior_color_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.interiorColor){
      showErrorToast(t('add_product_auction.add_auction_validations.interior_color_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.transmissionType){
      showErrorToast(t('add_product_auction.add_auction_validations.transmission_type_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.doorsNumber){
      showErrorToast(t('add_product_auction.add_auction_validations.doors_number_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.seatsNumber){
      showErrorToast(t('add_product_auction.add_auction_validations.seats_number_required'))
      return false
    }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.structureNumber){
      showErrorToast(t('add_product_auction.add_auction_validations.structure_number_required'))
      return false
    }
    else if(!body.value.generalCondition){
      showErrorToast(t('add_product_auction.add_auction_validations.general_condition_required'))
      return false
    }
    // else if(!body.value.damageNotes){
    //   showErrorToast(t('add_product_auction.add_auction_validations.damage_notes_required'))
    //   return false
    // }
    else if(globalStore.auctionData.classification == 'vehicle' && !body.value.specialFeatures){
      showErrorToast(t('add_product_auction.add_auction_validations.special_features_required'))
      return false
    }
    else if(body.value.images == []){
      showErrorToast(t('add_product_auction.add_auction_validations.images_required'))
      return false
    }
    else if(!body.value.description){
      showErrorToast(t('add_product_auction.add_auction_validations.description_required'))
      return false
    }
    else{
      const auctionProductFormData = new FormData();
      auctionProductFormData.append('id', globalStore.auctionData.id);
      if(globalStore.auctionData.auctionProcess == 'edit'){
        auctionProductFormData.append('product', getResult?.value?.data?.productData[globalStore.auctionData.productNumber-1]?.id);
      }
      if(globalStore.auctionData.classification == 'equipment'){
        auctionProductFormData.append('type', body.value.type);
        auctionProductFormData.append('technicalSpecifications', body.value.technicalSpecifications);
        auctionProductFormData.append('weight', body.value.weight);
        auctionProductFormData.append('dimensions', body.value.dimensions);
        auctionProductFormData.append('manufactureYear', body.value.year); 
      }
      auctionProductFormData.append('brand', body.value.brand);
      auctionProductFormData.append('model', body.value.model);
      if(globalStore.auctionData.classification == 'vehicle'){
        if(body.value.year === getResult?.value?.data?.productData[globalStore.auctionData.productNumber-1]?.manufactureYear){
          auctionProductFormData.append('year',body.value.year); 
        }else{
          auctionProductFormData.append('year', formatDateForSubmission(body.value.year).split('-')[0]); 
        }
        auctionProductFormData.append('engineType', body.value.engineType);
        auctionProductFormData.append('mileage', body.value.mileage);
        auctionProductFormData.append('exteriorColor', body.value.exteriorColor);
        auctionProductFormData.append('interiorColor', body.value.interiorColor);
        auctionProductFormData.append('transmissionType', body.value.transmissionType);
        auctionProductFormData.append('doorsNumber', body.value.doorsNumber);
        auctionProductFormData.append('seatsNumber', body.value.seatsNumber);
        auctionProductFormData.append('structureNumber', body.value.structureNumber);
        auctionProductFormData.append('examineFile', body.value.examineFile);
        auctionProductFormData.append('specialFeatures', body.value.specialFeatures);
      }
      auctionProductFormData.append('damageNotes', body.value.damageNotes);
      auctionProductFormData.append('generalCondition', body.value.generalCondition);


      // لارسال الصور المضافه حديثا ف حالة التعديل فقط
      if(imagesChanged.value){
        body.value.images.forEach(image => {
          auctionProductFormData.append('images', image)
        })
      }
      // // لارسال الفيديو المضاف حديثا ف حالة التعديل فقط
      // if(globalStore.auctionData.auctionProcess == 'edit' && videoChanged.value){
      //   body.value.video.forEach(video => {
      //     auctionProductFormData.append('video', video)
      //   })
      // }
      if(videoChanged.value && body.value.video){
        auctionProductFormData.append('videos', body.value.video)
      }
      if(body.value.deletedVideos.length > 0){
        const deletedVideo = body.value.deletedVideos.map(item => {
          const videoName = item.split('/').splice(-1)[0];
          return videoName;
        });
        auctionProductFormData.append('deletedVideos', JSON.stringify(deletedVideo))
      } 
      // لارسال الصور المحذوفه 
      if(body.value.deletedImages.length > 0){
        const deletedImagesObj = body.value.deletedImages.map(item => {
          const imageName = item.split('/').splice(-1)[0];
          return imageName;
        });
        auctionProductFormData.append('deletedImages', JSON.stringify(deletedImagesObj));
      }


      // if(body.value.video){
      //   auctionProductFormData.append('video', body.value.video);
      // }
      // if(body.value.images.length > 0){
      //   if(body.value.images.length > 0){
      //     const oldImages = getResult?.value?.data?.productData[globalStore.auctionData.productNumber-1]?.images || [];
      //     const newImages = body.value.images.filter(image => !oldImages.includes(image.name));
      //     newImages.forEach((image, index) => {
      //       auctionProductFormData.append('images', image);
      //     });
      //   }
        
      // }
      auctionProductFormData.append('description', body.value.description);
      submitMethod(globalStore.auctionData.endpoint , true ,auctionProductFormData ,globalStore.auctionData.auctionProcess == 'edit' ? 'PATCH' : 'POST' , 'reload_page' )
    }
  }


  watchEffect(()=>{
    if(submitResult?.value){
      if(submitResult?.value?.data?.data?.out){
        router.push(localeRoute('/auctions'))
      }else {
        globalStore.auctionData.productNumber +=1
        // globalStore.handlePageName(t(`add_product_auction.product_${globalStore.auctionData.productNumber +=1}`))
        // make the window scroll to top after add product
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        // to reset values
        localImages.value = []
        localExamineFile.value = ''
        localVideo.value = ''
        body.value = {
          type : '',
          brand:'',
          model:'',
          year:'',
          engineType:'',
          mileage:'',
          exteriorColor:'',
          interiorColor:'',
          transmissionType:'',
          doorsNumber:'',
          seatsNumber:'',
          structureNumber:'',
          generalCondition:'',
          technicalSpecifications : '',
          weight : '',
          dimensions : '',
          damageNotes:'',
          specialFeatures:'',
          examineFile :'',
          video : '',
          images:[],
          description:''
        };
      }
    }
  })

  watchEffect(()=>{
    if(getResult?.value){
      const product = getResult.value.data.productData[globalStore.auctionData.productNumber-1]
      if(product){
        body.value.type = product.typeId
        body.value.brand = product.brandId
        body.value.model = product.modelId
        body.value.year = product.year?.toString()
        body.value.engineType = product?.engineTypeId
        body.value.mileage = product?.mileage
        body.value.exteriorColor = product?.exteriorColorId
        body.value.interiorColor = product?.interiorColorId
        body.value.transmissionType = product?.transmissionTypeId
        body.value.doorsNumber = product?.doorsNumber
        body.value.seatsNumber = product?.seatsNumber
        body.value.specialFeatures = product?.specialFeaturesId
        body.value.technicalSpecifications = product.technicalSpecificationsId
        body.value.structureNumber = product.structureNumber
        body.value.generalCondition = product.generalConditionId
        body.value.operatingHours = product.operatingHours
        body.value.damageNotes = product.damageNotes
        body.value.weight = product.weight
        body.value.dimensions = product.dimensions
        body.value.examineFile = product.examineFile
        body.value.video = product.videos[0]
        localVideo.value = product.videos[0]
        body.value.images = product?.images
        localImages.value = product?.images
        body.value.description = product.description
      }
    }
  })


  onMounted(()=>{
    globalStore.handlePageName(t(`add_product_auction.product_${globalStore.auctionData.productNumber}`))
    if(globalStore.auctionData.auctionProcess == 'edit'){
      getMethod(`auction-details?id=${globalStore.auctionData.classificationId}` , null , true , false)
    }
  })
</script>

<style lang="scss" scoped>
  .form{
    .input-wrap{
      label{
        font-size: 14px;
        font-weight: 400;
        &.pi-upload{
          width: 18px !important;
        }
      }
      .input{
        justify-content: space-between;
        min-height: 40px;
        label{
          font-size: 14px;
          font-weight: 300;
          color: $secColor;
          width: 100%;
          cursor: pointer;
        }
        .images{
          @include displayFlex($justify : flex-start);
        }
        .local_file{
          margin: 0;
          width: 30px;
          height: 30px;
          border-radius: 4px;
          position: relative;
          .close_btn{
            position: absolute;
            inset-inline-end: -10px;
            top: -5px;
            @include circle(15px);
            border: 1px solid $dangerColor;
            background: $dangerColor;
            @include displayFlex();
            box-shadow: 0px 0px 8px 0px #4545452e;
            i.pi-times{
              color: #fff;
              font-size: 6px;
            }
            &:hover{
              background: #fff;
              color: $dangerColor !important;
              i.pi-times{
                color: $dangerColor;
              }
            }
          }
          img,
          video{
            border-radius: 4px;
            overflow: hidden;
          }
          &:first-of-type{
            img{
              object-fit: contain;
            }
          }
        }
      }
    }
  }
</style>