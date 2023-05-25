import RequestService from './request.service';

class MappingTaskService {
    get_parts(projectId, taskId, params) {
        // Get list of task parts
        return RequestService.get_response(RequestService.task_url(projectId, taskId, 'parts'), params)
    }

    post_parts(projectId, taskId, payload) {
        return RequestService.post_response(RequestService.base_url() + "mappings/", payload)
    }

    get_reverse_mappings(projectId, taskId, params) {
        // Get list of reverse mappings
        return RequestService.get_response(RequestService.task_url(projectId, taskId, 'reverse-mappings'), params)
   }

    get_related_tasks(projectId, taskId, params) {
        // Related Tasks list
        return RequestService.get_response(RequestService.task_url(projectId, taskId, 'related-tasks'), params)
    }

    get_exclusions(projectId, taskId, params) {
      return RequestService.get_response(RequestService.task_url(projectId, taskId, 'exclusions'), params)
    }

    get_results(projectId, taskId, params) {
      return RequestService.get_response(RequestService.task_url(projectId, taskId, 'results'), params)
    }

    get_rules(projectId, taskId, params) {
      return RequestService.get_response(RequestService.task_url(projectId, taskId, 'rules'), params)
    }

    create_rules(projectId, taskId, params) {
      // TODO: Replace with new API.
      return RequestService.get_response(RequestService.base_url() + "mappings_ecl_to_rules/" + taskId + "/", params)
    }

    delete_rules(projectId, taskId, params) {
      // TODO: Replace with new API.
      return RequestService.get_response(RequestService.base_url() + "remove_rules/" + taskId + "/", params)
    }

    get_automap(projectId, taskId, params) {
        console.log(projectId, taskId, params)
        // TODO: Replace with new API.
        return RequestService.get_response(RequestService.base_url() + "automap/" + taskId + "/", params)
    }

    get_audits(projectId, taskId, params) {
        console.log(projectId, taskId, params)
        // TODO: Replace with new API.
        return RequestService.get_response(RequestService.base_url() + "audits/" + taskId + "/", params)
    }

    get_comments(projectId, taskId, params) {
        console.log(projectId, taskId, params)
        // TODO: Replace with new API.
        return RequestService.get_response(RequestService.base_url() + "events_and_comments/" + taskId + "/", params)
    }

    get_targets(projectId, taskId, params) {
        // TODO: Replace with new API.
        return RequestService.get_response(RequestService.base_url() + "mappings/" + taskId + "/", params)
    }

    search_targets(projectId, taskId, params) {
        return RequestService.post_response(RequestService.base_url() + "componentsearch/", params)
    }

    create_targets(projectId, taskId, params) {
        return RequestService.post_response(RequestService.base_url() + "mappings/", params)
    }

    get_dialog_data(projectId, taskId, mappingId, params) {
        return RequestService.get_response(RequestService.base_url() + "mapping_dialog/" + mappingId + "/", params)
    }
}

export default new MappingTaskService();
