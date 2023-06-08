<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access')"
            fluid>
            <v-card
                class="mx-auto"
                :loading="loading"
            >
                <v-toolbar
                    color="cyan darken-2"
                    dark
                    dense>
                    <v-toolbar-title>Mappings [ECL - 1 interface]</v-toolbar-title>
                </v-toolbar>
            </v-card>

            <!-- Tabs -->
            <v-card
                class="mx-auto"
                :loading="loading"
            >
                <v-tabs
                    v-model="tab"
                    fixed-tabs  
                    :loading="loading">
                        <v-tab key="query" >
                            Queries
                        </v-tab>
                        <v-tab key="exclusions" >
                            Exclusies
                        </v-tab>
                        <v-tab key="preview" >
                            ECL resultaten
                        </v-tab>
                        <v-tab key="rules" >
                            Regels
                        </v-tab>
                </v-tabs>
            </v-card>
            <v-card
                class="mx-auto"
                :loading="loading"
            >
                <!-- Display any general errors that the backend might want to display -->
                <div 
                    v-if="errors.length > 0">
                    <v-alert 
                        dense
                        color="red lighten-2"
                        v-for="(error, key) in errors" :key="key">
                        {{error}}
                    </v-alert>
                </div>

                <!-- General warning -->
                <v-alert 
                    dense
                    color="blue lighten-2"
                    v-if="targets.queries_unfinished">
                    Nog niet alle queries zijn klaar! Het scherm ververst automatisch.
                </v-alert>

                <v-tabs-items v-model="tab"
                    :loading="loading">
                    
                    <!-- Tab queries -->
                    <v-tab-item key="query" >
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                                <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveQueries()">Opslaan</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-alert
                            dense
                            color="red lighten-2"
                            v-if="queryUpdateError">
                            {{ queryUpdateError }}
                        </v-alert>


                        <!-- Warning against duplicates in ECL results -->
                        <!-- v-alert
                            dense
                            color="red lighten-2"
                            v-if="targets.duplicates_in_ecl.length > 0">
                            Er zijn concepten die in de resultaten van meerdere ECL queries voorkomen. Deze fout moet gecorrigeerd worden.
                            <br>
                            <span v-for="(value, key) in targets.duplicates_in_ecl" :key="key">
                                <li v-if="value">
                                    {{value}}
                                </li>
                            </span>
                        </v-alert -->

                        <!-- Existing queries -->
                        <template v-for="item in queries">
                            <div v-if="(item.id == 'extra') && (formDisabled())" :key="item.id">
                                
                            </div>
                            <div v-else :key="item.id">
                                <v-card :key="item.id" class="my-1">
                                    <v-card-title v-if="(item.id == 'extra')">
                                        <span>Nieuwe ECL query</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container dense>
                                            <v-row dense>
                                                <v-col>
                                                    <span>
                                                        <!-- Query ID = {{item.id}} -->
                                                        <v-alert 
                                                            dense
                                                            color="red lighten-2"
                                                            v-if="item.failed">
                                                            Query is mislukt: {{item.error}}
                                                        </v-alert>
                                                        <v-alert 
                                                            dense
                                                            color="yellow lighten-2"
                                                            v-if="!item.finished">
                                                            Query loopt nog (volgende update in {{ queryRetryTimer }}s).
                                                        </v-alert>
                                                        <!-- <v-alert 
                                                            dense
                                                            v-else>
                                                            Query is klaar.
                                                        </v-alert> -->
                                                    </span>
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col v-if="!formDisabled()">
                                                    <v-textarea
                                                        :disabled="formDisabled()"
                                                        dense
                                                        outlined
                                                        name="input-7-1"
                                                        label="Beschrijving *"
                                                        hint="Beschrijving van de query - zorg dat je duidelijk maakt wat het doel van deze ECL query is."
                                                        v-model="item.description" 
                                                        rows="2"
                                                        auto-grow
                                                        ></v-textarea>
                                                </v-col>
                                                <v-col v-else>
                                                    <strong>Beschrijving van de query - zorg dat je duidelijk maakt wat het doel van deze ECL query is.</strong><br>
                                                    {{item.description}}
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col v-if="!formDisabled()">
                                                    <v-textarea
                                                        :disabled="formDisabled()"
                                                        dense
                                                        outlined
                                                        label="Query *"
                                                        hint="ECL query - snomed.org/ecl"
                                                        rows="2"
                                                        v-model="item.query" 
                                                        auto-grow></v-textarea>
                                                </v-col>
                                                <v-col v-else>
                                                    <strong>ECL query</strong><br>
                                                    <div style="width:100%; overflow-x:auto;">
                                                        <pre>{{item.query}}</pre>
                                                    </div>
                                                    <br>
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col cols=4>
                                                    <v-select 
                                                        :disabled="formDisabled()" 
                                                        dense
                                                        outlined
                                                        v-model="item.correlation" 
                                                        :items="project.correlation_options" 
                                                        label="Correlation *"></v-select>
                                                </v-col>
                                                <v-col cols=4>
                                                    Aantal concepten in resultaat: {{item.numResults}}
                                                </v-col>
                                                <v-col cols=4>
                                                    <v-checkbox
                                                        v-if="!formDisabled()"
                                                        v-model="item.delete"
                                                        label="Verwijderen"
                                                        dense   
                                                        ></v-checkbox>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </template>

                        <template>
                            <div>
                              <v-card v-if="!formDisabled()">
                                    <v-card-text>
                                        <v-container>
                                            <v-row dense>
                                                <v-col v-if="!formDisabled()">
                                                    <v-textarea
                                                        dense
                                                        outlined
                                                        name="input-7-1"
                                                        label="Beschrijving *"
                                                        hint="Beschrijving van de query - zorg dat je duidelijk maakt wat het doel van deze ECL query is."
                                                        v-model="newQuery.description"
                                                        rows="2"
                                                        auto-grow
                                                        ></v-textarea>
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col>
                                                    <v-textarea
                                                        dense
                                                        outlined
                                                        label="Query *"
                                                        hint="ECL query - snomed.org/ecl"
                                                        rows="2"
                                                        v-model="newQuery.query"
                                                        auto-grow></v-textarea>
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col cols=4>
                                                    <v-select
                                                        dense
                                                        outlined
                                                        :items="project.correlation_options"
                                                        v-model="newQuery.correlation"
                                                        label="Correlation *"></v-select>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </template>

                        
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="getQueries()">Opnieuw laden</v-btn>
                                <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveQueries()">Opslaan</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    <!-- Tab queries -->
                    <v-tab-item key="exclusions" >

                        <!-- Add reverse exclusion to remote task -->
                        <v-card class="my-2" v-if="!formDisabled()">
                            <v-card-text>
                                <v-row>
                                    <v-col cols=9>
                                        <v-autocomplete
                                            dense
                                            label="Excludeer huidige taak bij.."
                                            v-model="remoteExclusion"
                                            :items="remoteExclusions"
                                            @update:search-input="remoteExclusionSearch($event)"
                                        >
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols=3>
                                        <v-btn
                                            dense
                                            @click="createRemoteExclusion(remoteExclusion)">
                                            Toevoegen
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>


                        <!-- Reverse exclusions -->
                        <v-card
                            v-if="reverseExclusions.length > 0"
                            class="my-1 warning lighten-3">
                            <v-card-title>
                                <span>Het huidige component wordt geëxcludeerd bij de volgende taken:</span>
                            </v-card-title>
                            <v-card-text>
                                <li v-for="(value, key) in reverseExclusions" :key="key">
                                    Taak: {{value.task}} / Component: {{value.component_id}} {{value.component_title}} 
                                    <a @click="removeReverseMapping(value)">Verwijder</a>
                                </li>
                            </v-card-text>
                        </v-card>

                        <!-- Exclusion form -->
                        <v-card
                            class="my-2">
                            <v-card-title>
                                <span>Excludeer resultaat van ander component</span>
                            </v-card-title>
                            <v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="getExclusions()">Opnieuw laden</v-btn>
                                    <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveQueries()">Opslaan</v-btn>
                                </v-card-actions>
                                <v-textarea
                                    :disabled="formDisabled()"
                                    dense
                                    outlined
                                    label="Exclusies"
                                    hint="1 component ID per regel"
                                    rows="3"
                                    v-model="exclusionsText"
                                    auto-grow></v-textarea>
                                    <strong>Herkende codes:</strong><br>
                                    <pre>{{exclusionsText}}</pre>
                                    <br>
                                    
                                        Op basis van dit veld zijn <strong>{{exclusionResults.props.pagination.itemsLength}}</strong> concepten geëxcludeerd.
                                    
                                    <div v-if="loadExclusions">
                                        <v-data-table
                                            multi-sort
                                            :headers="excludedHeaders"
                                            :items="exclusionResults.data"
                                            :loading="exclusionResults.loading"
                                            :server-items-length="exclusionResults.props.pagination.itemsLength"
                                            :footer-props="exclusionResults.props"
                                            @pagination="handlePagination(exclusionResults, getExclusions)($event)"
                                            @update:sort-by="handleSort(exclusionResults)($event)"
                                            @update:sort-desc="handleSortDesc(exclusionResults, getExclusions)($event)"
                                        >
                                            <template v-slot:item.excluded_by="{ item }">
                                                <!-- span v-if="item.exclusion_reason.length > 1">
                                                    <li v-for="(value, key) in item.exclusion_reason" :key="key">
                                                        {{value.component.component_id}} - {{value.component.title}}
                                                    </li>
                                                </span -->
                                                <span>
                                                    {{item.component.id}}
                                                    {{item.component.title}}
                                                </span>

                                            </template>
                                        </v-data-table>
                                    </div>
                                    <div v-else>
                                        <v-btn color="blue darken-1" text @click="loadExclusions = true">Toon exclusies</v-btn>
                                    </div>
                            </v-card-text>
                            
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="getExclusions()">Opnieuw laden</v-btn>
                                <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveExclusions()">Opslaan</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    <!-- Tab results -->
                    <v-tab-item key="preview"
                        :loading="loading">

                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="getResults()">Opnieuw laden</v-btn>
                            </v-card-actions>
                            <!-- Warning against duplicates in ECL results -->
                            <!-- v-alert
                                dense
                                color="red lighten-2"
                                v-if="targets.duplicates_in_ecl.length > 0">
                                Er zijn concepten die in de resultaten van meerdere ECL queries voorkomen. Deze fout moet gecorrigeerd worden.
                                <br>
                                <span v-for="(value, key) in targets.duplicates_in_ecl" :key="key">
                                    <li v-if="value">
                                        {{value}}
                                    </li>
                                </span>
                            </v-alert -->
                            <v-card-text>
                                <v-alert 
                                    dense
                                    color="red lighten-2"
                                    v-if="targets.queries_unfinished">
                                    Nog niet alle queries zijn klaar!
                                </v-alert>
                                
                                <v-card-title>
                                Resultaten
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="resultsSearch"
                                    append-icon="mdi-magnify"
                                    label="Zoeken (alleen op SCTID / QueryID)"
                                ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                    multi-sort
                                    :headers="resultsHeaders"
                                    :items="results.data"
                                    :loading="results.loading"
                                    :server-items-length="results.props.pagination.itemsLength"
                                    :footer-props="results.props"
                                    :item-class="getResultBackground"
                                    @pagination="handlePagination(results, getResults)($event)"
                                    @update:sort-by="handleSort(results)($event)"
                                    @update:sort-desc="handleSortDesc(results, getResults)($event)"
                                >

                                    <template v-slot:item.query="{ item }">
                                        <v-tooltip right>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary" dark v-on="on" icon><v-icon right color="grey">mdi-information-outline</v-icon></v-btn>
                                            </template>
                                            <pre>{{item.queryId}} - {{item.description}}</pre>
                                            <hr>
                                            <pre>{{item.query}}</pre>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:item.id="{ item }">
                                        <a :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+item.id" target="_blank">{{item.id}}</a>
                                    </template>
                                    <template v-slot:item.pt="{ item }">
                                        {{item.fsn.term}}
                                    </template>
                                    <template v-slot:item.correlation="{ item }">
                                        <span v-if="item.correlation == '447559001'" style="color:purple; font-weight:bold; white-space: nowrap;">Broad to narrow</span>
                                        <span v-if="item.correlation == '447557004'" style="color:red; font-weight:bold; white-space: nowrap;">Exact match</span>
                                        <span v-if="item.correlation == '447558009'" style="color:orange; font-weight:bold; white-space: nowrap;">Narrow to broad</span>
                                        <span v-if="item.correlation == '447560006'" style="color:blue; font-weight:bold; white-space: nowrap;">Partial overlap</span>
                                        <span v-if="item.correlation == '447556008'" style="color:black; font-weight:bold; white-space: nowrap;">Not mappable</span>
                                        <span v-if="item.correlation == '447561005'" style="color:black; font-weight:bold; white-space: nowrap;">Not specified</span>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="getResults()">Opnieuw laden</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    <!-- Tab mappingrules -->
                    <v-tab-item key="rules">
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="getRules()">Opnieuw laden</v-btn>
                                <v-btn 
                                    color="blue darken-1" 
                                    :disabled="formDisabled()" 
                                    v-if="!targets.mappings_unfinished"
                                    text 
                                    @click="createMappingRules()">Mappingsregels aanmaken</v-btn>
                                <v-btn 
                                    v-if="!targets.mappings_unfinished"
                                    :disabled="formDisabled()" 
                                    color="red darken-1" 
                                    text 
                                    @click="removeMappingRules()">Verwijder regels</v-btn>
                            </v-card-actions>
                        
                            <v-card-title>
                                Regels
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="rulesSearch"
                                    append-icon="mdi-magnify"
                                    label="Zoeken"
                                ></v-text-field>
                            </v-card-title>
                            <!-- General warning -->
                            <v-alert 
                                dense
                                color="red lighten-2"
                                v-if="rules.error">
                                {{ rules.error  }}
                            </v-alert>
                            <v-alert 
                                dense
                                color="yellow lighten-2"
                                v-if="rules.updating">
                                Bezig met regels aanmaken.
                            </v-alert>
                            <!-- Warning against duplicates in ECL results -->
                            <!--v-alert
                                dense
                                color="red lighten-2"
                                v-if="targets.duplicates_in_ecl.length > 0">
                                Er zijn concepten die in de resultaten van meerdere ECL queries voorkomen. Deze fout moet gecorrigeerd worden.
                                <br>
                                <span v-for="(value, key) in targets.duplicates_in_ecl" :key="key">
                                    <li v-if="value">
                                        {{value}}
                                    </li>
                                </span>
                            </v-alert -->

                            <v-data-table
                                multi-sort
                                :headers="rulesHeaders"
                                :search="rulesSearch"
                                :items="rules.data"
                                :loading="rules.loading"
                                :server-items-length="rules.props.pagination.itemsLength"
                                :footer-props="rules.props"
                                @pagination="handlePagination(rules, getRules)($event)"
                                @update:sort-by="handleSort(rules)($event)"
                                @update:sort-desc="handleSortDesc(rules, getRules)($event)"
                            >
                                <template v-slot:item.source.component_id="{ item }">
                                    <a :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+item.source.component_id" target="_blank">{{item.source.component_id}}</a>
                                </template>
                                <template v-slot:item.correlation="{ item }">
                                    <span v-if="item.correlation == '447559001'" style="color:purple; font-weight:bold; white-space: nowrap;">Broad to narrow</span>
                                    <span v-if="item.correlation == '447557004'" style="color:red; font-weight:bold; white-space: nowrap;">Exact match</span>
                                    <span v-if="item.correlation == '447558009'" style="color:orange; font-weight:bold; white-space: nowrap;">Narrow to broad</span>
                                    <span v-if="item.correlation == '447560006'" style="color:blue; font-weight:bold; white-space: nowrap;">Partial overlap</span>
                                    <span v-if="item.correlation == '447556008'" style="color:black; font-weight:bold; white-space: nowrap;">Not mappable</span>
                                    <span v-if="item.correlation == '447561005'" style="color:black; font-weight:bold; white-space: nowrap;">Not specified</span>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import MappingProjectService from '../../services/mapping_project.service';
