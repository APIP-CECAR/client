<template>
  <div>
    <v-row justify="center">
        <v-col cols="12">
          <v-card class="mx-auto pa-0 mb-5"  max-width="700">      
              <v-card-actions>                
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field :rules="[rules.required, rules.counter]" v-model="name" label="Etiqueta del archivo"></v-text-field>
                        <UploadTest @file-selected="onGetDataJSON"></UploadTest>
                        <v-btn :loading="loading" @click="saveTestReport" :disabled="!testReport">Guardar test</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-actions>            
          </v-card>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col>
          <v-card class="mx-auto pa-2 mb-5"  max-width="700">
            <v-card-title class="headline">
              Planificador
            </v-card-title>
            <Plannifier :ids="students"></Plannifier>            
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>
<script>
import Plannifier from '../components/Plannifier.vue';
import UploadTest from '../components/Upload_test.vue';
var axios = require('axios');
export default {
  components: { UploadTest, Plannifier },
    data() {
      return {
        handleFileSelected: {},
        testReport: null,
        name: '',
        rules: {
          required: value => !!value || 'Este campo es requerido.',
          counter: value => value.length <= 20 || 'Max 20 characters',          
        },  
        students: [],
        loading: false
      }
    },
    methods: {      
      onGetDataJSON(file) {        
        this.testReport = { file, name: this.name }
      },
      saveTestReport() {        
        this.loading = true; 
        axios.post(`${process.env.CECAR_API}/consumeData`, this.testReport)
          .then((response) => {
            // se debe actualizar el state students
            this.loading = false;
            this.name = '';
            this.students = response.data.usersIds;
          })
          .catch( (error) =>{
            console.log(error);
          });
      },      
  }    
}
</script>
