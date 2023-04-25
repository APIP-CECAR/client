<template>
    <v-card flat tile>
        <v-toolbar color="#FF6F00" dark>
            <!--v-toolbar-side-icon class="pa-2 ma-1">
                <v-icon>mdi-image-multiple-outline</v-icon>
            </v-toolbar-side-icon-->

            <v-toolbar-title>Edición de la Historia: {{ history.name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-container class="grey lighten-4" fluid>
            <v-subheader class="font-weight-black">Introducción</v-subheader>
            <v-row>
                <v-spacer></v-spacer>
                <v-col v-for="(slide, n) in history.introduction" :key="n" cols="12" sm="6" md="4">                    
                    <v-card>
                        <v-img :src="`https://picsum.photos/200/300?image=${getImage()}`"   height="300px">
                            <span class="text-h5 white--text pl-4 pt-4 d-inline-block">{{ slide.title }}</span>
                            <v-card-title>Elementos: {{ slide.hiper_objects.length }}</v-card-title>
                        </v-img>

                        <v-card-actions class="white justify-center">
                            <v-btn color="#F57C00" fab icon small @click="showPropertiesIntroduction(slide)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn color="#F4511E" fab icon small>
                                <v-icon>mdi-trash-can</v-icon>
                            </v-btn>
                            <v-btn color="#F4511E" fab icon small @click="addSlideToIntroduction">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="grey lighten-4" fluid>
                <v-subheader class="font-weight-black">Escenas</v-subheader>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col v-for="(scene, n) in history.scenes" :key="n" cols="12" sm="6" md="4">
                        <v-card>
                            <v-img :src="`https://picsum.photos/200/300?image=${getImage()}`" height="300px">                                
                                <span class="text-h5 white--text pl-4 pt-4 d-inline-block">{{ scene.title }}</span>
                                <v-card-title>Elementos: {{ scene.hiper_objects.length }}</v-card-title>
                            </v-img>

                            <v-card-actions class="white justify-center">                                
                                <v-btn color="#F57C00" fab icon small @click="showPropertiesScene(scene)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn color="#F4511E" fab icon small>
                                    <v-icon>mdi-trash-can</v-icon>
                                </v-btn>
                                <v-btn color="#F4511E" fab icon small @click="addScene">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialogIntro" persistent max-width="600px">                    
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Edición de introducción</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Título" 
                                            required 
                                            v-model="introductionActual.title"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Fondo" 
                                            hint="Coloque la ruta de la imagen que desea colocar de fondo" 
                                            v-model="introductionActual.background">
                                        </v-text-field>
                                    </v-col>
                                
                                </v-row>
                            </v-container>                        
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogIntro = false">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="dialogIntro = false">
                            Guardar
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>
            </template>
            <template>
                    <v-row justify="center">
                        <v-dialog v-model="dialogScene" persistent max-width="600px">                    
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Edición de Escenas</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field 
                                                label="Título" 
                                                required 
                                                v-model="escenaActual.title"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                label="Fondo" 
                                                hint="Coloque la ruta de la imagen que desea colocar de fondo" 
                                                v-model="escenaActual.background">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                label="Objetos interactivos" 
                                                hint="" 
                                                v-model="escenaActual.hiper_objects">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                label="Nivel" 
                                                hint="" 
                                                v-model="escenaActual.level">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                label="Competencia" 
                                                hint="" 
                                                v-model="escenaActual.competence">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                label="Habilidad" 
                                                hint="" 
                                                v-model="escenaActual.skill">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field 
                                                label="Recursos educativos" 
                                                hint="" 
                                                v-model="escenaActual.minigame">
                                            </v-text-field>
                                        </v-col>                                
                                    </v-row>
                                </v-container>                        
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogScene = false">
                                Cancelar
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="dialogScene = false">
                                Guardar
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-row>
                </template>
    </v-card>
</template>
<script>
export default {
    name:'historyProperties',
    data: () => ({
        dialogIntro: false,
        dialogScene: false,        
        introductionActual: {},
        escenaActual: {},
        history: {            
            competence: "PC",
            name: "Historia de ejemplo",
            introduction: [
                {
                    _id:"",
                    title: "Diapositiva 1",
                    background: "",
                    hiper_objects: [{}]
                }
            ],
            scenes: [
                {
                    _id: "",
                    title: "Escena 1",
                    background: "",
                    hiper_objects: [{}],
                    level: "",
                    competence: "",
                    skill: "",
                    minigame: [
                        {
                            name: "",
                            path: "",
                            description: "",
                            score: ""
                        }
                    ]
                }
            ]
        }            
    }),
    methods: {
        getImage() {
            const min = 550
            const max = 560

            return Math.floor(Math.random() * (max - min + 1)) + min
        },
        showPropertiesIntroduction(intro) {
            this.introductionActual = intro;
            this.dialogIntro = true
        },
        showPropertiesScene(scene) {
            this.escenaActual = scene;
            this.dialogScene = true
        },
        addSlideToIntroduction() { 
            let slide = {
                _id: "",
                title: "Nueva diapositiva",
                background: "",
                hiper_objects: [{}]
            }

            this.history.introduction.push(slide)
        },
        addScene() {
            let scene =  {
                _id: "",
                title: "Nueva Escena",
                background: "",
                hiper_objects: [{}],
                level: "",
                competence: "",
                skill: "",
                minigame: [
                    {
                        name: "",
                        path: "",
                        description: "",
                        score: ""
                    }
                ]
            }
            

            this.history.scenes.push(scene)
        }
    },
}
</script>