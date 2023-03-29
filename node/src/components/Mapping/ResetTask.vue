<template>
    <v-container v-if="user.groups.includes('mapping | edit mapping')" fluid>
        <v-card>
            <v-toolbar
            color="red lighten-2"
            dark>
                <v-toolbar-title>
                    <v-btn @click="reset()" text>Reset taak (verwijder regels, ECL queries en resultaat)</v-btn><br>
                </v-toolbar-title>
            </v-toolbar>
        </v-card>
    </v-container>
</template>
<script>
export default {
    props: {
        selectedTask: Object
    },
    methods: {
        reset () {
            this.$store.dispatch('MappingTasks/resetTask', this.selectedTask.id)
        },
    },
    computed: {
        user() {
            return this.$store.state.userData
        }
    },
    mounted() {
    }
}
</script>

