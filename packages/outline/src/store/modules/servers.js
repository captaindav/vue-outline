import { make } from 'vuex-pathify'

const state = {
  selected: undefined,
  servers: [
    { name: 'Server 1', uri: 'http://drupal-outline.lndo.site/outline-graphql', disabled: false },
  ],
}

const mutations = make.mutations(state)

const actions = make.actions(state)

const getters = make.getters(state)

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}