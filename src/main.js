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
  vuetify,
  render: h => h(App)
}).$mount('#app')
