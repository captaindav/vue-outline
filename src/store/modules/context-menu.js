import { make } from 'vuex-pathify'

const state = {
  show: false,
  x: 0,
  y: 0,
  menuItem: {},
  cutItem: null
}

const mutations = make.mutations(state)

const actions = {
  ...make.mutations(state),
  async openMenu ({ commit }, data) {
    data.e.preventDefault()
    commit('show', false)
    commit('x', data.e.clientX)
    commit('y', data.e.clientY)
    commit('menuItem', data.item)
    commit('show', true)
  }
}

const getters = make.getters(state)

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}