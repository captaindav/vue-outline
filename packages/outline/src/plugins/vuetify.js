import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// Components
import CustomIcon from '../components/CustomIcon'

Vue.component('custom-icon', CustomIcon)

Vue.use(Vuetify);

const options = {
  icons: {
    values: {
      outline: {
        component: CustomIcon,
        props: {
          icon: 'outline',
        },
      }
    }
  }
}

export default new Vuetify(options);
