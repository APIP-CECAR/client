<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">        
      </v-card>
      <v-card>
        <v-card-title class="headline">
          APIP
        </v-card-title>
        <v-card-text>
          <p>Agente Pedagógico Inteligente para el desarrollo del pensamiento crítico (APIP).</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <login />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import login from './login.vue'
export default {
  name: 'IndexPage',
  components: {
    login
  }
}
</script>
