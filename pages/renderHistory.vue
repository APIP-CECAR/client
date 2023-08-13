<template>    
    <v-card class="mx-auto">
        <v-card dark flat>
            <v-card-title class="pa-2 purple lighten-3">                    
                <h3 class="text-h6 font-weight-black text-center grow">
                    {{ history.name }}
                </h3>
            </v-card-title>
            <v-carousel>
                <v-carousel-item
                    v-for="(item, i) in history.introductions"
                    :key="i"
                    :src="`${server}${item.background}`"
                    reverse-transition="fade-transition"
                    transition="fade-transition"                    
                >                
                    <!-- Contenido del carrusel -->
                    <v-sheet 
                        v-if="item.title!=''" 
                        style="background-color: rgba(0, 0, 0, 0.7);" 
                        class="position-absolute bottom-0 left-0 right-0 p-2">
                        <div class="text-h6 text-left pl-2">{{ item.title }}</div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-card>
        <v-card-text class="py-0">
                <v-timeline dense align-top>
                    <v-timeline-item
                        v-for="(item, i) in history.scenes"
                        :key="i"
                        color="indigo"
                        icon="mdi-book-open-page-variant"
                        fill-dot
                        >
                        <v-card color="indigo" dark>
                            <v-card-title class="text-h6">
                                {{ item.title }}
                            </v-card-title>
                            <v-card-text class="white text--primary">
                            <v-row>
                                <v-col>
                                    <!--Iframe :src="getIframeSrc(item.background)" :width="300" :height="400" /-->
                                    <!--v-img :src="`${server}${item.background}`" aspect-ratio="1.7" contain></v-img-->
                                    <Iframe 
                                        :src="getIframeSrc(item.background)" 
                                        :width="iframeWidth" 
                                        :height="iframeHeight"
                                        :style="{ 'padding-top': `${iframeAspectRatio}%` }"
                                    >
                                    </Iframe>
                                    <!--button @click="openYouTubeVideo">Abrir YouTube</button-->
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <template>
                                        <v-card class="mx-auto">
                                            <v-container class="pa-1">                                                
                                                <v-item-group multiple>
                                                    <v-row>                                                                                                                
                                                        <v-col
                                                            v-for="(ho, i) in item.hiper_objects"
                                                            :key="i"
                                                            cols="12"
                                                            md="4"
                                                        >
                                                        
                                                            <v-item>                                                                  
                                                                <v-img
                                                                    src="/800px-H5P_Logo.svg.png"
                                                                    height="150"
                                                                    class="text-right pa-2"                                                                    
                                                                >
                                                                    <v-btn icon dark :disabled="isSkillDisabled(item)">
                                                                        <v-icon>                                                                     
                                                                            {{ isSkillDisabled(item)  ? 'mdi-alert-decagram' : 'mdi-check-decagram' }}
                                                                        </v-icon>
                                                                    </v-btn>
                                                                    
                                                                    <RenderH5P 
                                                                        class="mx-0 align-center align-end"
                                                                        :server="server" 
                                                                        :studentId="studentId"
                                                                        :competence="item.competence"
                                                                        :skill="item.skill"
                                                                        :ho="ho"
                                                                    />
                                                                </v-img>
                                                            </v-item>
                                                        </v-col>
                                                    </v-row>
                                                </v-item-group>
                                            </v-container>
                                        </v-card>
                                    </template>
                                </v-col>
                            </v-row>                            
                            </v-card-text>
                        </v-card>
                        </v-timeline-item>
                </v-timeline>
            </v-card-text>
    </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'studentHistory',
    data() {
        return {
            slide: '',
            student: {},
            plans: {},            
            status: {},
            studentId: this.$route.params.studentId,
            historyId: this.$route.params.historyId,
            server: process.env.CECAR_API,
            iframeWidth: 600, // Ancho del iframe
            iframeHeight: 0, // Altura se calculará según el aspect ratio
            iframeAspectRatio: 1.7, // Aspect ratio deseado (ejemplo: 1.7)
            urlYoutube:''
        };
    },
    computed: {
        ...mapState('history', ['history']),
    },
    methods: {
        ...mapActions('history', ['loadHistory']),
        // Función para verificar si el skill está habilitado o no
        isSkillEnabled(item) {
            let competence = this.status[item.competence]
            let skill = this.getFormattedSkill(item.skill)

            if (competence) {
                return competence[skill]
            }
        },
        // Función para verificar si el botón del skill debe estar deshabilitado o no
        isSkillDisabled(item) {
            // console.log('isSkillDisabled', item)
            return !this.isSkillEnabled(item);
        },
        // Función para obtener el skill formateado (sin guiones)
        getFormattedSkill(skill) {
            // console.log('getFormattedSkill', skill)
            return skill.replace(/-/g, '');
        },
        
        getIframeSrc(background) {
            if (background.startsWith("/")) {
                // Si la ruta comienza con "/", es interna, agrega el prefijo del servidor
                return `${this.server}${background}`;
            } else {
                // Si no comienza con "/", verifica si es una URL de YouTube
                const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&]+)/;
                if (youtubeRegex.test(background)) {
                    this.urlYoutube = background; 
                    return "https://www.youtube.com/embed/" + background.match(youtubeRegex)[3];
                } else {
                    this.urlYoutube = null; 
                    return background;
                }
            }
        },
        openYouTubeVideo() {
            if (this.urlYoutube) {
                window.open(this.urlYoutube, '_blank');
            }
        }
    },
    async beforeMount() {
        // ... Mantén el resto del código creado aquí ...
        try {            
            await this.loadHistory(this.historyId);
            this.loading = false;
        } catch (error) {
            console.error(error);
            this.loading = false;
        }
    },    
    watch: {
        // Actualiza la altura del iframe cuando cambia el aspect ratio o el ancho
        iframeAspectRatio(newAspectRatio) {
            this.iframeHeight = this.iframeWidth / newAspectRatio;
        },
        iframeWidth(newWidth) {
            this.iframeHeight = newWidth / this.iframeAspectRatio;
        }
    },
    mounted() {
        // Calcula la altura inicial del iframe
        this.iframeHeight = this.iframeWidth / this.iframeAspectRatio;
    }
};
</script>