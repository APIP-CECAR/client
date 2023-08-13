<template>
  <div>
    <v-btn @click="toggleFullScreen" class="mb-2" color="primary">
      <v-icon>{{ isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon> Maximizar
    </v-btn>
    <iframe  :src="src" v-if="!isFullScreen" :style="`{
      width: '100%',
      height: 0,
      paddingBottom: ${aspectRatio * 100}%
    }`">
    </iframe>
    <v-dialog v-model="isFullScreen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <span class="headline">Vista completa</span>
        </v-card-title>
        <v-card-text>
          <iframe :src="src" width="100%" height="100%"></iframe>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isFullScreen = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    aspectRatio: {
      type: Number,
      default: 1.7
    },
  },
  data() {
    return {
      isFullScreen: false,
    };
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
  },
};
</script>
