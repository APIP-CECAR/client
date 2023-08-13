<template>
    <v-row>
        <v-col cols="12">
            <v-card class="mx-auto pa-0 mb-2" elevation="0">
                <v-list subheader>
                    <v-subheader>Estudiantes</v-subheader>
                    <v-list-item three-line v-for="student in students" :key="student._id">
                        <v-list-item-avatar>
                            <v-icon  x-large>mdi-account-box</v-icon>
                        </v-list-item-avatar>
                        <!-- redirect to renderHistory.vue -->
                        <router-link :to="`/render/student/${student._id}/history/${student.historyId}`" tag="v-list-item">
                        <v-list-item-content>
                            <v-list-item-title>{{ student.name }} {{ student.surname }}</v-list-item-title>
                            
                            <v-list-item-subtitle>
                                <v-icon small>mdi-bulletin-board</v-icon>
                                <label class="font-weight-bold">Historia: {{ student.history }}</label>
                            </v-list-item-subtitle>
                            
                            <v-list-item-subtitle>
                                <v-icon>mdi-map-marker-path</v-icon>
                                <label class="font-weight-bold">Rutas de aprendizaje: {{ student.plansLengt }}</label>
                                <v-breadcrumbs :items="student.path.map(std => { return { text: std, disabled: true, href: `/#` } })" divider="-"></v-breadcrumbs>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        </router-link>                        
                    </v-list-item>                    
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    props: {
        students: {
            type: Array,            
        },
    },
    data: () => ({}),
    methods: {
        ...mapActions('students', ['getStudent', 'getAllStudents']),
    },
    computed: {
        ...mapState('auth', ['loggedIn', 'user']),
    },
    async beforeMount() {                 
        
    }
}
</script>