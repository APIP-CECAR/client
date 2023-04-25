<template>
    <v-card class="mx-auto">
        <v-card dark flat>
            <!--v-btn absolute bottom color="pink" right fab>
                <v-icon>mdi-plus</v-icon>
            </v-btn-->
            <v-card-title class="pa-2 purple lighten-3">
                <!--v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn-->
                <h3 class="text-h6 font-weight-light text-center grow">
                    Nombre de la Historia
                </h3>
                <!--v-avatar>
                    <v-img
                        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
                </v-avatar-->
            </v-card-title>
            <!--v-img src="https://cdn.vuetifyjs.com/images/cards/forest.jpg" gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)">
                <v-container class="fill-height">
                    <v-row align="center">
                        <strong class="text-h1 font-weight-regular mr-6">
                            Introducción
                        </strong>
                    
                        <div class="text-h5 font-weight-light">
                            Texto introductorio
                        </div>                        
                    </v-row>
                </v-container>
            </v-img-->
            <v-carousel>
                <v-carousel-item
                    v-for="(item, i) in introduccion"
                    :key="i"
                    :src="item.src"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                ></v-carousel-item>
            </v-carousel>
        </v-card>
        <v-card-text class="py-0">
            <v-timeline :dense="$vuetify.breakpoint.smAndDown" align-top>
                <v-timeline-item
                    v-for="(item, i) in items"
                    :key="i"
                    :color="item.color"
                    :icon="item.icon"
                    fill-dot
                    >
                    <v-card
                        :color="item.color"
                        dark
                    >
                        <v-card-title class="text-h6">
                        Escena {{ i+1 }}
                        </v-card-title>
                        <v-card-text class="white text--primary">
                        <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
                        <v-btn
                            :color="item.color"
                            class="mx-0"
                            outlined
                        >
                            Entrar
                        </v-btn>
                        </v-card-text>
                    </v-card>
                    </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        introduccion: [
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            },
        ],
        items: [
            {
                color: 'red lighten-2',
                icon: 'mdi-star',
            },
            {
                color: 'purple darken-1',
                icon: 'mdi-book-variant',
            },
            {
                color: 'green lighten-1',
                icon: 'mdi-airballoon',
            },
            {
                color: 'indigo',
                icon: 'mdi-key-star',
            },
        ],                
    }),
}
</script>
