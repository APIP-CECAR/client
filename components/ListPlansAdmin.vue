<template>
    <v-row>
        <v-col cols="12">
            <v-card class="mx-auto pa-0 mb-2" elevation="0">        
                <v-list subheader>
                    <v-subheader>Estudiantes</v-subheader>                    
                    <v-list-item three-line v-for="student in students" :key="student._id">                        
                        <!--v-list-item-avatar>              
                            <v-icon>mdi-folder-account</v-icon>
                        </v-list-item-avatar-->
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
                        
                            <v-list-item-icon>
                                <v-icon color="deep-purple accent-4">
                                    mdi-clipboard-text-clock
                                </v-icon>
                            </v-list-item-icon>
                        </router-link>                        
                        
                    </v-list-item>                    
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        students: []
    },
    data: () => ({}),
}
</script>