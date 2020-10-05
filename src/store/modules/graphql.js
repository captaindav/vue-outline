import { make } from 'vuex-pathify'
import graphqlClient from '../../graphql/client';
import outlinesQuery from '../../graphql/outline/queries/outlines.query.gql';
import entryQuery from '../../graphql/outline/queries/entry.query.gql';
// import gql from 'graphql-tag';

const state = {
  outlines: [],
  entries: [],
}

const mutations = make.mutations(state)
console.log(mutations)
const actions = {
  ...make.mutations(state),
  async fetchOutlines ({ commit }) {
    const response = await graphqlClient.query({ query: outlinesQuery })
    const { data: { outlines: { outlines } } } = response
    const items = []
    for (const outline of outlines) {
      const { rootEntry } = outline
      items.push({ ...rootEntry, children: [] })
    }
    commit('outlines', items)
    // loading.children = false
    return items
  },
  async fetchEntry ({ commit }, id) {
    const response = await graphqlClient.query({ query: entryQuery, variables: { eid: id } })
    const { data: { entry } } = response
    console.log('t', entry);
    commit('entries', entry)
    // loading.children = false
    return entry
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