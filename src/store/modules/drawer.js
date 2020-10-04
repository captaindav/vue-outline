import { make } from 'vuex-pathify'

const state = {
  items: [
    { title: 'Home', icon: 'mdi-home-city' },
    { title: 'My Account', icon: 'mdi-account' },
    { title: 'Users', icon: 'mdi-account-group-outline' }
  ],
}

const mutations = make.mutations(state)

const actions = make.mutations(state)

const getters = make.getters(state)

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}