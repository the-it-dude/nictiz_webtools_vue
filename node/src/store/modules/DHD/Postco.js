import axios from 'axios'
// import { jwtHeader } from '@/helpers';
// import Vue from 'vue'
// import router from '@/router/index.js' //or whatever your router.js path is

const state = {
    templates: [],
    selectedTemplate: {},
    postcoComponents: [],
    loading: {
        'templates': false,
        'attributeValues': false,
    }
  }

  //// ---- Mutations
  const mutations = {
    setTemplates: (state, payload) => {
      state.templates = payload
      state.loading.templates = false
    },
    setSelectedTemplate: (state, payload) => {
      state.selectedTemplate = payload
      state.loading.templates = false
    },
    setValue: (state, payload) => {
      var attribute = payload.attribute
      var value = payload.value
      var objIndex = state.postcoComponents.findIndex((obj => obj.attribute == attribute))
      state.postcoComponents[objIndex].value = value
    },
    createAttribute: (state, payload) => {
      state.postcoComponents.push ({attribute: payload.attribute, type: payload.type, value: null})
    },
  }

  //// ---- Actions
  const actions = {
    // Get results
    getTemplates: (context) => {
      state.loading.templates = true
      axios
      .get(context.rootState.baseUrl+'postco/templates/')
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setTemplates',response.data)
        return true;
      })
    },
  }

export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
}