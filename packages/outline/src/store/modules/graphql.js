import { make } from 'vuex-pathify'
import graphqlClient from '../../graphql/client';
import { indexOf } from 'lodash';
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
  clients: {},
  entries: [],
  isFetchingEntries: false,
  isFetchingOutlines: false,
  opened: [],
  outlines: [],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  async addEntry (store, { parentEid, server }) {
    console.log('Adding', parentEid, 'server:', server);
    const client = state.clients[server]
    const { data: { addEntry } } = await client.mutate({
      mutation: addEntryMutation,
      variables: { parentEid }
    })
    return addEntry
  },
  async collapseEntry ({ state }, { eid, server }) {
    console.log('Collapse', eid);
    const client = state.clients[server]
    const collapse = await client.mutate({
      mutation: collapseMutation,
      variables: { eid }
    })
    const ind = indexOf(state.open, eid)
    state.opened.splice(ind, 1)
    
    return collapse
  },
  async deleteEntry (store, { eid, server }) {
    console.log('Delete:', eid, 'server:', server);
    const client = state.clients[server]
    return await client.mutate({
      mutation: deleteEntryMutation,
      variables: { eid } 
    })
  },
  async expandEntry ({ state }, { eid, server }) {
    console.log('Expand:', eid, 'server:', server);
    const client = state.clients[server]
    const expand = await client.mutate({
      mutation: expandMutation,
      variables: { eid } 
    })
    state.opened.push(eid)
    return expand
  },
  async fetchOutlines ({ commit, dispatch, state }, server) {
    commit('isFetchingOutlines', true)
    const client = state.clients[server]
    const response = await client.query({ query: outlinesQuery })
    const { data: { outlines: { outlines } } } = response
    const items = []
    for (const outline of outlines) {
      const { rootEntry } = outline
      let children = rootEntry.childCount > 0 ? [] : undefined
      if (rootEntry.expanded && rootEntry.childCount > 0) {
        const entry = await dispatch('fetchEntry', rootEntry.eid)
        children = entry.children
        state.opened.push(rootEntry.eid)
      }
      items.push({ ...rootEntry, children, server })
    }
    state.outlines.push(...items)
    commit('isFetchingOutlines', false)
    return items
  },
  async fetchEntry ({ commit, state }, { eid, server }) {
    commit('isFetchingOutlines', true)
    const client = state.clients[server]
    const response = await client.query({ query: entryQuery, variables: { eid } })
    const { data: { entry } } = response
    
    state.entries.push({ ...entry, server })
    // commit('entries', entry)
    commit('isFetchingOutlines', false)
    return entry
  },
  async generateClient ({ state }, server) {
    const { id, uri } = server
    state.clients[id] = graphqlClient(uri)
    return state.clients[id]
  },
  async renameEntry (store, { parentEid, server }) {
    console.log('Rename:', parentEid, 'server:', server);
    const client = state.clients[server]
    return await client.mutate({
      mutation: renameEntryMutation,
      variables: { parentEid }
    })
  },
  async setParentEntry (store, { eid, parentEid, server }) {
    console.log('SetParent:', eid, parentEid, 'server:', server);
    const client = state.clients[server]
    return await client.mutate({
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