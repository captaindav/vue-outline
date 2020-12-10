import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import store from './../store'

const host = 'http://localhost:8090'
const socket = io(host, {
  reconnection: false
})

Vue.use(VueSocketIOExt, socket, { store })
