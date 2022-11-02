import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable */
Vue.use(Vuex)

const fileStore = {
    state: {
        file: [],
        view: 'list',
        toActionFiles: [],
        folder: [],
        current_folder: 'none',
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
                    url: element.url,
                    parent: element.parent
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
        },

        updateFolders(state, body) {
            const data = body;
            data.forEach((element) => {
                var dat = {
                    id: element._id,
                    name: element.name,
                    parent: element.parent,
                }
                state.folder.push(dat)
                // console.log(element)
            })
        },

        updateFolderParent(state, body) {
            state.current_folder = body
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
        },
        updateFolderParent(context, body) {
            context.commit('updateFolderParent', body)
        },
        updateFolders(context, body) {
            context.commit('updateFolders', body)
        },

    },
    modules: {
    }
}



export default fileStore