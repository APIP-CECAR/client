<template>
    <v-card elevation="0"  class="mx-auto d-flex pa-0 mb-5">
        <v-card-text>
            <v-container class="pa-0 mb-0">
                <v-row>
                    <v-col cols="12">
                        <v-radio-group v-model="selectedOption" row>
                            <v-radio label="Cargar archivo JSON" value="file"></v-radio>
                            <v-radio label="Conectarse a una API" value="api" ></v-radio>
                        </v-radio-group>            
                        <v-text-field filled v-if="selectedOption === 'api'" v-model="apiEndpoint" label="Endpoint de la API"></v-text-field>
                        <v-textarea filled v-if="selectedOption === 'api'" v-model="apiToken" label="Token de la API"></v-textarea>                        
                        <div class="text-center" v-if="selectedOption === 'api'">
                            <p v-if="apiConnected" class="success-message">Archivo JSON cargado con éxito</p>
                            <v-btn :loading="loading"  @click="connectToApi" color="#FFAB40">
                                <v-icon> mdi-code-json </v-icon> Conectar a la API                                 
                            </v-btn>                            
                        </div>                        

                        <v-file-input
                            v-else
                            v-model="selectedFile"
                            label="Cargar archivo JSON"
                            accept=".json"
                            @change="fileChanged"
                    ></v-file-input>          
                    </v-col>
                </v-row>
            </v-container>            
        </v-card-text>
    </v-card>
</template>

<script>

var axios = require('axios');
export default {
    data() {
        return {
            selectedOption: 'file',
            apiEndpoint: '',
            apiToken: '',
            selectedFile: null,
            loading: false,
            apiConnected: false,
        };
    },
    methods: {
        fileChanged(file) {
            this.selectedFile = file;
            const reader = new FileReader();

            reader.onload = (e) => {
                const json = JSON.parse(e.target.result);
                console.log(json);
                this.$emit('file-selected', json);
                this.loading = false;                
            };

            reader.readAsText(file);
        },
        connectToApi() {
            this.loading = true;
            axios.get(this.apiEndpoint, {
                headers: {
                    Authorization: this.apiToken
                }
            })
                .then(response => {                    
                    const transformedData = response.data;     
                    console.log(transformedData)
                    this.$emit('file-selected', transformedData);   
                    this.loading = false;
                    this.apiConnected = true;
                })
                .catch(error => {
                    this.loading = false;
                    console.error(error);                    
                });
        }
    }
};
</script>
