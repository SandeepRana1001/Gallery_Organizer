/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import fileStore from './fileStore'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        fileStore
    }
})