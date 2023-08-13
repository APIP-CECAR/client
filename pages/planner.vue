<template>
  <div>    
    <v-row>
        <v-col>
          <v-card class="mx-auto pa-0 mb-5">
              <v-card-text>
                <v-alert v-if="isChargedStudents" dense :type="messageType" dismissible>
                  {{ messageCharge }}
                </v-alert>
              </v-card-text>
              <v-card-text>
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field :rules="[rules.required, rules.counter]" v-model="name" label="Etiqueta del archivo"></v-text-field>
                        <UploadTest @file-selected="onGetDataJSON"></UploadTest>                        
                        <v-btn color="primary" class="mx-auto mb-5" :loading="loading" @click="saveTestReport" :disabled="!testReport && !name">Guardar test</v-btn>                        
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
          </v-card>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col>
          <v-card class="mx-auto pa-2 mb-5">
            <v-card-title class="headline">
              Planificador
            </v-card-title>
            <Plannifier></Plannifier>            
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>
<script>
import Plannifier from '../components/Plannifier.vue';
import UploadTest from '../components/Upload_test.vue';
import { mapActions } from 'vuex';
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
        loading: false,
        isChargedStudents: false,
        messageCharge:''
      }
    },
  methods: {      
      ...mapActions('students', ['updateIdsStudents']),
      onGetDataJSON(file) {
        this.testReport = { file, name: this.name }
      },
      saveTestReport() {
        this.loading = true;
        axios.post(`${process.env.CECAR_API}/consumeData`, this.testReport)
          .then((response) => {
            // Actualiza el estado students utilizando una acción
            // this.$store.dispatch('updateStudents', response.data.usersIds);
            console.log(response.data)
             this.updateIdsStudents(response.data.usersIds);

            this.loading = false;
            this.name = '';
            this.messageCharge = 'Test de estudiantes cargados con éxito';
            this.messageType = "success"
            this.isChargedStudents = true;
          })
          .catch((error) => {
            this.loading = false;
            this.messageCharge = 'Error cargando los test de estudiantes';
            this.messageType = "warning"
            this.isChargedStudents = true;
          });
      },
      /*
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
      },*/
  }    
}
</script>
