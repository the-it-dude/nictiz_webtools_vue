import RequestService from './request.service';

class MappingProjectService {
    get_task(projectId, taskId) {
        // Get task details
        return RequestService.get_response(RequestService.task_url(projectId, taskId))
    }

    get_tasks(projectId, params) {
        // Get Project tasks list
        return RequestService.get_response(RequestService.project_url(projectId) + 'tasks/', params)
    }

}

export default new MappingProjectService();
