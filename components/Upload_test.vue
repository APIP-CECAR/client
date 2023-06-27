<template>
    <v-card elevation="0"  class="mx-auto d-flex pa-0 mb-5">
        <v-card-text>
            <v-radio-group v-model="selectedOption" row>
                <v-radio label="Cargar archivo JSON" value="file"></v-radio>
                <v-radio label="Conectarse a una API" value="api" ></v-radio>
            </v-radio-group>            
            <v-text-field v-if="selectedOption === 'api'" v-model="apiEndpoint" label="Endpoint de la API"></v-text-field>            
            <v-file-input
                v-else
                v-model="selectedFile"
                label="Cargar archivo JSON"
                accept=".json"
                @change="fileChanged"
          ></v-file-input>          
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            selectedOption: 'file',
            apiEndpoint: '',
            selectedFile: null            
        };
    },
    methods: {
        fileChanged(file) {
            this.selectedFile = file;
            const reader = new FileReader();

            reader.onload = (e) => {
                const json = JSON.parse(e.target.result);                
                this.$emit('file-selected', json);
            };

            reader.readAsText(file);
        }
    }
};
</script>
