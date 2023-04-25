<template>
    <v-card class="mx-auto mb-2">
        <v-img
          class="white--text align-end"
          height="500px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Nombre de la Historia</v-card-title>
        </v-img>
        <!--v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5">
                    San Francisco
                </v-list-item-title>
                <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item-->

        <!--v-card-text>
            <v-row align="center">
                <v-col class="text-h2" cols="6">
                    23&deg;C
                </v-col>
                <v-col cols="6">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/sun.png" alt="Sunny image" width="92"></v-img>
                </v-col>
            </v-row>
        </v-card-text-->

        <!--v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-send</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
        </v-list-item-->

        <!--v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-cloud-download</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>48%</v-list-item-subtitle>
        </v-list-item-->

        <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider>
        
        <v-divider></v-divider>

        <!--v-card-actions>
            <v-btn text>
                Full Report
            </v-btn>
        </v-card-actions--->

        <v-card class="mx-auto">
            <v-container class="pa-4">
                <v-item-group v-model="selected" multiple>
                    <v-row>
                        <v-col v-for="(item, i) in minigames" :key="i" cols="12" md="6">
                            <v-item v-slot="{ active, toggle }">
                                <v-img
                                    :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                                    height="150"
                                    class="text-right pa-2"
                                    @click="toggle"
                                >
                                    <v-btn icon dark>
                                        <v-icon>
                                            {{ active ? 'mdi-star-check' : 'mdi-star' }}
                                        </v-icon>
                                    </v-btn>
                                </v-img>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-container>
        </v-card>

        <v-divider></v-divider>

        <v-list class="transparent">
                <v-list-item v-for="item in forecast" :key="item.day">
                    <v-list-item-title>{{ item.day }}</v-list-item-title>

                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-subtitle class="text-right">
                        {{ item.temp }}
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>


    </v-card>
</template>
<script>
export default {
    data() {
        return {
            labels: ['SC1', 'SC2', 'SC3', 'SC4', 'SC5', 'SC6', 'SCn'],
            time: 4,
            forecast: [
                { day: 'Nivel', icon: 'mdi-book-education', temp: 'B' },
                { day: 'Competencia', icon: 'mdi-book-heart', temp: 'Loren' },
                { day: 'Habilidad', icon: 'mdi-book-account', temp: 'Ipsun' },
            ],
            minigames: [
                {
                    src: 'backgrounds/bg.jpg',
                },
                {
                    src: 'backgrounds/md.jpg',
                },
                {
                    src: 'backgrounds/bg-2.jpg',
                },
                {
                    src: 'backgrounds/md2.jpg',
                },
                {
                    src: 'backgrounds/bg.jpg',
                },
                {
                    src: 'backgrounds/md.jpg',
                },
                {
                    src: 'backgrounds/bg-2.jpg',
                },
                {
                    src: 'backgrounds/md2.jpg',
                }
            ],
            selected: [],        
        }
    },
}
</script>