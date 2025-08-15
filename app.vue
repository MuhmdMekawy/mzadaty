<template>
  <div :style="'direction: ' + availableLocales[0].dir">
    <NuxtLayout>
      <div :class="[{page_active : authStore && globalStore.showSideBar}, route.path.startsWith('/auth') || 
        route.path.startsWith('/en/auth') ? '' : 'container mx-auto']">
        <NuxtPage />
        <Toast :style="'direction: ' + availableLocales[0].dir"/>
        <ImagePopup v-if="globalStore?.showImagePopup" />
        <Notification 
          v-if="showNotification"
          :title="notificationTitle"
          :body="notificationBody"
        />
      </div>
      <audio ref="notificationAudio" preload="auto" controls class="hidden">
        <source src="/assets/media/notification.mp3" type="audio/ogg" />
        <source src="/assets/media/notification.mp3" type="audio/mpeg" />
      </audio>
    </NuxtLayout>
  </div>
</template>

<script setup>
  import Toast  from 'primevue/toast';
  import { initializeApp } from "firebase/app";
  import { getMessaging, getToken , onMessage } from "firebase/messaging";



  const { locale, locales } = useI18n()

  // define route 
  const route = useRoute()

  // define router 
  const router = useRouter()

  // define api methods
  const {
    getMethod,
    getResult,
    showErrorToast
  } = useApiMethods()

  // define locale route 
  const localeRoute = useLocaleRoute()

  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code == locale.value)
  })
  
  // #################################### Notification Handler ###################################
  // define notification data 
  const showNotification = ref(false)
  const notificationAudio = ref(null)
  const notificationTitle = ref('')
  const notificationBody = ref('')


  // Function to play notification ringtone
  const playNotificationAudio = () => {
    if(notificationAudio?.value){
      notificationAudio.value?.play();
    }
  };
  
  // define global store
  const globalStore = useGlobalStore()

  // define auth store
  const authStore = useAuthStore()


  watchEffect(()=>{
    if(getResult?.value){
      globalStore.notifications = getResult?.value
    }
    if(route.path.endsWith('notifications')){
      globalStore.isNotified = false
    }
    if(!route.path.endsWith('/auction_types')){
      globalStore.auctionData.auctionStatus = 'coming'
    }
  })
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAnqh06FnavvxkoA5np4VREkQazdkyYI6U",
    authDomain: "muzadati.firebaseapp.com",
    projectId: "muzadati",
    storageBucket: "muzadati.firebasestorage.app",
    messagingSenderId: "636057990633",
    appId: "1:636057990633:web:b19c41690314ef7b538778",
    measurementId: "G-RGBYVRZZB9"
  };
  onMounted(()=>{
    // Initialize Firebase
    initializeApp(firebaseConfig);

    Notification.requestPermission().then((permission) => {
      if (permission != 'granted') {
        setInterval(()=>{
          showErrorToast(globalStore?.lang == 'ar' ? 'يرجي تفعيل الاشعارات' : 'Please enable notifications');
        } , 3000)
      }
    });

    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      globalStore.isNotified = true
      getMethod('notifications' , '' , true , false)
      notificationTitle.value = payload.data.title;
      notificationBody.value = payload.data.body;
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 2000);
      playNotificationAudio();
      if(payload.data.type == 'block'){
        useCookie('authStore').value = ''
        useCookie('globalStore').value = ''
        setTimeout(() => {
          router.push(localeRoute('/auth/login'))
        }, 1000)
        showErrorToast(payload.data.body)
      }
    });

    getToken(messaging, { vapidKey: 'BDtr83A7yYX-cSWAnqNCbv-w5fTjn8heqs2hp4zwuvwoF-Lk-TOLY-fbxdF6qXD4in1cLx5o5xWcd87zksmvcIw' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // console.log(currentToken)
        globalStore.handleDeviceID(currentToken)
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  })
</script>


<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 1s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    transform: scale(0.7) rotate(4deg);
    /* transform: translateY(50%) rotate(45deg); */
  }
</style>