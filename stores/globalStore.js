import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore' , () => {
  // define loading 
  const loading = ref(false);
  const setLoading = (newLoading) => {
    loading.value = newLoading;
  };

  // define language
  const lang = ref(useCookie('i18n_redirected')?.value || 'ar');
  const setLang = (newLang) => {
    lang.value = newLang;
    useCookie('i18n_redirected').value = newLang; // Store the language in a cookie
    useRouter().replace( newLang == 'ar' ? '/' :  `/${newLang}` + useRouter().currentRoute.value.path);
  }

  // store user phone 
  const countryCode = ref()
  const userPhone = ref('')
  const setUserPhone = (newCode ,newPhone) => {
    countryCode.value = newCode
    userPhone.value = newPhone
  }
  // define user type
  const userType = ref()
  const defineUserType = (newType) => {
    userType.value = newType
  }

  // handle device id 
  const device_id = ref(window.localStorage.getItem('device_id'));
  const handleDeviceID = (newDeviceID) => {
    window.localStorage.setItem('device_id', newDeviceID);
    device_id.value = newDeviceID;
  };

  // define page before activation code page
  const pageBeforeActivation = ref()
  const handlePageBeforeActivation = (newPage) =>{
    pageBeforeActivation.value = newPage
  }

  // handle show the side bar
  const showSideBar = ref(true)
  const handleShowSideBar = () => {
    showSideBar.value = !showSideBar.value
  }

  // define pageName
  const pageName = ref('')
  const handlePageName = (newPage) =>{
    pageName.value = newPage
  }

  // handle image popup
  const imageSrc = ref('');
  const showImagePopup = ref(false);
  const handleShowImagePopup = (image) =>{
    imageSrc.value = image
    showImagePopup.value = !showImagePopup.value
  }


  // store auction data
  const auctionData = ref({
    auctionProcess : '',
    id : '',
    endpoint : '',
    name : '',
    classification : '',
    classificationId : '',
    productNumber : 1 ,
    auctionStatus : '',
    classificationType : '',
    comission : ''
  })


  // define if there is any notifications
  const isNotified = ref(false)
  const notifications = ref()

  // Expose state and actions
  return {
    loading,
    setLoading,
    lang,
    setLang,
    countryCode,
    userPhone,
    setUserPhone,
    userType,
    defineUserType,
    device_id,
    handleDeviceID,
    isNotified,
    notifications,
    pageBeforeActivation,
    handlePageBeforeActivation,
    showSideBar,
    handleShowSideBar,
    pageName,
    handlePageName,
    imageSrc,
    showImagePopup,
    handleShowImagePopup,
    auctionData
  };
}, {
  persist: {
    storage: {
      getItem: (key) => {
        const cookie = useCookie(key, { maxAge: 86400 }); // 1 day in seconds
        return cookie.value ? JSON.parse(cookie.value) : null;
      },
      setItem: (key, value) => {
        const cookie = useCookie(key, { maxAge: 86400 });
        cookie.value = JSON.stringify(value);
      },
      removeItem: (key) => {
        const cookie = useCookie(key);
        cookie.value = null;
      }
    }
  }

});
