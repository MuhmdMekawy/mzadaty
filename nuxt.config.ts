// nuxt.config.ts
import Aura from "@primevue/themes/aura";



export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  components: [
    // Automatically import components from the default components directory
    { path: '~/components/', pathPrefix: false },

    // Automatically import components from the 'popup' directory with .vue extension
    { path: '~/components/popup/', pathPrefix: false, extensions: ['vue'] }
  ],


  runtimeConfig: {
    public: {
      apiBase: "https://mazadaty-app.com/api/",
      secretKey : "9e810ce4d7b9e83d7aaf208b3ecfd0488d6a1e5c67a6a72f384a1d3bcb40c012"
    },
  },


  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: 'Mzadaty',
      htmlAttrs: { lang: 'ar' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Mzadaty' },
        { name: 'google', content: 'notranslate' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }],
    },
  },

  // i18n module setup
  modules: [ 
    '@nuxtjs/i18n', 
    '@primevue/nuxt-module' , 
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  imports: {
    dirs: ['stores' , 'composables' , 'helpers'], // Automatically import Pinia stores from the `stores` directory
  },



  primevue: {
    autoImport : true ,
    options: {
      // unstyled: true,
      zIndex: {
        modal: 3000
      },
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark',
          cssLayer: false
        }
      }
    }
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },

    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
        dir: 'ltr',
      },
      {
        code: 'ar',
        iso: 'ar-SA',
        file: 'ar.json',
        name: 'العربية',
        dir: 'rtl',
      },
    ],
    langDir: '../locales/',
    lazy: true,
    strategy: 'prefix_except_default',
    defaultLocale: 'ar',
    vueI18n: './i18n.config.ts',
  },

  css: [
    "~/assets/css/style.css",
    "primeicons/primeicons.css"
    // 'primevue/resources/themes/aura-light-green/theme.css'
  ],
  // Enable universal mode for SPA fallback
  ssr: false,


  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_variables.scss" as *;
            @use "~/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },
});