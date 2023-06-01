<template>
    <div id="app">
        <ProjectAudit :projectId="selectedProject" />
    </div>
</template>

<script>
 import ProjectAudit from '@/components/Mapping/ProjectAudit';

 export default {
     components: {
         ProjectAudit,

     },
     computed: {
         selectedProject () {
             return this.$route.params.projectid
         },
     }
 }
</script>
