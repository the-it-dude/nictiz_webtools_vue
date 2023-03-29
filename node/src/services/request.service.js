import axios from 'axios'
import store from '@/store/index.js'


class RequestService {

    get_response(url, params) {
        return axios
        .get(
            url + this.convert_params(params)
        ).then((response) => {
            return response.data
        })
    }

    project_url(projectId) {
        return store.state.baseUrl + 'mapping/api/1.0/projects/' + projectId + '/'
    }

    task_url(projectId, taskId, section) {
        let url = this.project_url(projectId) + 'tasks/' + taskId + '/'
        if (section !== undefined) {
            url += section + '/'
        }
        return url;

    }
    convert_params(params) {
        if (params) {
            return "?" + Object.keys(params).map((k) => k + "=" + params[k]).join("&")
        } else {
            return ''
        }
    }
}

export default new RequestService();
