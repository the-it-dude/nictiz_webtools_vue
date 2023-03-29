<template>
    <div>
        <v-alert
            border="left"
            dense
            color="green lighten-2"
            type="info">{{ totalMappings }}
        </v-alert>
        <v-container
            v-if="user.groups.includes('mapping | access') && (totalMappings > 0)"
            fluid>
            <v-card v-if="totalMappings <= 1">
                <v-card-title>
                    Reverse mappings
                </v-card-title>
                <v-card-text>
                    <v-alert
                        border="left"
                        dense
                        color="green lighten-2"
                        type="info" v-for="(mapping, key) in mappings" :key="key">
                        <div v-if="selectedProject.type == '1'">
                            {{mapping.source.title}} {{  mapping.source.id }} | {{  mapping.source.codesystem.title }} |
                        </div>
                        <div v-if="selectedProject.type == '4'">
                            {{mapping.target.title}} {{  mapping.target.id }} | {{  mapping.target.codesystem.title }} |
                        </div>
                            (
                            <span v-if="mapping.correlation == '447559001'">B2N</span>
                            <span v-if="mapping.correlation == '447557004'">EM</span>
                            <span v-if="mapping.correlation == '447558009'">N2B</span>
                            <span v-if="mapping.correlation == '447560006'">PO</span>
                            <span v-if="mapping.correlation == '447556008'">Not mappable</span>
                            <span v-if="mapping.correlation == '447561005'">Not specified</span>
                            )
                            <div v-if="selectedProject.type == '1'">
                            <v-btn text v-if="mapping.source.codesystem.title == 'SNOMED'" :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+mapping.source.id" target="_blank"><v-icon>mdi-link</v-icon></v-btn>
                            <v-btn text v-if="mapping.source.codesystem.title == 'Labcodeset'" :href="'https://labterminologie.nl/art-decor/labconcepts?search='+mapping.source.id" target="_blank"><v-icon>mdi-link</v-icon></v-btn>
                            </div>
                            <div v-if="selectedProject.type == '4'">
                            <v-btn text v-if="mapping.target.codesystem.title == 'SNOMED'" :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+mapping.target.id" target="_blank"><v-icon>mdi-link</v-icon></v-btn>
                            <v-btn text v-if="mapping.target.codesystem.title == 'Labcodeset'" :href="'https://labterminologie.nl/art-decor/labconcepts?search='+mapping.target.id" target="_blank"><v-icon>mdi-link</v-icon></v-btn>
                            </div>
                            <v-btn
                                v-if="(selectedProject.type == '1') && (selectedTask.user.id == user.id)"
                                text
                                @click="addMappingFromReverse(selectedTask.id, mapping.source.id, mapping.source.codesystem.id)">
                                    <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>

                    </v-alert>
                </v-card-text>
            </v-card>
            <v-card v-else>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <v-alert
                                    border="left"
                                    dense
                                    color="green lighten-2"
                                    type="info">
                                    Er zijn {{ totalMappings }} reverse mappings voor dit component.
                                </v-alert>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-data-table
                                    :headers="headers"
                                    :items="mappings"
                                    :items-per-page="5"
                                    class="elevation-1"
                                    dense
                                >
                                    <template v-slot:top="{ pagination, options, updateOptions }">
                                        <v-data-footer
                                        :pagination="pagination"
                                        :options="options"
                                        @update:options="updateOptions"
                                        items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
                                    </template>
                                    <template v-slot:item.correlation="{item}">
                                        <font v-if="item.correlation == '447559001'">B2N</font>
                                        <font v-if="item.correlation == '447557004'">Exact</font>
                                        <font v-if="item.correlation == '447558009'">N2B</font>
                                        <font v-if="item.correlation == '447560006'">PO</font>
                                        <font v-if="item.correlation == '447556008'">Not mappable</font>
                                        <font v-if="item.correlation == '447561005'">Not specified</font>
                                    </template>
                                    <template v-slot:item.add="{item}">
                                        <v-btn
                                            v-if="(selectedProject.type == '1') && (selectedTask.user.id == user.id)"
                                            text
                                            @click="addMappingFromReverse(selectedTask.id, item.source.id, item.source.codesystem.id)">
                                                <v-icon>mdi-plus-circle</v-icon>
                                        </v-btn>
                                    </template>
                                </v-data-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import MappingTaskService from '../../services/mapping_task.service';

export default {
    props: {
        selectedTask: Object,
    },
    data() {
        return {
            totalMappings: 0,
            mappings: []
        }
    },
    methods: {
        addMappingFromReverse(taskid, conceptid, codesystem){
            this.$store.dispatch('MappingTasks/addMappingFromReverse', {taskid, conceptid, codesystem})
        },
        getReverseMappings() {
            MappingTaskService.get_reverse_mappings(
                this.$store.state.MappingProjects.selectedProject.id,
                this.selectedTask.id,
                {"limit": 1000}
            ).then((response) => {
                this.totalMappings = response.count
                this.mappings = response.results
            })
        }
    },
    computed: {
        selectedProject(){
            return this.$store.state.MappingProjects.selectedProject
        },
        reverse_mappings(){
            return this.$store.state.MappingTasks.reverse
        },
        loading(){
            return this.$store.state.MappingAudits.loading
        },
        user(){
            return this.$store.state.userData
        },
        headers() {
            if (this.selectedProject.type === '1') {
                return [
                    {text : 'Codesystem', value: 'source.codesystem.title'},
                    {text : 'ID', value: 'source.id'},
                    {text : 'FSN', value: 'source.title'},
                    {text : 'Correlatie', value: 'correlation'},
                    {text : '+', value: 'add'},
                ]

            }
            else if (this.selectedProject.type === '4') {
                return [
                    {text : 'Codesystem', value: 'target.codesystem.title'},
                    {text : 'ID', value: 'target.id'},
                    {text : 'FSN', value: 'target.title'},
                    {text : 'Correlatie', value: 'correlation'},
                    {text : '+', value: 'add'},
                ]
            }
            else {
                return []
            }
        }
    },
    watch: {
        selectedTask: function() {
            this.getReverseMappings()
        }
    }
}
</script>

