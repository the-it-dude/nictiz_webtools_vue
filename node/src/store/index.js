import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Termspace tools
import Epd from './modules/Epd'
import TermspaceComments from './modules/Terminologie/TermspaceComments'
import TermspaceProgress from './modules/Terminologie/TermspaceProgress'

// Mapping tools
import MappingComments from './modules/Terminologie/MappingComments'
import MappingProjects from './modules/Mapping/ProjectsConnection'
import MappingTasks from './modules/Mapping/TasksConnection'
import RcAuditConnection from './modules/Mapping/RcAuditConnection'
import TaskManager from './modules/Mapping/TaskManagerConnection'
import MappingAudits from './modules/Mapping/AuditsConnection'
import MappingCodesystems from './modules/Mapping/CodesystemsConnection'
import MappingLookup from './modules/Mapping/MappingLookup'

// Demo's
import IntegratedCodePicker from './modules/DHD/IntegratedCodePicker'
import Postco from './modules/DHD/Postco'
import MRCM from './modules/DHD/MRCM'
import TreeView from './modules/DHD/TreeView'

// Snowstorm integration
import Snowstorm from './modules/DHD/Snowstorm'

// Validation patientfriendly descriptions
import Validation from './modules/Validation/ValidationConnection'

// Framework modules
import { authentication } from './authentication.module';
import { alert } from './alert.module';
// import { userService } from '@/services';
// import router from '@/router/index.js';

Vue.use(Vuex)
Vue.use(axios)

//var envBaseUrl = 'https://termservice.test-nictiz.nl/'
var envBaseUrl = 'https://mapping.nictiz.deitdude.nl/'
console.log(process.env);
if(process.env['NODE_ENV'] == 'development'){
  envBaseUrl = 'http://localhost:8000/'
}
//if (process.env.BASE_URL) {
//  envBaseUrl = process.env.BASE_URL
//}

export default new Vuex.Store({
  state: {
    baseUrl: envBaseUrl,
    userData: {
      'id': null,
      'groups' : [],
      'permissions' : []
    },
  },
  modules: {
      Epd,
      TermspaceComments,
      Snowstorm,
      Validation,
      TreeView,
      MRCM,
      Postco,
      MappingTasks,
      MappingComments,
      MappingProjects,
      MappingLookup,
      MappingCodesystems,
      authentication,
      MappingAudits,
      TermspaceProgress,
      RcAuditConnection,
      IntegratedCodePicker,
      TaskManager,
      alert,
  },
  actions: {
    getPermissions: (context) => {
      axios
      .get(context.state.baseUrl+'jwtauth/permissions/')
      .then(response => {
        context.commit('setPermissions', response);
      })
    },
  },
  mutations: {
    setPermissions(state, response) {
      state.userData = response.data
    }
  }
})
