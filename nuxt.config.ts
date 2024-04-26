import typescript from '@rollup/plugin-typescript';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
    apiSecret: {
      ipGeoApiKey: process.env.IP_GELOCATION_API_KEY
    }
  },
  build: {
    transpile: ['ip-geolocation-api-sdk-typescript']
  },
  nitro: {
    rollupConfig: {
      //@ts-ignore
      plugins: [typescript()]
    }
  }
})
