<template>
    <div v-if="automap.length > 0">
        <v-container
            v-if="user.groups.includes('mapping | access')"
            tile>
            <v-card>
                <v-toolbar
                color="cyan"
                dark
                :loading="loading"
                dense>
                    <v-toolbar-title>Automaps</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <li v-for="(value, key) in automap" :key="key">
                        [{{value.equivalence}}] {{value.concept.system}} - {{value.concept.code}} - {{value.concept.display}}{{value.concept.semantic_tag}}
                    </li>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>
<script>

import MappingTaskService from '../../services/mapping_task.service';

export default {
    props: {
        project: Object,
        selectedTask: Object,
    },
    data() {
        return {
            automap: [],
            loading: true,
        }
    },
    methods: {
        getAutomap() {
            this.automap = []
            this.loading = true
            MappingTaskService.get_automap(this.project.id, this.selectedTask.id, {}).then((response) => {
                // Temporary exclude for missing token
                if (response === "'access_token'") {
                    this.automap = []
                }
                else if (response === undefined) {
                    this.automap = []
                } else {
                    this.automap = response
                }
                this.loading = false
            })
        }
    },
    watch: {
        selectedTask () {
            this.getAutomap()
        }
    },
    computed: {
        user(){
            return this.$store.state.userData
        }
    },
    created() {
        this.getAutomap()
        // this.$store.dispatch('MappingTasks/getAutomap', this.$route.params.taskid)
    }
}
</script>

