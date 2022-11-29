<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <v-icon>mdi-file-arrow-left-right-outline</v-icon>
                    <span class="ml-2">Carga de Test</span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-file-input multiple label="Carga manual de test"></v-file-input>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Carga vía ruta de la API"></v-text-field>
                            <v-btn
                                color="primary"
                                @click="loadTest"
                            >Cargar test</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>  
</template>
<script>
  export default {
    data: () => ({
      files: [],
    }),
    methods: {
      loadTest() {
        console.log('loadTest')
      }
    }
  }
</script>