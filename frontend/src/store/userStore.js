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
        logout(state, body) {
            localStorage.removeItem("_id");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            state.user._id = null
            state.user.name = null
            state.user.email = null
        }

    },
    actions: {
        updateUser(context, body) {
            context.commit('updateUser', body)
        },
        logout(context, body) {
            context.commit('logout', body)
        }

    },
    modules: {
    }
}



export default userStore