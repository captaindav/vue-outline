import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { provide } from '@vue/composition-api';
import VueCompositionApi from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './graphql/client';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  // apolloProvider: createProvider(),
  vuetify,
  render: h => h(App)
}).$mount('#app')


//import { createProvider } from './vue-apollo'

// GRAPHQL STUFF
// import VueCompositionApi, { provide } from '@vue/composition-api'
// import ApolloClient from 'apollo-boost'
// const apolloClient = new ApolloClient({
//   connectToDevTools: true,
//   uri: "http://drupal-outline.lndo.site/outline-graphql"
// })
