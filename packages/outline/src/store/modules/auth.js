import { make } from 'vuex-pathify'

const state = {
  activeServers: [0],
  availableServers: [
    { sid: 1, name: 'Server 1' },
    { sid: 2, name: 'Server 2', disabled: true },
    { sid: 3, name: 'Server 3', disabled: true },
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