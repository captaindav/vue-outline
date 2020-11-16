import { make } from 'vuex-pathify'

const state = {
  active: [],
  activeItem: null,
  cutItem: null,
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