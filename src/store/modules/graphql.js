import { make } from 'vuex-pathify'
import graphqlClient from '../../graphql/client';
import outlinesQuery from '../../graphql/outline/queries/outlines.query.gql';
// import gql from 'graphql-tag';

const state = {
  outlines: [],
}

const mutations = make.mutations(state)

const actions = {
  ...make.mutations(state),
  async fetchOutlines ({ commit }) {
    const response = await graphqlClient.query({
      query: outlinesQuery
    })
    console.log(response)
    commit('setOutlines', response.data.outlines)
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