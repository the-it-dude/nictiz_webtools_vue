<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')" fluid>
            <v-card
                max-width="400"
                class="mx-auto mb-1"
                :loading="loading"
            >
                <v-toolbar
                color="cyan darken-2"
                dark
                >
                    <v-app-bar-nav-icon @click="toggleFilterBox()">filter</v-app-bar-nav-icon>

                    <v-toolbar-title>Inbox ({{totalTasks}})</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="filterBox">
                    <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnUser"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-select class="pa-1" :items="users" v-model="filterUser" label="Filter op gebruiker"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnStatus"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-select class="pa-1" :items="statuses" v-model="filterStatus" label="Filter op status"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnCategory"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-select class="pa-1" :items="categories" v-model="filterCategory" label="Filter op categorie"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=1>
                        </v-col>
                        <v-col cols=10>
                            <v-select class="pa-1" :items="perPageOptions" v-model="perPage" v-on:change="handlePerPageChange" label="Aantal per pagina"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnID"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-text-field
                                label="Zoek op ID"
                                v-model="filterID"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <!-- <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnCode"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-text-field
                                label="Zoek op code"
                                model="filterCode"
                                ></v-text-field>
                        </v-col>
                    </v-row> -->
                </v-card-text>
            </v-card>

            <v-card
                max-width="400"
                class="mx-auto"
                :loading="loading"
            >
                <v-pagination
                    v-model="page"
                    total-visible="5"
                    dense
                    :length="numPages"
                    @input="handlePageChange"
                ></v-pagination>

                <v-list three-line
                    style="max-height:800px"
                    class="overflow-y-auto pa-0"
                    >
                    <v-list-item-group>
                        <v-list-item
                            @click="selectTask(item)"
                            v-for="item in tasks"
                            :key="item.id"
                            :class="{'cyan lighten-3' : item.id == selectedTaskId}">
                            <v-list-item-content>
                                <v-list-item-title
                                    v-html="item.component.title"></v-list-item-title>
                                <v-list-item-subtitle>
                                    {{item.status.title}} @ {{item.user.name}} [{{item.category}}]<br>
                                    Code: {{item.component.id}} / Taak: {{item.id}}
                                    </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>

                <v-skeleton-loader
                    v-if="(loadingTasks)"
                    class="mx-auto"
                    max-width="400"
                    type="article"
                    ></v-skeleton-loader>

                <v-pagination
                    v-model="page"
                    total-visible="5"
                    dense
                    :length="numPages"
                    @input="handlePageChange"
                ></v-pagination>
            </v-card>


        </v-container>
    </div>
</template>
<script>

import MappingProjectService from '../../services/mapping_project.service';

export default {
    props:{
        project: Object,
        selectedTask: Object
    },
    emits: ["selected"],
    data() {
        return {
            filterStatus: '',
            filterUser: this.$store.state.userData.id,
            filterCode: '',
            filterCategory: 'Prioriteit 1',
            filterOnUser: false,
            filterOnStatus: false,
            filterOnCode: false,
            filterOnCategory: false,
            filterBox: true,
            filterID: '',
            filterOnID: false,

            selectedColor: 'green',

            // Paginated Tasks
            loadingTasks: true,
            tasks: [],
            tasksOffset: 0,
            totalTasks: 0,

            page: 1,
            perPage: 8,
            perPageOptions: [8,20,50,100,500,1000,3000,8000],
        }
    },
    methods: {
        selectTask(task){
            // this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/Task/`+taskId })
            this.$emit("selected", task)
            // this.$store.dispatch('MappingTasks/getAutomap', taskid)
            // this.$store.dispatch('MappingAudits/getAudits',taskid)
            // this.$store.dispatch('MappingTasks/getTaskDetails',taskid)
            // // this.$store.dispatch('MappingTasks/getMappingTargets',taskid)
            // this.$store.dispatch('MappingTasks/getReverse', taskid)
            // this.$store.dispatch('MappingTasks/getComments',taskid)
            // this.$store.dispatch('MappingTasks/getReverseExclusions', taskid)
            // this.$store.dispatch('MappingTasks/getRelatedTasks', taskid)

        },
        toggleFilterBox(){
            if(this.filterBox == true){
                this.filterBox = false
            }else{
                this.filterBox = true
            }
            return true
        },
        getTasks() {
            const that = this
            let params = {
                "limit": this.perPage,
                "offset": (this.page -1 ) * this.perPage
            }
            if (this.filterOnStatus && this.filterStatus) {
                params["status"] = this.filterStatus
            }
            if (this.filterOnUser && this.filterUser) {
                params["user"] = this.filterUser
            }
            if (this.filterOnCategory && this.filterCategory) {
                params["category"] = this.filterCategory
            }

            this.loadingTasks = true
            this.tasks = []
            MappingProjectService.get_tasks(this.project.id, params).then((response) => {
                that.tasks = response.results
                this.totalTasks = response.count
                that.loadingTasks = false
            })
        },
        handlePerPageChange(value) {
            this.perPage = value
            this.page = 1
            this.getTasks()
        },
        handlePageChange(value) {
            this.page = value;
            this.getTasks();
        }
    },
    computed: {
        users(){
            return this.$store.state.MappingProjects.users
        },
        statuses(){
            return this.$store.state.MappingProjects.statuses
        },
        categories(){
            return this.$store.state.MappingProjects.selectedProject.categories
        },
        loading(){
            return this.$store.state.MappingTasks.loading.tasklist
        },
        user(){
            return this.$store.state.userData
        },
        numPages: function() {
            return Math.ceil(this.totalTasks / this.perPage)
        },
        selectedTaskId: function() {
            if (this.selectedTask) {
                return this.selectedTask.id
            }
            return null
        }
    },
    watch: {
        filterOnUser: filterBool("filterUser"),
        filterUser: filterVal("filterUser"),
        filterOnStatus: filterBool("filterStatus"),
        filterStatus: filterVal("filterStatus"),
        filterOnCategory: filterBool("filterCategory"),
        filterCategory: filterVal("filterCategory")
    },
    created() {
        this.getTasks()
    }
}


function filterBool(model) {
    return function inner(val, oldVal) {
        if (val !== oldVal) {
            if (val) {
                if (this[model]) {
                    this.getTasks()
                }
            } else {
                this.getTasks()
            }
        }
    }
}
function filterVal(model) {
    return function inner(val, oldVal) {
        if (val !== oldVal && this[model] && val) {
            this.getTasks()
        }
    }
}
</script>

