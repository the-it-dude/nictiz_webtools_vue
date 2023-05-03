import axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'

const state = {
    loading: {
      'tasklist' : false,
      'details' : false,
      'comments' : false,
      'targets' : false,
      'dialog' : false,
      'search' : false,
      'eclqueries' : false,
      'reverse' : false,
      'eclToRules' : false,
      'reverseExclusions' : false,
      'automap' : false,
    },
    tasks: [],
    selectedTask: {},
    selectedTaskComments: false,
    relatedTasks: [],
    mappingTargets: {},
    commentDraft: '',
    searchResults: [],
    searchByComponentResults: [],
    dialogData: {
      'component':{},
    },
    eclQueries: [],
    reverse: [],
    reverseExclusions: [],
    automap: [],
  }

  //// ---- Mutations
  const mutations = {
    setTasks: (state, payload) => {
      state.tasks = payload
    },
    setTaskDetails: (state, payload) => {
      state.selectedTask = payload
    },
    setComments: (state, payload) => {
      state.selectedTaskComments = payload
    },
    setTargets: (state, payload) => {
      state.mappingTargets = payload
    },
    setEclQueries: (state, payload) => {
      state.eclQueries = payload
    },
    setReverse: (state, payload) => {
      state.reverse = payload
    },
    setReverseExclusions: (state, payload) => {
      state.reverseExclusions = payload
    },
    setSearchResults: (state, payload) => {
      state.searchResults = payload
    },
    setDialogData: (state, payload) => {
      state.dialogData = payload
    },
    resetDialogData: (state) => {
      state.dialogData = {'component':{}}
    },
    setRelatedTasks: (state, payload) => {
      state.relatedTasks = payload
    },
    setSearchByComponentResults: (state, payload) => {
      state.searchByComponentResults = payload
    },
    clearTaskMemory: (state) => {
      state.tasks = []
      state.selectedTask = false
      state.eclQueries = false
      state.reverse = false
      state.selectedTaskComments = false
      state.mappingTargets = false
      state.automap = []
    },
    setDraftComment: (state, payload) => {
      state.commentDraft = payload
    },
    setAutomap: (state, payload) => {
      state.automap = payload
    }
  }

  //// ---- Actions
  const actions = {
    saveDraftComment: (context, comment) => {
      context.commit('setDraftComment', comment)
    },
    getAutomap: (context, taskid) => {
      context.state.loading.automap = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/automap/'+taskid+'/')
      .then((response) => {
          context.commit('setAutomap',response.data)
          context.state.loading.automap = false
          return true;
      })
    },
    getTasks: (context, projectid) => {
      context.state.loading.tasklist = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/tasklist/'+projectid+'/')
      .then((response) => {
          context.commit('setTasks', response.data.results)
          context.state.loading.tasklist = false
          return true;
      })
    },
    resetTask: (context, task_id) => {
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/mapping_reset_task/'+task_id+'/')
      .then(() => {
          return true;
      })
    },
    getRelatedTasks: (context, componentid) => {
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/related_tasks/'+componentid+'/')
      .then((response) => {
          context.commit('setRelatedTasks',response.data)
          return true;
      })
    },
    getReverseExclusions: (context, component_id) => {
      context.state.loading.reverseExclusions = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/mapping_reverse_exclusions/'+component_id+'/')
      .then((response) => {
          context.commit('setReverseExclusions',response.data)
          context.state.loading.reverseExclusions = false
          return true;
      })
    },
    getTaskDetails: (context, taskid) => {
      context.state.loading.details = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/taskdetails/'+taskid+'/')
      .then((response) => {
          context.commit('setTaskDetails',response.data)
          context.state.loading.details = false
          return true;
      })
    },
    getComments: (context, taskid) => {
      context.state.loading.comments = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/events_and_comments/'+taskid+'/')
      .then((response) => {
          context.commit('setComments',response.data)
          context.state.loading.comments = false
          return true;
      })
    },
    getMappingTargets: (context, taskid) => {
      context.state.loading.targets = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/mappings/'+taskid+'/')
      .then((response) => {
          context.commit('setTargets',response.data)
          context.state.loading.targets = false
          return true;
      })
    },
    getReverse: (context, taskid) => {
      context.state.loading.reverse = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/reverse/'+taskid+'/')
      .then((response) => {
          context.commit('setReverse',response.data)
          context.state.loading.reverse = false
          return true;
      })
    },
    getEclQueries: (context, taskid) => {
      context.state.loading.eclqueries = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/eclqueries/'+taskid+'/')
      .then((response) => {
          context.commit('setQueries',response.data)
          context.state.loading.eclqueries = false
          return true;
      })
    },
    getDialogData: (context, mappingid) => {
      context.state.loading.dialog = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/mapping_dialog/'+mappingid+'/')
      .then((response) => {
          context.commit('setDialogData',response.data)
          context.state.loading.dialog = false
          return true;
      })
    },
    saveDialogTarget:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      return axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/mapping_dialog/', {
        'mapping' : context.state.dialogData,
        'task' : context.state.selectedTask.id,
        'new' : payload,
      },auth)
      .then(() => {
        // context.dispatch('getMappingTargets',context.state.selectedTask.id)
        context.commit('resetDialogData')
        return true
        }
      )
    },
    postMappingTargets:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/mappings/', {
        'targets' : payload,
        'task' : context.state.selectedTask.id,
      },auth)
      .then(() => {
        context.dispatch('getMappingTargets',context.state.selectedTask.id)
        return true;
        }
      )
    },

    // Creeert een exclusie van source naar target
    addRemoteExclusion:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      return axios
      .post(context.rootState.baseUrl + 'mapping/api/1.0/mapping_add_remote_exclusion/', {
        'payload' : payload,
      },auth)
      .then((response) => {
        context.dispatch('getReverseExclusions', payload["task"])

        if (response.data !== "0") {
            var commentPayload = {
              'comment' : 'Exclusie voor ['+payload.targetComponent+'] toegevoegd.',
              'taskId' : response.data,
            }
            context.dispatch('postComment', commentPayload)
        }
        return true;
      })
    },

    // Voegt een mapping naar een concept toe
    addMappingFromReverse:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      return axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/mapping_add_from_reverse/', {
        'payload' : payload,
      },auth)
      .then(() => {
        context.dispatch('getMappingTargets',context.state.selectedTask.id)
        return true;
      })
    },
    // Verwijderd een reverse mapping
    removeReverseMapping:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      return axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/mapping_remove_reverse/', {
        'payload' : payload,
      },auth)
      .then((response) => {
        context.dispatch('getTaskDetails',context.state.selectedTask.id)
        context.dispatch('getReverseExclusions', context.state.selectedTask.id)

        var commentPayload = {
          'comment' : 'Exclusie voor ['+payload.component+'] verwijderd.',
          'taskId' : response.data,
        }
        context.dispatch('postComment',commentPayload)
        return true;
      })
    },

    postMappingExclusions:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      return axios
      .post(context.rootState.baseUrl + 'mapping/api/1.0/mapping_exclusions/', {
        'payload' : payload,
      },auth)
    },

    mappingsEclToRules: (context, taskid) => {
      context.state.loading.eclToRules = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/mappings_ecl_to_rules/'+taskid+'/')
      .then(() => {
          context.dispatch('getMappingTargets',context.state.selectedTask.id)
          context.state.loading.eclToRules = false
          return true;
      })
    },
    mappingsEclToRulesEntireProject: (context, projectid) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/mappings_ecl_to_rules/', {
        'id' : projectid
      }, auth)
      .then(() => {
          return true;
      })
    },

    removeMappingRules: (context, taskid) => {
      context.state.loading.eclToRules = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/remove_rules/'+taskid+'/')
      .then(() => {
          context.dispatch('getMappingTargets',context.state.selectedTask.id)
          context.state.loading.eclToRules = false
          return true;
      })
    },

    TargetSearch: _.debounce((context, payload) => {
        context.state.loading.search = true
        const auth = {
          headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
          withCredentials: true
        }
        axios
        .post(context.rootState.baseUrl+'mapping/api/1.0/componentsearch/', {
          'query' : payload,
        },auth)
        .then((response) => {
          context.commit('setSearchResults',response.data)
          context.state.loading.search = false
          return true;
          }
        )
    }, 500),

    searchByComponent:(context, conceptid) => {
        context.state.loading.search = true
        const auth = {
          headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
          withCredentials: true
        }
        axios
        .post(context.rootState.baseUrl+'mapping/api/1.0/search_by_component/', {
          'query' : conceptid,
        },auth)
        .then((response) => {
          context.commit('setSearchByComponentResults',response.data)
          context.state.loading.search = false
          return true;
          }
        )
    },
    postComment:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/comments/', {
        'comment' : payload.comment,
        'task' : payload.taskId,
      },auth)
      .then(() => {
        // context.dispatch('getComments',context.state.selectedTask.id)
        return true;
        }
      )
    },
    deleteComment: (context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .delete(context.rootState.baseUrl+'mapping/api/1.0/comments/'+payload+'/', auth)
      .then(() => {
        context.dispatch('getComments',context.state.selectedTask.id)
        return true;
        }
      )
    },
    changeUser:(context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios.post(
        context.rootState.baseUrl + 'mapping/api/1.0/users/' + payload.projectId + "/", {
          'user': payload.userId,
          'task': payload.taskId,
        },
        auth
      ).then(() => {
        // context.dispatch('getTaskDetails', payload.taskId)
        // context.dispatch('getTasks', payload.taskId)
        // context.dispatch('getComments', payload.taskId)
        return true;
      })
    },
    changeStatus:(context, statusId, taskId) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/statuses/', {
        'status' : statusId,
        'task' : taskId,
      },auth)
      .then(() => {
        context.dispatch('getTaskDetails', taskId)
        context.dispatch('getTasks', taskId)
        context.dispatch('getComments', taskId)
        return true;
        }
      )
    },
  }

export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
}
