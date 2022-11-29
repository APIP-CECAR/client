<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-file-document-multiple-outline</v-icon>
      <span class="ml-2">Resultados de tests</span>
    </v-card-title>
    <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="green--text"
        multiple
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      selected: [2],
      items: [
        {
          action: 'Valoración Test PC-B: 43 ',
          headline: 'Ingeniería de Sistemas',
          subtitle: `20 años`,
          title: 'Juan Pérez',
        },
        {
          action: 'Valoración Test PC-B: 43 ',
          headline: 'Ingeniería Industrial',
          subtitle: `21 años`,
          title: 'María Gómez',
        },
        {
          action: 'Valoración Test PC-B: 43',
          headline: 'Trabajo Social',
          subtitle: `21 años`,
          title: 'Pedro Gómez',
        },
      ],
    }),
  }
</script>