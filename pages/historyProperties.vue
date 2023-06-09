<template>
    <v-card flat tile>
        <v-toolbar color="#FF6F00" dark>            

            <v-toolbar-title>Edición de la Historia: {{ history.name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>        
        <v-container class="grey lighten-4" fluid>
            <v-subheader class="font-weight-black">Introducción</v-subheader>
            <v-row>
                <v-col v-for="(slide, n) in history.introductions" :key="n" cols="12" sm="6" md="4">                    
                    <v-card>
                        <v-img :src="`http://localhost:5000${slide.background}`"   height="300px">
                            <span class="text-h5 white--text pl-4 pt-4 d-inline-block">{{ slide.title }}</span>
                            <v-card-title></v-card-title>
                        </v-img>

                        <v-card-actions class="white justify-center">
                            <v-btn color="#F57C00" fab icon small @click="editIntroduction(slide)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn color="#F4511E" fab icon small @click="deleteIntroduction(slide)">
                                <v-icon>mdi-trash-can</v-icon>
                            </v-btn>                            
                        </v-card-actions>
                    </v-card>
                </v-col>
                <!--v-spacer></v-spacer-->                
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="12">
                        <v-card elevation="2" class="mx-auto my-12">
                            <v-container fluid>
                                <v-row>
                                    <v-col>
                                        <v-img
                                            class="mb-2"
                                            contain
                                            lazy-src="https://picsum.photos/id/11/10/6"
                                            max-height="200"
                                            max-width="400"
                                            :src="newIntro.background ? `http://localhost:5000${newIntro.background}` : `/upload_image.png`" 
                                        ></v-img><!--`${ process.env.CECAR_API }${ newIntro.background }` : `/upload_image.png`-->
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            class="mb-2"
                                            label="Texto introductorio"
                                            placeholder="Texto introductorio"
                                            outlined
                                            counter="100"
                                            v-model="newIntro.title"
                                            :rules="textRules"                        
                                        ></v-text-field>
                                        <label for="file">Selecciona una imágen:</label>                    
                                        <v-file-input
                                            class="mb-2"
                                            :disabled="(newIntro.title == '') ? true : false"
                                            :rules="imgRules"
                                            accept="image/png, image/jpeg"
                                            placeholder="Selecciona una imagen"
                                            prepend-icon="mdi-camera"
                                            label="Imagen de fondo"
                                            outlined
                                            dense
                                            @change="uploadFile($event)"
                                        ></v-file-input>
                                        <v-btn 
                                            color="blue-grey" 
                                            class="ma-2 white--text" 
                                            @click="addIntroduction"
                                            :disabled="(newIntro.title == '') ? true : false"
                                        > 
                                            Agregar introduccion
                                            <v-icon right dark> mdi-plus </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
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
                            <v-card-title></v-card-title>
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
                                    <v-img :src="`http://localhost:5000${introductionActual.background}`"   height="300px">
                                        <span class="text-h5 white--text pl-4 pt-4 d-inline-block">{{ introductionActual.title }}</span>
                                        <v-card-title>Elementos: {{ introductionActual.hiper_objects }}</v-card-title>
                                    </v-img>
                                    <v-label><a href="`http://localhost:5000${introductionActual.background}`">
                                        {{ introductionActual.background }}</a>
                                    </v-label>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input
                                        :rules="imgRules"
                                        accept="image/png, image/jpeg"
                                        placeholder="Selecciona una imagen"
                                        prepend-icon="mdi-camera"
                                        label="Imagen de fondo"
                                        outlined
                                        dense
                                        @change="uploadFile($event)"
                                    ></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>                        
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>{{ introductionActual }}
                    <v-btn color="blue darken-1" text @click="dialogIntro = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="updateIntroduction">
                        Actualizar
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
import { mapState, mapActions } from 'vuex';

export default {
    name: 'historyProperties',
    data: () => ({
        dialogIntro: false,
        dialogScene: false,                
        previewImage: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' ,
        imgRules: [
            value => {
                return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
            },
        ],
        textRules: [
            // v => v !== null && (!!v || 'El texto es requerido'),
            // v => (v === null || v.length <= 50) || 'El texto no debe exceder los 50 caracteres'
        ],
        newIntro: {
            title: '',
            background: '',
        },
        introductionActual: {},
        escenaActual: {},
    }),
    computed: {
        history() {            
            return this.$store.state.history.histories.find(
                (history) => history._id === this.$route.params.id
            );
        },
    },
    methods: {        
        async uploadFile(file) {
            // validate empty file
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            try { 
                this.$axios.post('/upload', formData).then((response) => {                          
                    let { fileName, fileSize, fileType, message } = response.data;
                    console.log(`fileName ${fileName} fileSize ${fileSize} fileType ${fileType} message ${message}`);
                    this.newIntro.background = `/uploads/${fileName}`; 
                    this.introductionActual.background = `/uploads/${fileName}`;
                    this.previewImage = `/uploads/${fileName}`; 
                }).catch((error) => {
                    throw error;
                });
            }
            catch (error) {
                console.error(error);
            }            
        }, // CRUD History
        addIntroduction() {
            // Llama a la acción "addIntroduction" usando this.$store.dispatch
            this.$store.dispatch('history/addIntroduction', {
                historyId: this.$route.params.id,
                introduction: this.newIntro
            }).then((response) => {                
                console.log(`addIntroduction on vue ${response}`)
                this.$store.dispatch('history/loadHistory', this.$route.params.id);
                this.newIntro = {
                    title: null,
                    background: null
                };
            }).catch((error) => {
                throw error;
            });            
        },
        editIntroduction(introduction) {
            this.introductionActual = { ...introduction };
            this.dialogIntro = true;
        },
        updateIntroduction() { 
            this.$store.dispatch('history/updateIntroduction', {
                introductionId: this.introductionActual._id,
                introduction: this.introductionActual,
                historyId: this.$route.params.id
            }).then((response) => {                                       
                this.introductionActual = {};
                this.newIntro.background = 
                this.dialogIntro = false;
            }).catch((error) => {
                throw error;
            });            
        },
        deleteIntroduction(introduction) {
            this.$store.dispatch('history/deleteIntroduction', {
                historyId: this.$route.params.id,
                introductionId: introduction._id
            }).then((response) => {
                console.log(response)
                this.$store.dispatch('history/loadHistory', this.$route.params.id);
            }).catch((error) => {
                throw error;
            });            
        }, // CRUD Scene        
    },
};
</script>
