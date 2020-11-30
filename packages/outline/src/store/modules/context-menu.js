import { make } from 'vuex-pathify'

const state = {
  show: false,
  edit: false,
  x: 0,
  y: 0,
}

const mutations = make.mutations(state)

const actions = {
  ...make.mutations(state),
  async openMenu ({ commit, dispatch }, data) {
    data.e.preventDefault()
    commit('show', false)
    commit('x', data.e.clientX)
    commit('y', data.e.clientY)
    dispatch('treeview/setActive', [data.item.eid], { root: true })
    dispatch('treeview/setActiveItem', data.item, { root: true })
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