import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  env: {},
  head: {
    title: 'nuxt-community/typescript-template',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'A project quickly'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@300&family=Poppins:wght@600&display=swap'
    },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap'
    }]
  },
  loading: { color: '#0c64c1' },
  css: [
    // "@/assets/css/reset_udy.css",
    '@/assets/css/app.css'
  ],
  components: [
    '@/components/',
    '@/components/graphics/',
    '@/components/navigation/',
    '@/components/blog/',
    '@/components/generic/',
    '@/components/content/'
    // ,
    // '@/components/eco/',
    // '@/components/events/'
  ],
  modules: [
    '@nuxtjs/svg',
    // '@nuxtjs/style-resources',
    'nuxt-mq'
  ],
  mq: {
    defaultBreakpoint: 'mobile',
    breakpoints: {
      phone: 567,
      tablet: 568,
      mobile: 1024,
      laptop: 1025,
      desktop: 1280,
      monitor: 1448
    }
  },
  plugins: [
    '~/plugins/truncate'
  ],
  layoutTransition: {
    name: 'my-layouts',
    mode: 'out-in'
  },
  build: {},
  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxt/typescript-build'
  ]

}

export default config
