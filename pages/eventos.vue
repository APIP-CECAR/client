<template>
  <v-container>
    <v-card>
        <v-card-title> Eventos </v-card-title>
        <v-card-actions>
            <!--EventosForm @addEvents='onAddEvents' /-->
        </v-card-actions>
        <v-card-text>
            <!--EventosList :events_length='events_length' /-->
        </v-card-text>
    </v-card>
  </v-container>    
</template>
<script>

export default {
  data: () => ({
    events_length: 0
  }),
  methods: {
    onAddEvents(isUpdated) {
        if(isUpdated){
            this.events_length += 1;
        }
    }
  }
}
</script>
