import RequestService from './request.service';

class MappingTaskService {
    get_parts(projectId, taskId, params) {
        // Get list of task parts
        return RequestService.get_response(RequestService.task_url(projectId, taskId, 'parts'), params)
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

}

export default new MappingTaskService();
