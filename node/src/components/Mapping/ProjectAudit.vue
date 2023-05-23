<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')">
            <v-dialog
                v-model="dialog"
                width="auto"
            >
                <v-card>
                    <v-card-title>Audit hit: {{selectedHit.hit_reason}} ({{selectedHit.audit_type}})</v-card-title>
                    <v-card-text>
                         <v-simple-table max-width="40">
                             <tbody>
                                 <tr>
                                     <td>Commentaar:</td>
                                     <td><v-textarea v-model="selectedHit.comment" label="Commentaar"></v-textarea></td>
                                 </tr>
                                 <tr>
                                     <td>Whitelist:</td>
                                     <td>
                                         <v-checkbox v-model="selectedHit.ignore" label="Whitelist"></v-checkbox>

                                         <div v-if="selectedHit.ignore_user">Whitelist door: {{selectedHit.ignore_user}}</div>
                                     </td>
                                 </tr>
                                 <tr>
                                     <td>Sticky:</td>
                                     <td><v-checkbox v-model="selectedHit.sticky" label="Sticky"></v-checkbox></td>
                                 </tr>
                             </tbody>
                         </v-simple-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="danger" @click="updateHit()">Aanpassen</v-btn>
                        <v-btn color="primary" @click="closeDialog()">Sluiten</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-row>
                <v-col cols=12>
                    <v-row>
                        <BackToProjectsSolo/>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=12>
                    <v-card>
                        <v-card-title>
                            Hits Filteren
                        </v-card-title>
                        <v-card-text>
                            <v-simple-table max-width="40">
                                <tbody>
                                    <tr>
                                        <td colspan=2>
                                            <v-text-field
                                                v-model="search"
                                                label="Zoek binnen resultaten"
                                                hide-details
                                                autofocus
                                                clearable
                                                dense></v-text-field>
                                        </td>
                                    </tr>
                                    <tr
                                        v-for="header in headers"
                                        :key="header.text">
                                        <td
                                            v-if="filters.hasOwnProperty(header.value) && header.hasOwnProperty('filters')"
                                            align="left">
                                        {{header.text}}
                                        </td>
                                        <td v-if="filters.hasOwnProperty(header.value) && header.hasOwnProperty('filters')" class="text-left">
                                            <v-select
                                                flat
                                                dense
                                                hide-details
                                                small
                                                multiple
                                                clearable
                                                :items="header.filters"
                                                v-model="filters[header.value]">
                                            </v-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan=2>
                                            <v-btn color="primary" text @click="getHits()">Filteren</v-btn>
                                        </td>
                                    </tr>
                                </tbody>

                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=12>
                    <v-card class="pa-1">
                        <v-card-title>
                            Audit hits
                        </v-card-title>
                        <v-card-text>
                            <v-data-table
                                multi-sort
                                class="elevation-2"
                                dense
                                :headers="headers"
                                :search="search"
                                :items="hits"
                                :loading="loading"
                                :server-items-length="props.pagination.itemsLength"
                                :footer-props="props"
                                @pagination="handlePagination($event)"
                                @update:sort-by="handleSort($event)"
                                @update:sort-desc="handleSortDesc($event)"
                            >
                                <template v-slot:item.open="{ item }">
                                    <!-- <a :href="'?#/mapping/Projects/'+item.project+'/Task/'+item.task" target="_blank" class="button">test</a> -->
                                    <!-- <v-btn small color="blue lighten-2" v-on:click="selectTask(item.task, item.project)">Open</v-btn> -->
                                    <v-btn small color="blue lighten-2" v-on:click="selectHit(item)">Open</v-btn>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
 import BackToProjectsSolo from '@/components/Mapping/BackToProjectsSolo.vue'

 import MappingProjectService from '../../services/mapping_project.service';

 export default {
     components: {
         BackToProjectsSolo,
     },
     props: {
         projectId: String,
     },
     data() {
         return {
             headers: [
                 { text: '', value: 'open' },
                 { text: 'Type melding', value: 'audit_type', filters: ["Concept niet gemapt"] },
                 { text: 'Reden', value: 'hit_reason' },
                 { text: 'Commentaaar', value: "comment" },
                 { text: 'Whitelist', value: 'ignore', filters: [true, false] },
                 { text: 'Sticky', value: 'sticky', filters: [true, false] },
                 { text: 'Timestamp', value: 'first_hit_time' },
             ],
             pagination: {
                 "items-per-page-options": [25,50,100,150]
             },
             search: "",
             searchTimeout: null,
             hits: [],
             filters: {
                 audit_type:  [],
                 ignore: [],
                 sticky: [],
             },

             loading: true,
             totalHits: 0,
             hitsOffset: 0,

             page: 1,
             perPage: 25,
             perPageOptions: [25,50,100,150],
             props: {
                    pagination: {
                        page: 1,
                        itemsPerPage: 100,
                        pageStart: 0,
                        pageStop: 100,
                        pageCount: 1,
                        itemsLength: 0,
                    },
                 sortBy: [],
                 showCurrentPage: true,
                 showFirstLastPage: true,
                 itemsPerPageOptions: [25,50,100,150],
             },
             dialog: false,
             selectedHit: {
                 "id": 49,
                 "project_id": 9,
                 "audit_type": "ProjectAuditTypes.unmapped_component",
                 "hit_reason": "Concept 68812007 is niet gemapt.",
                 "comment": null,
                 "ignore": false,
                 "ignore_user": null,
                 "sticky": false,
                 "first_hit_time": "2023-05-22T16:52:46.650120+02:00"
             }
         }
     },
     methods: {
         selectTask(taskid, projectid){
             this.$router.push({ path: `/mapping/Projects/${projectid}/Task/${taskid}` });
         },
         columnValueList(val) {
             return this.hits.map(d => d[val]).sort()
         },
         getHits() {
             this.loading = true
             let params = {
                 "limit": this.props.pagination.itemsPerPage,
                 "offset": (this.props.pagination.page - 1) * this.props.pagination.itemsPerPage,
             }
            if (this.sortBy) {
                params["ordering"] = this.sortBy.join(",")
            }
            if (this.search.length) {
                params["search"] = this.search
            }
            for (const [key, value] of Object.entries(this.filters)) {
                if (value.length) {
                    params[key] = value.join(",")
                }
            }

             MappingProjectService.get_audit(this.projectId, params).then((response) => {
                 this.props.pagination.itemsLength = response.count
                 this.hits = response.results
                 this.loading = false
             })
         },
         selectHit(value) {
             this.selectedHit = Object.assign({}, value)
             this.dialog = true
         },
         closeDialog() {
             this.dialog = false
         },
         updateHit() {
             let payload = {
                 "ignore": this.selectedHit.ignore,
                 "sticky": this.selectedHit.sticky,
                 "comment": this.selectedHit.comment
             }
             let that = this
             MappingProjectService.post_audit(this.projectId, this.selectedHit.id, payload).then(() => {
                 that.getHits()
                 that.dialog = false
             })
         },
         handleSort(value) {
             this.props.sortBy = value
         },
         handleSortDesc(value) {
             this.sortBy = this.props.sortBy.map((el, ind) => {
                 if (value[ind]) {
                     return el
                 } else {
                     return "-" + el
                 }
             })
             this.getHits()
         },
         handlePagination(value) {
             let changed = false
             if (this.props.pagination.page !== value.page) {
                    this.props.pagination.page = value.page
                    changed = true
                }
                if (this.props.pagination.itemsPerPage !== value.itemsPerPage) {
                    this.props.pagination.itemsPerPage = value.itemsPerPage
                    changed = true
                }

                this.props.pagination.pageStart = value.pageStart
                this.props.pagination.pageStop = value.pageStop


                if (changed) {
                    this.getHits()
                }
        }
     },
     computed: {
         user(){
             return this.$store.state.userData
         },
         numPages: function() {8232000
             return Math.ceil(this.totalHits / this.perPage)
         },
     },
     created() {
         this.getHits();
     },
     watch: {
         search(val, oldVal) {
             if (val !== oldVal && (val.length === 0 || val.length > 2)) {
                 clearTimeout(this.searchTimeout)
                 const that = this
                 this.searchTimeout = setTimeout(() => {
                     that.getHits()
                 }, 1000)
             }
         },
         filters(val, oldVal) {
             if (val !== oldVal) {
                 console.log(val)
             }
         }
     }
 }
</script>
