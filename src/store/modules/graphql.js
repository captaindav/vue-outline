import { make } from 'vuex-pathify'
import graphqlClient from '../../graphql/client';
// import gql from 'graphql-tag';

// queries
import outlinesQuery from '../../graphql/outline/queries/outlines.query.gql';
import entryQuery from '../../graphql/outline/queries/entry.query.gql';

//mutations
import addEntryMutation from '../../graphql/entry/mutations/addEntry.mutation.gql';
import deleteEntryMutation from '../../graphql/entry/mutations/deleteEntry.mutation.gql';
import renameEntryMutation from '../../graphql/entry/mutations/renameEntry.mutation.gql';
import expandMutation from '../../graphql/entry/mutations/expand.mutation.gql';
import collapseMutation from '../../graphql/entry/mutations/collapse.mutation.gql';
import setParentMutation from '../../graphql/entry/mutations/setParentEntry.mutation.gql';


const state = {
  outlines: [],
  entries: [],
}

const mutations = make.mutations(state)

const actions = {
  ...make.mutations(state),
  async addEntry (store, parentEid) {
    console.log('Adding', parentEid);
    const { data: { addEntry } } = await graphqlClient.mutate({
      mutation: addEntryMutation,
      variables: { parentEid }
    })
    return addEntry
  },
  async collapseEntry (store, eid) {
    console.log('Collapse', eid);
    return await graphqlClient.mutate({
      mutation: collapseMutation,
      variables: { eid } 
    })
  },
  async deleteEntry (store, eid) {
    console.log('Delete', eid);
    return await graphqlClient.mutate({
      mutation: deleteEntryMutation,
      variables: { eid } 
    })
  },
  async expandEntry (store, eid) {
    console.log('Expand', eid);
    return await graphqlClient.mutate({
      mutation: expandMutation,
      variables: { eid } 
    })
  },
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
    commit('entries', entry)
    // loading.children = false
    return entry
  },
  async renameEntry (store, parentEid) {
    console.log('Rename', parentEid);
    return await graphqlClient.mutate({
      mutation: renameEntryMutation,
      variables: { parentEid }
    })
  },
  async setParentEntry (store, { eid, parentEid }) {
    console.log('SetParent', eid, parentEid);
    return await graphqlClient.mutate({
      mutation: setParentMutation,
      variables: { eid, parentEid }
    })
  },
}

const getters = make.getters(state)

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}