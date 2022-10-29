import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable */
Vue.use(Vuex)

const userStore = {
    state: {
        user: {
            _id: null,
            name: null,
            email: null,
        },
    },
    getters: {

    },
    mutations: {

        updateUser(state, body) {
            state.user._id = body._id
            state.user.name = body.name
            state.user.email = body.email

        },

    },
    actions: {
        updateUser(context, body) {
            context.commit('updateUser', body)
        },

    },
    modules: {
    }
}



export default userStore