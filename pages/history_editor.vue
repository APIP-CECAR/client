<template>        
    <v-row justify="center">
        <v-col cols="12" sm="8" md="8">
            <v-card class="mx-auto d-flex pa-0 mb-5">
                <v-container fluid>
                    <v-list flat>
                        <v-subheader>HISTORIAS</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item v-for="(history, i) in histories" :key="i">
                                <v-list-item-content>
                                    <v-list-item-title>{{history.name}}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action class="d-inline-block">
                                    <v-btn icon :to="`/historyProperties/${history._id}`">
                                        <v-icon color="#FB8C00">mdi-file-document-edit-outline</v-icon>
                                    </v-btn>                                    
                                    <v-btn icon @click="deleteHistory(history._id)">
                                        <v-icon color="error">mdi-delete</v-icon>
                                    </v-btn>                                    
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>                    
                    </v-list>
                </v-container>

                <!--Propiedades de historias-->
                <div class="text-center">
                    <v-dialog v-model="dialogProperties">
                        <HistoryProperties :history="historyActive"/>
                    </v-dialog>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="8">
                <v-card class="mx-auto d-flex pa-4 mb-0">
                    <v-text-field 
                        label="Nueva Historia"
                        v-model="nameHistory"
                        :rules="rules"
                        append-icon="mdi-plus" 
                        @click:append="addNewHistory">
                    </v-text-field>
                </v-card>
            </v-col>
    </v-row>    
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'history_editor',
    data() {
        return {
            selectedItem: -1,
            nameHistory: '',
            dialogProperties: false,
            rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],            
            historyActive: {},
            historyScheme:{
                competence: "PC",
                name: "",                
            }            
        }
    }, 
    computed: {
        ...mapState("history", ["histories"]),
    },
    created() {
        // Cargar las historias al inicio del componente
        this.$store.dispatch("history/loadHistories");
    },
    methods: {        
        ...mapActions('history', ['createHistory', 'deleteHistory']),
        async addNewHistory() {
            this.historyScheme.name = this.nameHistory;
                        
            this.createHistory(this.historyScheme)
                .then(response => {
                    const newHistory = response                    
                    this.nameHistory = '' // Limpiar el campo de texto después de agregar la historia
                })
                .catch(error => {
                    console.error(error)
                })            
        },
        showPropertiesHistory(history) {
            this.historyActive = history
            this.dialogProperties = true
        },          
    }
}
</script>