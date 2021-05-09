export default {
  buildModules: [
    '@nuxtjs/apollo',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/vuetify',
    'druxt'
  ],
  apollo: {
    tokenName: "nuxt-apollo", // specify token name
    cookieAttributes: {
      expires: 7 // optional, default: 7 (days)
    },
    defaultOptions: {
      $query: {
        fetchPolicy: "network-only",
        errorPolicy: "all"
      }
    },
    watchLoading: "@/apollo/loadingHandler.js",
    errorHandler: "@/apollo/errorHandler.js",
    clientConfigs: {
      default: {
        httpEndpoint: 'http://drupal-outline.lndo.site/outline-graphql'
      }
    }
  },
  druxt: {
    baseUrl: 'http://drupal-outline.lndo.site/'
  },
  vuetify: {
    optionsPath: '@/plugins/vuetify.js',
    treeShake: true,
  },
  plugins: [
    { src: '@/plugins/socket-io.js', ssr: false },
  ]
}