import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueApollo from 'vue-apollo';
import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './graphql/client';

Vue.use(VueApollo);

Vue.config.productionTip = false

new Vue({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
