import { make } from 'vuex-pathify'
import graphqlClient from '../../graphql/client';
import { indexOf } from 'lodash';
// import gql from 'graphql-tag';

// queries
import outlinesQuery from '../../graphql/outline/queries/outlines.query.gql';
import entryQuery from '../../graphql/outline/queries/entry.query.gql';

//mutations
import addEntryMutation from '../../graphql/entry/mutations/addEntry.mutation.gql';
import collapseMutation from '../../graphql/entry/mutations/collapse.mutation.gql';
import deleteEntryMutation from '../../graphql/entry/mutations/deleteEntry.mutation.gql';
import expandMutation from '../../graphql/entry/mutations/expand.mutation.gql';
import renameEntryMutation from '../../graphql/entry/mutations/renameEntry.mutation.gql';
import setParentMutation from '../../graphql/entry/mutations/setParentEntry.mutation.gql';


const state = {
  activeOutlines: [],
  clients: {},
  commands: {
    query: {
      outlinesQuery,
      entryQuery,
    },
    mutate: {
      addEntryMutation,
      collapseMutation,
      deleteEntryMutation,
      expandMutation,
      renameEntryMutation,
      setParentMutation,
    },
  },
  entries: [],
  isFetchingEntries: false,
  isFetchingOutlines: false,
  opened: [],
  outlines: [],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  async addEntry ({ dispatch }, { parentEid, server }) {
    console.log('Adding', parentEid, 'server:', server);
    return await dispatch('executeGraphql', {
      command: 'addEntryMutation',
      server,
      type: 'mutate',
      variables: { parentEid },
    })
  },
  async collapseEntry ({ dispatch, state }, { eid, server }) {
    console.log('Collapse', eid);
    const collapse = await dispatch('executeGraphql', {
      command: 'collapseMutation',
      server,
      type: 'mutate',
      variables: { eid },
    })
    const ind = indexOf(state.open, eid)
    state.opened.splice(ind, 1)
    
    return collapse
  },
  async deleteEntry ({ dispatch }, { eid, server }) {
    console.log('Delete:', eid, 'server:', server);
    return await dispatch('executeGraphql', {
      command: 'deleteEntryMutation',
      server,
      type: 'mutate',
      variables: { eid },
    })
  },
  async executeGraphql ({ state }, { command, server, type, variables }) {
    console.log('execute:', type, command, server)
    const client = state.clients[server]
    const action = state.commands[type][command]
    
    const { data } = await client[type]({
      [type === 'mutate' ? 'mutation' : type]: action,
      variables
    })
    return data
  },
  async expandEntry ({ dispatch, state }, { eid, server }) {
    console.log('Expand:', eid, 'server:', server);
    const expand = await dispatch('executeGraphql', {
      command: 'expandMutation',
      server,
      type: 'mutate',
      variables: { eid },
    })
    state.opened.push(eid)
    return expand
  },
  async fetchOutlines ({ commit, dispatch, state }, server) {
    commit('isFetchingOutlines', true)
    const { outlines: { outlines } } = await dispatch('executeGraphql', {
      command: 'outlinesQuery',
      server,
      type: 'query',
    })
    const items = []
    for (const outline of outlines) {
      const { rootEntry } = outline
      let children = rootEntry.childCount > 0 ? [] : undefined
      if (rootEntry.expanded && rootEntry.childCount > 0) {
        const entry = await dispatch('fetchEntry', { eid: rootEntry.eid, server })
        children = entry.children
        state.opened.push(rootEntry.eid)
      }
      items.push({ ...rootEntry, children, server })
    }
    state.outlines.push(...items)
    commit('isFetchingOutlines', false)
    return items
  },
  async fetchEntry ({ commit, dispatch, state }, { eid, server }) {
    commit('isFetchingOutlines', true)
    const { entry } = await dispatch('executeGraphql', {
      command: 'entryQuery',
      server,
      type: 'query',
      variables: { eid, server },
    })
    state.entries.push({ ...entry, server })
    commit('isFetchingOutlines', false)
    return entry
  },
  async generateClient ({ state }, server) {
    const { id, uri } = server
    state.clients[id] = graphqlClient(uri)
    return state.clients[id]
  },
  async renameEntry ({ dispatch }, { parentEid, server }) {
    console.log('Rename:', parentEid, 'server:', server);
    return await dispatch('executeGraphql', {
      command: 'renameEntryMutation',
      server,
      type: 'mutate',
      variables: { parentEid },
    })
  },
  async setParentEntry ({ dispatch }, { eid, parentEid, server }) {
    console.log('SetParent:', eid, parentEid, 'server:', server);
    return await dispatch('executeGraphql', {
      command: 'setParentMutation',
      server,
      type: 'mutate',
      variables: { eid, parentEid },
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