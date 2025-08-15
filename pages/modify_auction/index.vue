<template>
  <div :class="['static_pages ' , {mini_width : globalStore.showSideBar }]">
    <div class="static_page form page">
      <h3>{{ $t('add_auction.title') }}</h3>
      <hr>
      <!-- اسم المزاد -->
      <div class="input-wrap">
        <label for="auction_name">{{ t('add_auction.auction_name') }}</label>
        <div class="input">
          <i class="pi pi-hammer"></i>
          <input 
            type="text"
            id="auction_name"
            v-model="body.name"
            :placeholder="t('add_auction.auction_name')"
          >
        </div>
      </div>
      <div class="inputs">
        <!-- تاريخ بداية المزاد -->
        <div class="input-wrap">
          <label for="auction_start_date">{{ t('add_auction.auction_start_date') }}</label>
          <div class="input">
            <i class="pi pi-calendar"></i>
            <DatePicker 
              id="auction_start_date" 
              v-model="body.startDate" 
              :min-date="new Date()" 
            />
          </div>
        </div>
        <!-- تاريخ نهاية المزاد -->
        <div class="input-wrap">
          <label for="auction_end_date">{{ t('add_auction.auction_end_date') }}</label>
          <div class="input">
            <i class="pi pi-calendar"></i>
            <DatePicker 
              id="auction_end_date" 
              v-model="body.endDate" 
              :min-date="body.startDate ? new Date(body.startDate) : new Date()" 
            />
          </div>
        </div>
      </div>
      <!-- Start Time -->
      <div class="input-wrap">
        <label for="auction_start_time">{{ t('add_auction.auction_start_time') }}</label>
        <div class="input">
          <i class="pi pi-clock"></i>
          <DatePicker 
            id="auction_start_time" 
            v-model="body.startTime" 
            timeOnly 
            hourFormat="12" 
            fluid
            @update:modelValue="handleStartTimeChange"
          />
        </div>
      </div>

      <!-- End Time -->
      <div class="input-wrap">
        <label for="auction_end_time">{{ t('add_auction.auction_end_time') }}</label>
        <div class="input">
          <i class="pi pi-clock"></i>
          <DatePicker 
            id="auction_end_time" 
            v-model="body.endTime" 
            timeOnly 
            hourFormat="12" 
            fluid
            :min-time="body.startTime ? new Date(body.startTime) : undefined"
            :class="{ 'invalid-time': isEndTimeInvalid }"
          />
        </div>
        <small v-if="isEndTimeInvalid" class="error-message">
          {{ t('add_auction.end_time_error') }}
        </small>
      </div>
      <!-- الموقع -->
      <div class="input-wrap">
        <label for="auction_location">{{ t('add_auction.auction_location') }}</label>
        <div class="input">
          <i class="pi pi-map-marker"></i>
          <input 
            type="text"
            id="auction_location"
            v-model="body.address.en"
            :placeholder="t('add_auction.auction_location')"
          >
        </div>
      </div>
      <!-- العمولة -->
      <div class="input-wrap">
        <label for="auction_comission">
          {{ t('add_auction.auction_comission') }}
          <span>(%)</span>
        </label>
        <div class="input">
          <i class="pi pi-money-bill"></i>
          <input 
            type="number"
            id="auction_comission"
            v-model="body.commission"
            :placeholder="t('add_auction.auction_comission')"
            min="0"
            max="100"
            step="1"
            oninput="this.value = Math.max(this.value, 0); this.value = Math.min(this.value, 100);"
          >
        </div>
      </div>
      <!-- {{ globalStore.auctionData.comission }} -->
      <!-- تفاصيل المزاد -->
      <div class="input-wrap">
        <label for="auction_description">{{ t('add_auction.auction_description') }}</label>
        <div class="input">
          <textarea 
            id="auction_description"
            v-model="body.auctionDescription"
            :placeholder="t('add_auction.auction_description')"
          />
        </div>
      </div>
      <!-- عدد المنتجات -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehicle' || globalStore.auctionData.classification == 'equipment'">
        <label for="products">{{ t('add_auction.products') }}</label>
        <div class="input">
          <i class="pi pi-money-bill"></i>
          <input 
            type="number"
            id="products"
            v-model="body.productsCount"
            :placeholder="t('add_auction.products')"
            min="1"
            step="1"
            oninput="this.value = Math.max(this.value, 1);"
          >
        </div>
        <p v-if="getResult?.data?.minimumAuctionProducts">
          {{ t('add_auction.minimum_products_info_1') }} {{ getResult?.data?.minimumAuctionProducts }} {{ t('add_auction.minimum_products_info_2') }}
        </p>
      </div>
      <MainBtn 
        v-if="globalStore.auctionData.classification == 'vehicle' || globalStore.auctionData.classification == 'equipment'"
        :buttonText="t('add_auction.complete_btn')"
        @handleSubmit="handleSubmit"
      />
    </div>
    <!-- ########### إضافة بيانات المنتج ########## -->
    <div class="static_page form page"  v-if="globalStore.auctionData.classification != 'vehicle' && globalStore.auctionData.classification != 'equipment'">
      <h3>{{ $t('add_product_auction.product_title') }}</h3>
      <hr>
      <!-- اسم المنتج -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'variousAuction'">
        <label for="productName">{{ $t('add_product_auction.productName') }}</label>
        <div class="input">
          <input 
            id="productName"
            type="text"
            :placeholder="$t('add_product_auction.productName')"
            v-model="body.productName"
          >
        </div>
      </div>
      <!-- رقم اللوحة -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'vehiclePlate'">
        <label for="platenumber">{{ $t('add_product_auction.plateNumber') }}</label>
        <div class="input">
          <input 
            id="platenumber"
            type="text"
            :placeholder="$t('add_product_auction.plateNumber')"
            v-model="body.plateNumber"
          >
        </div>
      </div>
      <!-- تحديد النوع -->
      <AuctionSelect 
        v-if="globalStore.auctionData.classification != 'vehiclePlate' && globalStore.auctionData.classification != 'variousAuction'"
        :label="$t('add_product_auction.type')"
        type="type"
        :selectValue="body.type"
        @handleChange="body.type = $event"
      />
      <!-- تحديد الماركة -->
      <AuctionSelect 
        v-if="globalStore.auctionData.classification != 'vehiclePlate' && globalStore.auctionData.classification != 'variousAuction'"
        :label="$t('add_product_auction.brand')"
        type="brand"
        :selectValue="body.brand"
        @handleChange="body.brand = $event"
      />
      <!-- تحديد الطراز -->
      <AuctionSelect 
        v-if="globalStore.auctionData.classification != 'vehiclePlate' && globalStore.auctionData.classification != 'variousAuction'"
        :label="$t('add_product_auction.model')"
        type="model"
        :selectValue="body.model"
        @handleChange="body.model = $event"
      />
      <!-- سنة الصنع -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification != 'vehiclePlate' && globalStore.auctionData.classification != 'variousAuction'">
        <label for="year">{{ $t('add_product_auction.manufacture_year') }}</label>
        <div class="input">
          <!-- <input 
            id="year"
            type="text"
            :placeholder="$t('add_product_auction.manufacture_year')"
            v-model="body.year"
          > -->
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
      <!-- تحديد الخامات المستخدمة -->
      <AuctionSelect
        v-if="globalStore.auctionData.classification == 'jewelry'" 
        :label="$t('add_product_auction.material')"
        type="material"
        :selectValue="body.materials"
        @handleChange="body.materials = $event"
      />
      <!-- الأحجار الكريمة -->
      <div class="input-wrap" v-if="globalStore.auctionData.classification == 'jewelry'" >
        <label for="preciousStones">
          {{ $t('add_product_auction.preciousStones') }}
          <span>
            {{ $t('add_product_auction.optional') }}
          </span>
        </label>
        <div class="input">
          <input 
            id="preciousStones"
            type="text"
            :placeholder="$t('add_product_auction.preciousStones')"
            v-model="body.preciousStones"
          >
        </div>
      </div>
      <!-- رقم الهيكل -->
      <div class="input-wrap" v-if="globalStore.auctionData.endpoint == 'heavy-equipment'">
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
      <!-- تحديد الحالة العامة -->
      <AuctionSelect 
        v-if="globalStore.auctionData.classification != 'vehiclePlate'"
        :label="$t('add_product_auction.general_condition')"
        type="generalCondition"
        :selectValue="body.generalCondition"
        @handleChange="body.generalCondition = $event"
      />
      <!-- ساعات التشغيل -->
      <div class="input-wrap"  v-if="globalStore.auctionData.endpoint == 'heavy-equipment'">
        <label for="operatingHours">{{ $t('add_product_auction.operatingHours') }}</label>
        <div class="input">
          <input 
            id="operatingHours"
            type="number"
            :placeholder="$t('add_product_auction.operatingHours')"
            v-model="body.operatingHours"
          >
        </div>
      </div>
      <!-- ملاحظات عن الأعطال -->
      <div class="input-wrap"  v-if="globalStore.auctionData.endpoint == 'heavy-equipment'">
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
      <!-- المحرك -->
      <div class="input-wrap"  v-if="globalStore.auctionData.endpoint == 'heavy-equipment'">
        <label for="engine">{{ $t('add_product_auction.engine_type') }}</label>
        <div class="input">
          <input 
            id="engine"
            type="text"
            :placeholder="$t('add_product_auction.engine_type')"
            v-model="body.engine"
          >
        </div>
      </div>
      <!-- الوزن -->
      <div class="input-wrap"  v-if="globalStore.auctionData.endpoint == 'heavy-equipment'">
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
      <div class="input-wrap"  v-if="globalStore.auctionData.endpoint == 'heavy-equipment'">
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
      <!-- ملف الفحص -->
      <div class="input-wrap"  v-if="globalStore.auctionData.endpoint == 'heavy-equipment'">
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
          <label class="pi pi-upload" for="examination_file"></label>
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
          <label class="pi pi-upload" for="image_upload"></label>
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
          <label class="pi pi-upload" for="video_upload"></label>
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
      <MainBtn 
        :buttonText="
          globalStore.auctionData.auctionProcess == 'add' ? 
          t('add_product_auction.sendBtn') : 
          t('add_product_auction.editBtn')"
        @handleSubmit="handleSubmit"
      />
    </div>
    <MinimumAuctionProductsPopup
      v-if="showMinimumAuctionProductsPopup"
    />
  </div>
