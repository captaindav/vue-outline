import { make } from 'vuex-pathify'
import { keyBy } from 'lodash'

const state = {
  selected: undefined,
  servers: [
    { id: '1234', name: 'Server 1', uri: 'http://drupal-outline.lndo.site/outline-graphql', disabled: false },
  ],
  outlines: {}
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  async genServer ({ dispatch }, server) {
    const { id, uri } = server 
    await dispatch('graphql/generateClient', { id, uri }, { root: true })
    const outlines = await dispatch('graphql/fetchOutlines', id, { root: true })
    // state.outlines[id] = Object.keys(keyBy(outlines, 'eid'))
    state.outlines = Object.assign({}, { ...state.outlines, [id]: Object.keys(keyBy(outlines, 'eid')) })
  },
  async init ({ dispatch, state }) {
    for (const server of state.servers) {
      await dispatch('genServer', server)
    }
  },
}
//keyBy
const getters = make.getters(state)

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}