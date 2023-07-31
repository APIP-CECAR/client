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
                    <v-sheet v-if="item.title!=''" style="background-color: rgba(0, 0, 0, 0.7);" class="position-absolute bottom-0 left-0 right-0 p-2">
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
                                    <v-img :src="`${server}${item.background}`" aspect-ratio="1.7" contain></v-img>                                    
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
export default {    
    name: 'studentHistory',    
    data() {
        return {
            slide:'',
            student: {},
            plans: {},
            history: {},
            status: {},
            studentId: this.$route.params.studentId,
            historyId: this.$route.params.historyId,
            server: process.env.CECAR_API,
        };
    },
    methods: {        
        getStudentHistory() {             
            this.$axios.get(`/planner/student/${this.studentId}`).then((response) => {                                                         
                this.plans = response.data.plans;
                this.student = response.data.student;                
                this.$axios.get(`/history/${this.historyId}`)
                    .then((response) => {
                        this.history = response.data;
                        this.$axios.get(`/students/${this.studentId}/status/`)
                            .then((response) => {
                                this.status = response.data                                
                            })                                        
                    })            
            })
        },
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
    },
    async beforeMount() {
        await this.getStudentHistory();        
    }
}
</script>