</template>

<script setup>  
  // define i18n
  const { t } = useI18n()

  // define route
  const route = useRoute()

  // define router
  const router = useRouter()

  // define locale route
  const localeRoute = useLocaleRoute()


  // define global store
  const globalStore = useGlobalStore()

  // handle show minimum auction products popup
  const showMinimumAuctionProductsPopup = ref(false)  

  // define api methods
  const{
    getMethod,
    getResult,
    submitMethod,
    submitResult,
    showErrorToast
  } = useApiMethods()

  // define body
  const body = ref({
    classification: globalStore.auctionData?.classification || "",
    classificationId: globalStore.auctionData?.classificationId || "",
    name: "",
    productsCount: "" ,
    startDate: t('add_auction.auction_start_date'),
    startTime: t('add_auction.auction_start_time'),
    endDate: t('add_auction.auction_end_date'),
    endTime: t('add_auction.auction_end_time'),
    auctionDescription: "",
    commission: globalStore.auctionData.comission,
    latitude: "24.7136",
    longitude: "46.6753",
    address: {
      en: "123 King Fahd Rd, Riyadh, Saudi Arabia",
      ar: " 123  King Fahd Rd,  ,  ",
    },
    // ------------ in case the type of auction is jewelry
    materials : '',
    preciousStones : '',
    // ------------ in case the type of auction is vehicle plate
    plateNumber : '',
    // ------------ in case the type of auction is various auction
    productName : '',
    // ------------- in case the type of auction isn't equipment or vehicle
    type : '',
    brand : '',
    model : '',
    year: '1900',
    structureNumber: '',
    generalCondition: '',
    operatingHours: '',
    damageNotes: '',
    engine: '',
    weight: '',
    dimensions: '',
    examineFile: null,
    video: null,
    images: [],
    deletedImages : [],
    deletedVideos : [],
    description: ''
  })


  const isEndTimeInvalid = ref(false);


  // Reset endTime if it becomes invalid when startTime changes
  const handleStartTimeChange = (newStartTime) => {
    isEndTimeInvalid.value = true;
    if (body.value.endTime && new Date(body.value.endTime) <= new Date(newStartTime)) {
      body.value.endTime = t('add_auction.auction_end_time');
    } else {
      isEndTimeInvalid.value = false;
    }
  };

  // Validate endTime whenever startTime or endTime changes
  watch([() => body.value.startTime, () => body.value.endTime], ([newStartTime, newEndTime]) => {
    if (newStartTime && newEndTime) {
      isEndTimeInvalid.value = new Date(newEndTime) <= new Date(newStartTime);
    } else {
      isEndTimeInvalid.value = false;
    }
  });


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

  const handleSubmit = () => {
    if (!body.value.name) {
      return showErrorToast(t('add_auction.add_auction_validations.name_required'))
    } else if (body.value.startDate == t('add_auction.auction_start_date')) {
      return showErrorToast(t('add_auction.add_auction_validations.start_date_required'))
    } else if (body.value.endDate == t('add_auction.auction_end_date')) {
      return showErrorToast(t('add_auction.add_auction_validations.end_date_required'))
    } else if (body.value.startTime == t('add_auction.auction_start_time')) {
      return showErrorToast(t('add_auction.add_auction_validations.start_time_required'))
    } else if (body.value.endTime == t('add_auction.auction_end_time')) {
      return showErrorToast(t('add_auction.add_auction_validations.end_time_required'))
    } 
    else if(isEndTimeInvalid.value) {
      return showErrorToast(t('add_auction.end_time_error'))
    }
    else if (body.value.address.length == 0 || !body.value.longitude || !body.value.latitude) {
      return showErrorToast(t('add_auction.add_auction_validations.address_required'))
    } else if (!body.value.commission) {
      return showErrorToast(t('add_auction.add_auction_validations.commission_required'))
    } else if (!body.value.auctionDescription) {
      return showErrorToast(t('add_auction.add_auction_validations.auction_description_required'))
    }

    // Classification-specific validations
    const isVehicleOrEquipment = globalStore.auctionData.classification === 'vehicle' || globalStore.auctionData.classification === 'equipment';
    
    if (isVehicleOrEquipment && !body.value.productsCount) {
      return showErrorToast(t('add_auction.add_auction_validations.products_count_required'))
    }
    if(globalStore.auctionData.classification == 'jewelry'){
      if(!body.value.materials){
        return showErrorToast(t('add_product_auction.add_auction_validations.material_required'))
      }
    }
    else if (!isVehicleOrEquipment && !globalStore.auctionData.classification == 'vehiclePlate') {
      // Common validations
      if (!body.value.classification) {
        return showErrorToast(t('add_auction.add_auction_validations.classification_required'))
      }
      else if (!body.value.type) {
        return showErrorToast(t('add_auction.add_auction_validations.type_required'))
      } else if (!body.value.brand) {
        return showErrorToast(t('add_auction.add_auction_validations.brand_required'))
      } else if (!body.value.model) {
        return showErrorToast(t('add_auction.add_auction_validations.model_required'))
      } else if (!body.value.year) {
        return showErrorToast(t('add_auction.add_auction_validations.year_required'))
      } else if (!body.value.structureNumber) {
        return showErrorToast(t('add_auction.add_auction_validations.structure_number_required'))
      } else if (!body.value.generalCondition) {
        return showErrorToast(t('add_auction.add_auction_validations.general_condition_required'))
      } else if (!body.value.operatingHours) {
        return showErrorToast(t('add_auction.add_auction_validations.operating_hours_required'))
      }
      //  else if (!body.value.damageNotes) {
      //   return showErrorToast(t('add_auction.add_auction_validations.damage_notes_required'))
      // }
      else if (!body.value.engine) {
        return showErrorToast(t('add_auction.add_auction_validations.engine_type_required'))
      } else if (!body.value.weight) {
        return showErrorToast(t('add_auction.add_auction_validations.weight_required'))
      } else if (!body.value.dimensions) {
        return showErrorToast(t('add_auction.add_auction_validations.dimensions_required'))
      } else if (!body.value.examineFile) {
        return showErrorToast(t('add_auction.add_auction_validations.examine_file_required'))
      }
      // else if (!body.value.video) {
      //   return showErrorToast(t('add_auction.add_auction_validations.video_required'))
      // }
      else if (body.value.images.length == 0) {
        return showErrorToast(t('add_auction.add_auction_validations.images_required'))
      } else if (!body.value.description) {
        return showErrorToast(t('add_auction.add_auction_validations.description_required'))
      }
    }

    // Prepare form data
    const auctionForm = new FormData()
    if(globalStore.auctionData.auctionProcess == 'add'){
      auctionForm.append('classification', body.value.classification)
    }
    auctionForm.append(globalStore.auctionData.auctionProcess == 'add' ? 'classificationId' : 'id', body.value.classificationId)
    auctionForm.append('name', body.value.name)
    auctionForm.append('startDate', formatDateForSubmission(body.value.startDate));
    auctionForm.append('endDate', formatDateForSubmission(body.value.endDate));
    if(globalStore.auctionData.auctionProcess == 'add'){
      auctionForm.append('startTime', new Date(body.value.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      auctionForm.append('endTime', new Date(body.value.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }else{
      if(body.value.startTime === getResult?.value?.data?.startAuctionTime){
        auctionForm.append('startTime', body.value.startTime)
      }else{
        auctionForm.append('startTime', new Date(body.value.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      }
      if(body.value.endTime === getResult?.value?.data?.endAuctionTime){
        auctionForm.append('endTime', body.value.endTime)
      }else{
        auctionForm.append('endTime', new Date(body.value.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
      }
    }
    auctionForm.append('auctionDescription', body.value.auctionDescription)
    auctionForm.append('commission', body.value.commission)
    auctionForm.append('latitude', body.value.latitude)
    auctionForm.append('longitude', body.value.longitude)
    auctionForm.append('address', JSON.stringify({
      en: body.value.address.en,
      ar: body.value.address.ar
    }))

    // Append classification-specific fields
    if (isVehicleOrEquipment) {
      if (body.value.productsCount) auctionForm.append('productsCount', body.value.productsCount)
      submitMethod(`${globalStore.auctionData.auctionProcess}-auction`, true, auctionForm,         
        globalStore.auctionData.auctionProcess == 'add' ? 
        'POST' : 
        'PATCH', '')
    } 
    else {
      if(globalStore.auctionData.endpoint != 'vehicle-plate'){
        if (body.value.type) auctionForm.append('type', body.value.type)
        if (body.value.brand) auctionForm.append('brand', body.value.brand)
        if (body.value.model) auctionForm.append('model', body.value.model)
        if (body.value.year) auctionForm.append('manufactureYear', formatDateForSubmission(body.value.year).split('-')[0])
      }
      // ------------ in case the type of auction is heavy equipment
      if(globalStore.auctionData.endpoint == 'heavy-equipment'){
        if (body.value.structureNumber) auctionForm.append('structureNumber', body.value.structureNumber)
        if (body.value.operatingHours) auctionForm.append('operatingHours', body.value.operatingHours)
        if (body.value.engine) auctionForm.append('engine', body.value.engine)
        if (body.value.weight) auctionForm.append('weight', body.value.weight)
        if (body.value.dimensions) auctionForm.append('dimensions', body.value.dimensions)
      }
      if (body.value.generalCondition) auctionForm.append('generalCondition', body.value.generalCondition)
      if (body.value.damageNotes) auctionForm.append('damageNotes', body.value.damageNotes)
      if (body.value.examineFile) auctionForm.append('examineFile', body.value.examineFile)
      // ------------ in case the type of auction is jewelry
      if(globalStore.auctionData.classification == 'jewelry'){
        if (body.value.materials) auctionForm.append('materials', body.value.materials)
        if (body.value.preciousStones) auctionForm.append('preciousStones', body.value.preciousStones)
      }
      // ------------ in case the type of auction is vehicle plate
      if(globalStore.auctionData.classification == 'vehiclePlate'){
        if (body.value.plateNumber) auctionForm.append('plateNumber', body.value.plateNumber)
      }
      // ------------ in case the type of auction is various auction
      if(globalStore.auctionData.classification == 'variousAuction'){
        if (body.value.productName) auctionForm.append('productName', body.value.productName)
      }
      // if(body.value.video){
      //   auctionForm.append('video', body.value.video)
      // }
      // لارسال الصور المضافه حديثا ف حالة التعديل فقط
      if(imagesChanged.value){
        body.value.images.forEach(image => {
          auctionForm.append('images', image)
        })
      }
      // // لارسال الفيديو المضاف حديثا ف حالة التعديل فقط
      // if(globalStore.auctionData.auctionProcess == 'edit' && videoChanged.value){
      //   body.value.video.forEach(video => {
      //     auctionForm.append('video', video)
      //   })
      // }
      if(videoChanged.value && body.value.video){
        auctionForm.append('videos', body.value.video)
      }
      if(body.value.deletedVideos.length > 0){
        auctionForm.append('deletedVideos', JSON.stringify(body.value.deletedVideos))
      } 
      // لارسال الصور المحذوفه 
      if(body.value.deletedImages.length > 0){
        body.value.deletedImages.forEach(image => {
          auctionForm.append('deletedImages', JSON.stringify(image))
        })
      }
      if (body.value.description) auctionForm.append('description', body.value.description)
      submitMethod(
        `${globalStore.auctionData.auctionProcess}-${globalStore.auctionData.endpoint}-product`, 
        true, 
        auctionForm, 
        globalStore.auctionData.auctionProcess == 'add' ? 
        'POST' : 
        'PATCH', 
        ''
      )
    }
  }


  watchEffect(()=>{
    // if(body?.value?.examineFile){
    //   localExamineFile?.value = URL.createObjectURL(body?.value?.examineFile)
    // }
    // if(body.value.video){
    //   localVideo.value = URL.createObjectURL(body.value.video)
    // }

    // console.log(globalStore.auctionData.comission)

    // if(globalStore.auctionData.auctionProcess == 'add' && getResult?.value){
      // }
      // body.value.commission = globalStore.auctionData.comission
      console.log(formatDateForSubmission(getResult?.value?.data?.startedAt))
    if(globalStore.auctionData.auctionProcess == 'edit' && getResult?.value){
      globalStore.handlePageName(t(`add_auction.${globalStore.auctionData.auctionProcess}`) + t('add_auction.page_name') + ' ' + getResult?.value?.data?.name)
      body.value.name = getResult?.value?.data?.name
      body.value.startDate = formatDateForSubmission(getResult?.value?.data?.startedAt)
      body.value.endDate = formatDateForSubmission(getResult?.value?.data?.endedAt)
      body.value.startTime = getResult?.value?.data?.startAuctionTime
      body.value.endTime = getResult?.value?.data?.endAuctionTime
      body.value.address.en = getResult?.value?.data?.location
      body.value.address.ar = getResult?.value?.data?.location
      body.value.commission = getResult?.value?.data?.commission
      body.value.latitude = getResult?.value?.data?.lat
      body.value.longitude = getResult?.value?.data?.lng
      body.value.auctionDescription = getResult?.value?.data?.description
      body.value.productsCount = getResult?.value?.data?.productsCount || ''
      if(getResult.value.data.classification == 'vehiclePlate'){
        body.value.plateNumber = getResult.value.data.productData[0].plateNumber || ''
      }
      if(getResult.value.data.classification == 'jewelry'){
        body.value.materials = getResult.value.data.productData[0].materialsId || ''
        body.value.preciousStones = getResult.value.data.productData[0].preciousStones || ''
      }
      if(getResult.value.data.classification == 'variousAuction'){
        body.value.productName = getResult.value.data.productData[0].productName || ''
      }
        body.value.type = getResult.value.data.productData[0].typeId || ''
        body.value.brand = getResult.value.data.productData[0].brandId || ''
        body.value.model = getResult.value.data.productData[0].modelId || ''
        body.value.year = getResult.value.data.productData[0].manufactureYear?.toString() || ''
        body.value.structureNumber = getResult.value.data.productData[0].structureNumber || ''
        body.value.generalCondition = getResult.value.data.productData[0].generalConditionId || ''
        body.value.operatingHours = getResult.value.data.productData[0].operatingHours || ''
        body.value.damageNotes = getResult.value.data.productData[0].damageNotes || ''
        body.value.engine = getResult.value.data.productData[0].engine || ''
        body.value.weight = getResult.value.data.productData[0].weight || ''
        body.value.dimensions = getResult.value.data.productData[0].dimensions || ''
        body.value.examineFile = getResult.value.data.productData[0].examineFile || ''
        body.value.video = getResult.value.data.productData[0].videos[0] || ''
        localVideo.value = getResult.value.data.productData[0].videos[0]
        body.value.images = getResult.value.data.productData[0].images || []
        localImages.value = getResult.value.data.productData[0].images || []
        body.value.description = getResult.value.data.productData[0].description || ''
    }

    if(submitResult?.value?.data?.key == 'success' ){
      if(body.value.productsCount < getResult?.value?.data?.minimumAuctionProducts && (globalStore.auctionData.classification == 'vehicle' || globalStore.auctionData.classification == 'equipment')){
        showMinimumAuctionProductsPopup.value = true
      }
      setTimeout(() => {
        if(globalStore.auctionData.classification == 'vehicle' || globalStore.auctionData.classification == 'equipment'){
          globalStore.auctionData.id = submitResult?.value?.data?.data?.id
          globalStore.auctionData.endpoint = submitResult?.value?.data?.data?.endpoint
          router.push(localeRoute('/modify_auction_product'));
        }else {
          router.push(localeRoute('/'));
        }
      }, 1500);
    }
  })

  onMounted(()=>{
    globalStore.handlePageName(t(`add_auction.${globalStore.auctionData.auctionProcess}`) + t('add_auction.page_name') + ' ' + globalStore.auctionData.name)
    globalStore.auctionData.productNumber = 1
    if(globalStore.auctionData.auctionProcess == 'add'){
      getMethod('global' , null , false , false)
    }else{
      getMethod(`auction-details?id=${globalStore.auctionData.classificationId}` , null , true , false)
    }
  })
</script>

<style lang="scss" scoped>
  .form {
    .inputs{
      margin-bottom: 8px;
      .input-wrap{
        margin-bottom: 0;
      }
    }
    .input-wrap {
      label{
        font-size: 12px;
        font-weight: 300;
        margin-bottom: 4px;
      }
      .input{
        box-shadow: 0px 0px 8px 0px #BABABA2E;
        justify-content: flex-start;
        input{
          border: none !important;
        }
      }
      p{
        font-size: 10px;
        font-weight: 400;
        color: $dangerColor;
        margin-block: 2px;
      }
    }
  }
  .error-message{
    font-size: 10px;
    font-weight: 400;
    color: $dangerColor;
    margin-block: 2px;
  }
  // for product details style 
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
              cursor: pointer;
              // object-fit: contain;
            }
          }
        }
      }
    }
  }
</style>