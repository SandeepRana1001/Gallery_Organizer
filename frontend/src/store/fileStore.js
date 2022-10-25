import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable */
Vue.use(Vuex)

const fileStore = {
    state: {
        file: [],
        view: 'list',
        toActionFiles: []
    },
    getters: {

    },
    mutations: {

        updateFiles(state, body) {
            const data = body;
            data.forEach((element) => {
                var dat = {
                    id: element._id,
                    displayName: element.displayName,
                    backend_name: element.backend_name,
                    url: element.url
                }
                state.file.push(dat)
                // console.log(element)
            })

        },

        updateView(state, body) {
            state.view = body.view
        },

        updateToAction(state, body) {
            state.toActionFiles = body
        }

    },
    actions: {
        updateFiles(context, body) {
            context.commit('updateFiles', body)
        },
        updateView(context, body) {
            context.commit('updateView', body)
        },
        updateToAction(context, body) {
            context.commit('updateToAction', body)
        }

    },
    modules: {
    }
}



export default fileStore