<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          APIP
        </v-card-title>
        <v-card-text>
          <p>Agente Pedagógico Inteligente para el desarrollo del pensamiento crítico (APIP).</p>
        </v-card-text>
        <v-card-actions v-if="!loggedIn">
            <v-spacer></v-spacer>
            <login />
          </v-card-actions>
          <v-card-actions v-else>
            <!-- Coloca aquí el contenido que deseas mostrar cuando el usuario ya ha iniciado sesión -->
          </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex';
import  login  from "./login"; 
export default {
  name: 'IndexPage',  
  computed: {
    ...mapState('auth', ['loggedIn', 'user']),
    userRole() {
      return this.user ? this.user.rol : null;
    },
  },
  components: {
    login
  }
}
</script>
