<template>
  <v-card>
    <v-tabs    
        v-model="tabs" 
        background-color="deep-purple accent-4"
        centered
        dark
        icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        SGH
        <v-icon>mdi-weather-cloudy-clock</v-icon>
      </v-tab>

      <v-tab>
        Estudiantes
        <v-icon>mdi-account-multiple</v-icon>
      </v-tab>

      <v-tab>
        Agente inteligente
        <v-icon>mdi-face-agent</v-icon>
      </v-tab>      
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
            <SGH />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
            <Students />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
            <Agent />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        tabs: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>