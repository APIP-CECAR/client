<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="logo py-4 d-flex justify-center">        
          </v-card>
          <v-card>
            <v-card-title class="headline">
              Planificador
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
                <v-btn depressed @click="generatePlan">
                    Generar Plan
                </v-btn>
              <v-spacer></v-spacer>              
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
</template>
<script>
var axios = require('axios');
export default {
    data() {
        return {}
    },
    methods: {
        // generate plan
      generatePlan() { 
          console.log(`Reporte`)
          console.log(axios.post('http://localhost:5000/generate_plan'));
        }
    }
}
</script>
