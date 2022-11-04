import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable */
Vue.use(Vuex)

const fileStore = {
    state: {
        view: 'list',
        file: [],
        folder: [],
        toActionFiles: [],
        toActionFolders: [],
        current_folder: 'none',
        bread_crumb: [{
            name: 'Dashboard',
            id: 'none'
        }]
    },
    getters: {

    },
    mutations: {

        updateFiles(state, body) {
            state.file = []

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

        updateFolderAction(state, body) {
            state.toActionFolders = body
        },

        updateFolders(state, body) {
            state.folder = []
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
        },

        addBreadCrumb(state, body) {

            state.bread_crumb.push(body)
        },
        removeBreadCrumb(state, body) {
            if (body.type === 'all') {
                state.bread_crumb = [
                    {
                        name: 'Dashboard',
                        id: 'none'
                    }
                ]
            } else {
                state.bread_crumb = state.bread_crumb.filter((item) => {
                    return state.bread_crumb.id !== body.id
                })
            }

        },
        clearData(state, body) {
            state.file = [];
            state.folder = [];
            state.toActionFiles = [];
            state.toActionFolders = [];
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
        addBreadCrumb(context, body) {
            context.commit('addBreadCrumb', body)
        },
        updateFolderAction(context, body) {
            context.commit('updateFolderAction', body)
        },
        clearData(context, body) {
            context.commit('clearData', body)
        }

    },
    modules: {
    }
}



export default fileStore