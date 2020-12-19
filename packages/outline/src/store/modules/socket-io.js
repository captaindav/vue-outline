import { make } from 'vuex-pathify'

const state = {
  data: null,
  loading: false,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  getPage({ commit }, data) {
    commit('loading', true)
    commit('data', null);
    this._vm.$socket.client.emit('get-page', data)
  },
  socket_returnPage ({ commit }, data) {
    commit('loading', false);
    commit('data', data.results);
    return data
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