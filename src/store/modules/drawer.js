import { make } from 'vuex-pathify'

const state = {
  items: [
    'outlines'
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