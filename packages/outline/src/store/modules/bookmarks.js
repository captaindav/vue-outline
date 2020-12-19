import { make } from 'vuex-pathify'

const state = {
  active: 0,
  outlines: [],
  bookmarks: [
    { icon: 'mdi-file', name: 'Bookmark 1', outlines: [1] },
    { icon: 'mdi-file-alert', name: 'Bookmark 2', outlines: [2] },
    { icon: 'mdi-file-chart', name: 'Bookmark 3', outlines: [3] },
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