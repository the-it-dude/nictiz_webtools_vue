<template>
    <v-container fluid>
        <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            >
            <v-card class="ma-1">
                <v-card-title>
                    Valideren
                </v-card-title>
                <v-card-text>
                    <!-- Is het item te valideren? -->
                    <v-checkbox
                            v-model="cannot_validate"
                            label="Kan toelichting niet beoordelen?"
                        ></v-checkbox>
                    <strong v-if="cannot_validate"></strong>
                    <v-textarea
                            v-if="cannot_validate"
                            v-model="why_no_validate"
                            label="Waarom niet?"
                            :rules="[v => (cannot_validate && !!v) || 'Item is required']"
                            required
                        ></v-textarea>
                </v-card-text>
            </v-card>
                <div v-if="!cannot_validate">
                    <v-card class="ma-1">
                        <v-card-title>
                            Staan er fouten in deze toelichting vanuit een medisch perspectief?
                        </v-card-title>
                        <v-card-text>
                            <!-- Zitten er fouten in de beschrijving? -->
                            <v-radio-group 
                                v-model="errors" 
                                row
                                required
                                :rules="[v => ((cannot_validate) || !!v) || 'Item is required']"
                                >
                                <v-radio
                                    key="1"
                                    label="Ja"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    key="2"
                                    label="Nee"
                                    value="0"
                                ></v-radio>
                            </v-radio-group>
                            <v-text-field
                                v-if="errors == '1'"
                                v-model="what_errors"
                                label="Wanneer er fouten in staan, wat zijn dan precies de fouten?"
                                :rules="[v => ((cannot_validate) || (errors && !!v)) || 'Item is required']"
                                required
                            ></v-text-field>
                        </v-card-text>
                    </v-card>

                    <v-card class="ma-1">
                        <v-card-title>
                            Wanneer u deze diagnose registreert in het medische dossier van de patiënt en de diagnose op de probleemlijst in het patiëntenportaal aan uw patiënt en zijn of haar naasten wordt getoond: 
                        </v-card-title>
                        <v-card-text>
                            <!-- Acceptabel? -->
                            <strong>
                                <!-- Wanneer u deze diagnose registreert in het medische dossier van de patiënt, hoe acceptabel vindt u het dat deze toelichting bij de diagnose op de probleemlijst in het patiëntenportaal aan uw patiënt en zijn of haar naasten wordt getoond? -->
                                Hoe acceptabel is deze toelichting, van 1 heel onacceptabel tot 5 heel acceptabel, waarbij 3 niet onacceptabel of acceptabel is?
                            </strong>
                            <v-radio-group 
                                v-model="acceptable" 
                                row
                                required
                                :rules="[v => ((cannot_validate) || (!!v)) || 'Item is required']"
                                >
                                <v-radio key="1" label="1" value="1"></v-radio>
                                <v-radio key="2" label="2" value="2"></v-radio>
                                <v-radio key="3" label="3" value="3"></v-radio>
                                <v-radio key="4" label="4" value="4"></v-radio>
                                <v-radio key="5" label="5" value="5"></v-radio>
                            </v-radio-group>
                        </v-card-text>
                    </v-card>

                </div>

                <v-btn
                        v-if="!valid"
                        color="info"
                        class="mr-4"
                        @click="validate"
                    >
                        Valideer Formulier
                    </v-btn>
                <v-btn
                        :disabled="!valid"
                        color="success"
                        class="ma-1"
                        @click="saveForm"
                    >
                        Opslaan en volgende taak
                    </v-btn>

        </v-form>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        // Form fields
        cannot_validate: 0,
        why_no_validate : '',
        errors: 0,
        what_errors: '',
        clarity: false,
        relevance: false,
        acceptable: false,
        complete: false,
        feedback_notes: '',
    
        // Form validation
        valid: false,
        lazy: false,

    }),
    methods: {
        validate () {
            this.$refs.form.validate()
        },
        rules_FeedbackNotes() {
            var output = true
            if(this.acceptable == "0"){
                if(this.feedback_notes == false){
                    output = false
                }
            }
            return output
        },
        reset () {
            this.$refs.form.reset()
        },
        saveForm () {
            var payload = {
                'taskId' : this.currentTask.id,
                'taskData' : this.currentTask,

                'cannot_validate' : this.cannot_validate,
                'why_no_validate' : this.why_no_validate,
                'errors' : this.errors,
                'what_errors' : this.what_errors,
                'clarity' : this.clarity,
                'relevance' : this.relevance,
                'acceptable' : this.acceptable,
                'complete' : this.complete,
                'feedback_notes' : this.feedback_notes,
            }
            this.$store.dispatch('Validation/sendForm', payload)
            this.cannot_validate = 0,
            this.why_no_validate  = '',
            this.errors = 0,
            this.what_errors = '',
            this.clarity = false,
            this.relevance = false,
            this.acceptable = false,
            this.complete = false,
            this.feedback_suggestion = '',
            this.feedback_notes = '',
            this.$refs.form.reset()
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        tasks(){
            return this.$store.state.Validation.taskStatistics
        },
        currentTask(){
            return this.$store.state.Validation.currentTask
        }
    },
    mounted() {
        this.$store.dispatch('Validation/getTask')
    }
}
</script>

