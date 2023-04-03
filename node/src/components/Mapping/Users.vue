<template>
    <div>
        <v-container 
            fluid>
            <v-card v-if="user.groups.includes('mapping | change task status')">
                <v-toolbar
                    color="cyan darken-2"
                    dark
                    dense>
                    <span class="headline">Gebruiker</span>
                </v-toolbar>
                <v-select class="pa-1" :items="users" v-model="selectedTask.user.id" @change="changeUser(selectedTask.user.id)"></v-select>
            </v-card>
            <v-card v-else>
                <v-toolbar
                    color="cyan darken-2"
                    dark
                    dense>
                    <span class="headline">Gebruiker</span>
                </v-toolbar>
                <v-card-text align-center>
                    {{selectedTask.user.name}}
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    props: {
        project: Object,
        selectedTask: Object,
        users: Array,
    },
    emits: ["userchange"],
    data() {
        return {
            loading: false,
            selectedUser: null,
        }
    },
    methods: {
        changeUser (userId) {
            if(this.comment != ''){
                alert("Je hebt de taak aan iemand anders toegewezen terwijl er nog een niet-opgeslagen commentaar aanwezig is. Vergeet niet om het commentaar op te slaan voor je verder gaat. De toewijzing is al wel doorgevoerd.")
            }
            this.$store.dispatch('MappingTasks/changeUser', {
                projectId: this.project.id,
                taskId: this.selectedTask.id,
                userId: userId
            }).then(() => {
                const that = this
                setTimeout(function() {that.$emit("userchange")}, 1000)
            })
        },

    },
     computed: {
         comment(){
            return this.$store.state.MappingTasks.commentDraft
        },
        user(){
            return this.$store.state.userData
        }
    },
}
</script>

