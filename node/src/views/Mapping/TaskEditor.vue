<template>
    <div id="app">
            <v-col>
                <v-row no-gutters>
                    <v-col cols=12>
                        <v-card>
                            <v-card-title>{{selectedProject.title}}
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- <v-row v-if="user.groups.includes('groepen | nictiz')">
                    <v-col cols=12>
                        <v-alert type="warning">
                            Geniet, maar map met mate. <i>©Michael Verbeek, 2020</i>
                        </v-alert>
                    </v-col>
                </v-row> -->
                <!-- Interface 1-N mapping -->
                <v-row no-gutters v-if="selectedProject && (selectedProject.type == '1')">
                    <v-col cols=3>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <BackToProjects />
                                <TaskList :project="selectedProject" :selectedTask="selectedTask" v-bind:users.sync="users" v-bind:statuses.sync="statuses"  @selected="taskSelected($event)" />
                            </v-col>
                        </v-row>
                    </v-col>


                    <v-col cols=5 v-if="selectedTask">
                        <v-row no-gutters>
                            <v-col cols=12>
                                <ReverseMappings :selectedTask="selectedTask" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Automap :project="selectedProject" v-bind:selectedTask.sync="selectedTask"  />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <TaskDetails :project="selectedProject" v-bind:selectedTask.sync="selectedTask"  />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <AuditList :project="selectedProject" v-bind:selectedTask.sync="selectedTask"  />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsList :project="selectedProject" v-bind:selectedTask.sync="selectedTask"  />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsForm :project="selectedProject" v-bind:selectedTask.sync="selectedTask" @newcomment="newComment($event)" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Statuses :project="selectedProject" v-bind:selectedTask.sync="selectedTask" v-bind:statuses.sync="statuses"  />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Users :project="selectedProject" v-bind:selectedTask.sync="selectedTask" v-bind:users.sync="users" @userchange="newComment($event)"   />
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols=4>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <MappingEditor1N />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <!-- ECL - 1 mapping interface -->
                <v-row no-gutters v-if="selectedProject && (selectedProject.type == '4')">
                    <v-col cols=3>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <BackToProjects />
                                <TaskList :project="selectedProject" :selectedTask="selectedTask" v-bind:users.sync="users" v-bind:statuses.sync="statuses" @selected="taskSelected($event)" />
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols=5 v-if="selectedTask">
                        <v-row no-gutters>
                            <v-col cols=12>
                                <ResetTask :selectedTask="selectedTask" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <ReverseMappings v-bind:selectedTask.sync="selectedTask" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Automap :project="selectedProject" v-bind:selectedTask.sync="selectedTask" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <MappingEditorECL1 :project="selectedProject" v-bind:selectedTask.sync="selectedTask" />
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols=4 v-if="selectedTask">
                        <v-row no-gutters>
                            <v-col cols=12>
                                <TaskDetails :project="selectedProject" v-bind:selectedTask.sync="selectedTask" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <AuditList :project="selectedProject" v-bind:selectedTask.sync="selectedTask" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsList ref="commentsList" :project="selectedProject" v-bind:selectedTask.sync="selectedTask"  />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsForm :project="selectedProject" v-bind:selectedTask.sync="selectedTask" @newcomment="newComment($event)"  />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Statuses :project="selectedProject" v-bind:selectedTask.sync="selectedTask" v-bind:statuses.sync="statuses" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Users :project="selectedProject" v-bind:selectedTask.sync="selectedTask" v-bind:users.sync="users" @userchange="newComment($event)"  />
                            </v-col>
                        </v-row>
                    </v-col>

                </v-row>
            </v-col>
    </div>
</template>

<script>
import MappingProjectService from '../../services/mapping_project.service';
import Automap from '@/components/Mapping/Automap';
import TaskList from '@/components/Mapping/TaskList';
import TaskDetails from '@/components/Mapping/TaskDetails';
import AuditList from '@/components/Mapping/AuditList';
import CommentsList from '@/components/Mapping/CommentsList';
import MappingEditor1N from '@/components/Mapping/MappingEditor1N';
import MappingEditorECL1 from '@/components/Mapping/MappingEditorECL1';
import Statuses from '@/components/Mapping/Statuses';
import Users from '@/components/Mapping/Users';
import BackToProjects from '@/components/Mapping/BackToProjects';
import CommentsForm from '@/components/Mapping/CommentsForm';
import ReverseMappings from '@/components/Mapping/ReverseMappings';
import ResetTask from '@/components/Mapping/ResetTask'

export default {
    components: {
        Automap,
        TaskList,
        CommentsList,
        CommentsForm,
        TaskDetails,
        BackToProjects,
        Statuses,
        Users,
        ReverseMappings,
        AuditList,
        MappingEditor1N,
        MappingEditorECL1,
        ResetTask,
    },
    data () {
        return {
            selectedTask: null,
            statuses: [],
            users: [],
        }
    },
    created () {
        //this.$store.dispatch('MappingTasks/getTasks', this.$route.params.projectid)

        if (this.$route.params.projectid) {
            this.$store.dispatch('MappingProjects/getProjectDetails', this.$route.params.projectid)
            //this.$store.dispatch('MappingProjects/getProjectStatuses', this.$route.params.projectid)
            // this.$store.dispatch('MappingProjects/getProjectUsers', this.$route.params.projectid)
            this.getStatuses()
            this.getUsers()
        }

        if (this.$route.params.taskid) {
            console.log(this.$route.params.taskid, this.selectedTask, (this.selectedTask === null))
            if (this.selectedTask === null) {
                // TODO: FIXME
                this.getTaskDetails(this.$route.params.taskid)
            }

        }
    },
    methods: {
        taskSelected: function(task) {
            this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/Task/` + task.id })
            this.selectedTask = task
            this.$emit('update:selectedTask', this.selectedTask)
        },
        getTaskDetails: function(taskId) {
            MappingProjectService.get_task(this.$route.params.projectid, taskId).then((response) => {
                this.selectedTask = response
                this.$emit('update:selectedTask', this.selectedTask)
            })
        },
        getStatuses: function() {
            MappingProjectService.get_statuses(this.$route.params.projectid).then((response) => {
                this.statuses = response
            })
        },
        getUsers() {
            MappingProjectService.get_users(this.$route.params.projectid).then((response) => {
                this.users = response.results
            })
        },
        newComment: function() {
            this.$refs.commentsList.getComments(this.selectedProject.id, this.selectedTask.pk)
        }
    },
    computed: {
        //selectedTask () {
        //  return this.$store.state.MappingTasks.selectedTask
        //},
        selectedProject () {
            return this.$store.state.MappingProjects.selectedProject
        },
        user () {
            return this.$store.state.userData
        }
    }
}
</script>