import MappingTaskService from '../../services/mapping_task.service';

export default {
    props: {
        project: Object,
        selectedTask: Object,
    },
    data() {
        return {
            search: null,
            searchExtra: null,
            dialogTarget: {},
            targetEditDialog: false,
            targetDialogOldTarget: {},
            targetDialogNewTarget: false,
            remoteExclusion: null,
            loadExclusions: false,
            resultsHeaders: [
                { text: 'Query', value: 'queryId', sortable: false },
                // { text: 'QueryID', value: 'queryId' },
                { text: 'ID', value: 'code' },
                { text: 'Preferred term', value: 'pt.term', sortable: false },
                { text: 'Correlation', value: 'correlation' },
            ],
            rulesHeaders: [
                { text: 'ID', value: 'source.id', sortable: true },
                { text: 'Component', value: 'source.title', sortable: true },
                { text: 'Correlatie', value: 'correlation', sortable: true },
            ],
            excludedHeaders: [
                { text: 'ID', value: 'key', sortable: true },
                { text: 'FSN', value: 'fsn', sortable: true },
                { text: 'Reden van exclusie', value: 'excluded_by', sortable: true },
            ],
            tab: null,
            searchString: '',
            pagination: {
                "items-per-page-options": [25,50,100,250,500,1000,3000]
            },
            interval_targets : null,
            interval_rules : null,

            // Test

            // Cleaned items
            newQuery: {
                "description": "",
                "query": "",
                "correlation": ""
            },
            exclusionsText: "",
            errors: [],  // Placeholder.
            queryCount: 0,
            loading: false,
            queryUpdateError: null,
            queryRetryInterval: null,
            queryRetryTimer: 10,
            queries: [],
            exclusions: [],
            targets: [],
            // Paginated things.
            resultsSearch: '',
            resultsSearchTimeout: null,
            results: {
                loading: true,
                sortBy: [],
                search: '',
                values_map: {
                    "source.id": "source_component__component_id",
                    "source.title": "source_component__component_title",
                    "correlation": "mapcorrelation",
                },
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
                    itemsPerPageOptions: [100, 200, 300, 1000]
                },
                data: []
            },
            rulesSearch: '',
            rulesSearchTimeout: null,
            rules: {
                loading: true,
                updating: false,
                sortBy: [],
                search: '',
                error: '',
                values_map: {
                    "source.id": "source_component__component_id",
                    "source.title": "source_component__component_title",
                    "correlation": "mapcorrelation",
                },
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
                    itemsPerPageOptions: [100, 200, 300, 1000]
                },
                data: []
            },
            exclusionSearchTimeout: null,
            exclusionSearch: '',
            exclusionResults: {
                loading: true,
                sortBy: [],
                search: '',
                values_map: {
                    "key": "code",
                    "fsn": "task__source_component__component_title",
                    "excluded_by": "task__source_component__component_id",
                },
                props: {
                    pagination: {
                        page: 1,
                        itemsPerPage: 10,
                        pageStart: 0,
                        pageStop: 10,
                        pageCount: 1,
                        itemsLength: 0,
                    },
                    sortBy: [],
                    showCurrentPage: true,
                    showFirstLastPage: true,
                    itemsPerPageOptions: [10, 100, 200, 300, 1000]
                },
                data: []
            },
            remoteExclusions: [],
            reverseExclusions: [],
        }
    },
     methods: {
        loadTargets () {
            // this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
            // this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
            // this.$store.dispatch('MappingTasks/getReverseExclusions', this.selectedTask.id)
        },
        saveQueries () {
            let payload = {
                "targets": {
                    "queries": [
                        {
                            "id": "extra",
                            "description": this.newQuery.description,
                            "query": this.newQuery.query,
                            "correlation": this.newQuery.correlation,
                        }
                    ].concat(
                        this.queries.map((q) => {
                            return {
                                "id": q.id,
                                "description": q.description,
                                "query": q.query,
                                "correlation": q.correlation,
                                "delete": q.delete
                            }
                        })
                    ),
                    "queries_unfinished": false,
                    "duplicates_in_ecl": [],
                    "errors": [],
                    "mappings_unfinished": false,
                },
                "task": this.selectedTask.id,
            }
            let that = this
            this.queryUpdateError = null;
            MappingTaskService
                .post_parts(this.project.id, this.selectedTask.id, payload)
                .then((response) => {
                    if (typeof response.data === 'string' || response.data instanceof String) {
                        if (response.data.includes("Geen toegang")) {
                            // ALERT
                        }
                    } else {
                        that.getQueries()
                    }
                })
                .catch(function (error) {
                    that.queryUpdateError = error.response.data.error
                });
        },
        saveExclusions() {
             var payload = {
                "id": this.selectedTask.id,
                "exclusions": {
                    "string": this.exclusionsText
                }
            }

            // First, save exclusions
            this.$store.dispatch('MappingTasks/postMappingExclusions', payload).then(
                this.getExclusions()
            )
        },
        handleSort(obj) {
             return function(value) {
                obj.props.sortBy = value
            }
        },
        handleSortDesc(obj, updateFunc) {
            return function(value) {
                obj.sortBy = obj.props.sortBy.map((el, ind) => {

                    if (value[ind]) {
                        return obj.values_map[el]
                    } else {
                        return "-" + obj.values_map[el]
                    }
                })
                updateFunc()
            }
        },
        handlePagination(obj, updateFunc) {
            return function(value) {
                let changed = false
                if (obj.props.pagination.page !== value.page) {
                    obj.props.pagination.page = value.page
                    changed = true
                }
                if (obj.props.pagination.itemsPerPage !== value.itemsPerPage) {
                    obj.props.pagination.itemsPerPage = value.itemsPerPage
                    changed = true
                }

                obj.props.pagination.pageStart = value.pageStart
                obj.props.pagination.pageStop = value.pageStop


                if (changed) {
                    updateFunc()
                }
            }
        },
        deFilter(val) {
            console.log(val)
            console.log('^^^')
        },
        updateTaskDetails() {
            this.exclusionsText = this.selectedTask.exclusion.join("\n")
            this.getQueries()
            this.getRules()
            this.getResults()
            this.getExclusions()
            this.getReverseExclusions()
        },
        getQueries() {
            this.loading = true
            this.newQuery.query = ""
            this.newQuery.description = ""
            this.newQuery.correlation = ""
            let that = this
            MappingTaskService.get_parts(this.project.id, this.selectedTask.id).then((response) => {
                this.loading = false
                this.queryCount = response.count
                this.queries = response.results
                this.queries.forEach((query) => {
                    if (query.id && !query.finished) {
                        that.pollQueryDetails(query)
                    }
                })
            })
        },
        pollQueryDetails(query) {
            query.retryNeeded = true
            this.queryRetryTimer = 5
            let that = this
            clearInterval(this.queryRetryInterval)
            this.queryRetryInterval = setInterval(() => {
                that.queryRetryTimer -= 1
                if (that.queryRetryTimer == 0) {
                    clearInterval(that.queryRetryInterval)
                    that.getQueries()
                    that.getResults()
                }
            }, 1000)
        },
        getResults() {
            this.results.loading = true
            this.results.count = 0
            this.results.data = []
            let params = {
                "limit": this.results.props.pagination.itemsPerPage,
                "offset": (this.results.props.pagination.page - 1) * this.results.props.pagination.itemsPerPage,
            }
            if (this.results.sortBy) {
                params["ordering"] = this.results.sortBy.join(",")
            }
            if (this.resultsSearch.length) {
                params["search"] = this.resultsSearch
            }

            MappingTaskService.get_results(this.project.id, this.selectedTask.id, params).then((response) => {
                this.results.loading = false
                this.results.count = response.count
                this.results.data = response.results
                this.results.props.pagination.itemsLength = response.count
                this.results.props.pagination.pageCount = Math.ceil(response.count / this.results.props.pagination.itemsPerPage)
            })
        },
        getResultBackground(item) {
            if (item.status === "new") {
                return "green lighten-5"
            }
            if (item.status === "deleted") {
                return "red lighten-5"
            }
        },
        getRules() {
            this.rules.loading = true
            this.rules.count = 0
            this.rules.data = []
            let params = {
                "limit": this.rules.props.pagination.itemsPerPage,
                "offset": (this.rules.props.pagination.page - 1) * this.rules.props.pagination.itemsPerPage,
            }
            if (this.rules.sortBy) {
                params["ordering"] = this.rules.sortBy.join(",")
            }
            if (this.rulesSearch.length) {
                params["search"] = this.rulesSearch
            }

            MappingTaskService.get_rules(this.project.id, this.selectedTask.id, params).then((response) => {
                this.rules.loading = false
                this.rules.data = response.results
                this.rules.props.pagination.itemsLength = response.count
                this.rules.props.pagination.pageCount = Math.ceil(response.count / this.rules.props.pagination.itemsPerPage)
            })
        },
        getExclusions() {

            this.exclusionResults.loading = true
            this.exclusionResults.count = 0
            this.exclusionResults.data = []
            let params = {
                "limit": this.exclusionResults.props.pagination.itemsPerPage,
                "offset": (this.exclusionResults.props.pagination.page - 1) * this.exclusionResults.props.pagination.itemsPerPage,
            }
            if (this.exclusionResults.sortBy) {
                params["ordering"] = this.exclusionResults.sortBy.join(",")
            }

            MappingTaskService.get_exclusions(this.project.id, this.selectedTask.id, params).then((response) => {
                this.exclusionResults.loading = false
                this.exclusionResults.data = response.results
                this.exclusionResults.props.pagination.itemsLength = response.count
                this.exclusionResults.props.pagination.pageCount = Math.ceil(response.count / this.exclusionResults.props.pagination.itemsPerPage)
            })
        },
        getReverseExclusions() {
            MappingTaskService.get_reverse_exclusions(this.project.id, this.selectedTask.id, {}).then((response) => {
                this.reverseExclusions = response
            })
        },
        removeReverseMapping(v) {
            let params = {"payload": {'task' : v.task, 'component' : this.selectedTask.component.id}}
            MappingTaskService.delete_reverse_exclusions(this.project.id, this.selectedTask.id, params).then(() => {
                this.getReverseExclusions()
            })
        },
        remoteExclusionSearch(v) {
            if (v !== null) {
                if (v.length >= 3) {
                    let params = {
                        "search": v
                    }
                    let that = this
                    MappingProjectService.get_tasks(this.project.id, params).then((response) => {
                        that.remoteExclusions = response.results.map((x) => {return {"text": x.component.title, "value": x.component.id}})
                    })
                }
            }
        },
        pollTargets () {
             clearInterval(this.interval_targets)
            this.interval_targets = setInterval(() => {
                console.log("Instantie van loop pollTargets() begonnen.")
                this.loadExclusions = false

                if(this.targets.queries_unfinished == true){
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getReverseExclusions', this.selectedTask.id)

                    console.log("Worden er nog queries uitgevoerd? "+this.targets.queries_unfinished)
                    console.log("interval_targets = "+this.interval_targets.toString())
                    console.log("clearInterval niet - loop pollTargets() zou door moeten lopen.")
                }else{
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getReverseExclusions', this.selectedTask.id)

                    console.log("Worden er nog queries uitgevoerd? "+this.targets.queries_unfinished)
                    console.log("interval_targets = "+this.interval_targets.toString())
                    clearInterval(this.interval_targets)
                    console.log("clearInterval aangeroepen - loop pollTargets() zou nu moeten stoppen.")
                    console.log("interval_targets = "+this.interval_targets.toString())
                }

                console.log("Instantie van loop pollTargets() klaar.")
            }, 5000)
        },
        pollRules () {
            clearInterval(this.interval_rules)
            this.interval_rules = setInterval(() => {
                console.log("Instantie van loop pollRules() begonnen.")
                this.loadExclusions = false

                if(this.targets.mappings_unfinished == true){
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)

                    console.log("Worden regels nog aangemaakt? "+this.targets.mappings_unfinished)
                    console.log("clearInterval niet - loop pollRules() zou door moeten lopen.")
                    console.log("Interval_rules = "+this.interval_rules.toString())
                }else{
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)

                    console.log("Worden regels nog aangemaakt? "+this.targets.mappings_unfinished)
                    console.log("Interval_rules = "+this.interval_rules.toString())
                    clearInterval(this.interval_rules)
                    console.log("clearInterval aangeroepen - loop pollRules() zou nu moeten stoppen.")
                    console.log("Interval_rules = "+this.interval_rules.toString())
                }

                console.log("Instantie van loop pollRules() klaar.")
            }, 5000)
        },
        createMappingRules() {
            const that = this
            MappingTaskService.create_rules(this.project.id, this.selectedTask.id, {}).then(() => {
                that.rules.updating = true
                clearTimeout(that.ruleSearchTimeout)
                that.ruleSearchTimeout = setTimeout(() => {
                    that.getRules()
                    that.rules.updating = false
                }, 5000)
            })
        },
        removeMappingRules() {
            const that = this
            MappingTaskService.delete_rules(this.project.id, this.selectedTask.id, {}).then((response) => {

                if (Number.isInteger(response)) {
                    that.getRules()
                } else {
                    that.rules.error = response
                }
            })
        },
        formDisabled(){
            if((this.user.id == this.selectedTask.user.id) && (this.user.groups.includes('mapping | edit mapping'))){
                return false
            }else{
                return true
            }
        },
        createRemoteExclusion() {
            this.$store.dispatch('MappingTasks/addRemoteExclusion', {
                'task': this.selectedTask.id,
                'targetComponent': this.selectedTask.component.id,
                'sourceComponent': this.remoteExclusion
            })

            this.remoteExclusion = null
            // this.pollRules()
            let that = this
            setTimeout(() => {that.getReverseExclusions()}, 1000)
        },
    },
    computed: {
        tasks(){
            return this.$store.state.MappingTasks.tasks
        },
        dialogData(){
            return this.$store.state.MappingTasks.dialogData
        },
        searchResults(){
            return this.$store.state.MappingTasks.searchResults
        },
        user(){
            return this.$store.state.userData
        },
    },
    watch: {
        selectedTask () {
            this.updateTaskDetails()
        },
        rulesSearch(val, oldVal) {
            if (val !== oldVal && (val.length === 0 || val.length > 2)) {
                clearTimeout(this.ruleSearchTimeout)
                const that = this
                this.ruleSearchTimeout = setTimeout(() => {
                    that.getRules()
                }, 1000)
            }
        },
        resultsSearch(val, oldVal) {
            if (val !== oldVal && (val.length === 0 || val.length > 2)) {
                clearTimeout(this.resultsSearchTimeout)
                const that = this
                this.resultsSearchTimeout = setTimeout(() => {
                    that.getResults()
                }, 1000)
            }
        }
    },
     created() {
         this.updateTaskDetails()
    }
}
</script>

<style scoped>
    .list-group div:nth-child(odd) {
        background-color : aliceblue;
    }

    .list-group div:nth-child(even) {
        background-color : cornsilk;
    }
</style>
