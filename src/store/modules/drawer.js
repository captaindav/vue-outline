import { make } from 'vuex-pathify'

const state = {
  selected: 0,
  items: [
    { icon: 'mdi-home', outlines: [] },
    { icon: 'mdi-account', outlines: [1] },
    { icon: 'mdi-account', outlines: [2] },
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