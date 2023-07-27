<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>Escenas</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">Nueva Escena</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Crear Escena</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field required :rules="titleRules" v-model="editedItem.title" label="Título"></v-text-field>
                                            </v-col>                                            
                                        </v-row>                                        
                                        <v-row>
                                            <v-col cols="6">                                                
                                                <v-select label="Nivel" v-model="editedItem.level" required :rules="levelRules" :items="['Básico', 'Avanzado']" dense outlined @change="updateInputType"></v-select>
                                            </v-col>
                                            <v-col cols="6">                                                
                                                <v-select label="Competencia" v-model="editedItem.competence" required :rules="competenceRules" :items="competences" dense outlined @change="updateInputType"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6">                                                
                                                <v-select                                                    
                                                    label="Habilidad"
                                                    v-model="editedItem.skill"
                                                    :items="secondSelectOptions"
                                                    dense
                                                    outlined
                                                    required
                                                    :rules="secondSelectOptionsRules"
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="6">                                                
                                                <v-file-input 
                                                    class="mb-2" 
                                                    :rules="fileRules" 
                                                    accept=".jpg, .jpeg, .png, .avi, .mpeg, .ppt" 
                                                    placeholder="Selecciona un archivo" 
                                                    prepend-icon="mdi-multimedia" 
                                                    label="Diapositiva" 
                                                    outlined 
                                                    dense
                                                    @change="uploadFile"></v-file-input>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-divider></v-divider>
                                                <label>Archivos H5P</label>
                                            </v-col>
                                        </v-row>                                        
                                        <v-row>
                                            <v-col cols="12">
                                                <v-row>
                                                    <v-col cols="6">                 
                                                        <v-card elevation="0">
                                                            <v-card-text>
                                                                <div>Recursos H5P agregados</div>
                                                                <p v-for="(nameFile, i) in namesFiles" :key="i" class="font-weight-light">                                                                    
                                                                   <v-icon>mdi-semantic-web</v-icon> {{ nameFile }}
                                                                </p>
                                                            </v-card-text>                                                            
                                                        </v-card>                                                        
                                                    </v-col>
                                                    <v-col cols="6">                                                        
                                                        <!-- Muestra el componente v-file-input si el tipo de entrada es "Archivo" -->
                                                        <v-file-input
                                                            ref="fileInput"
                                                            class="mb-2" 
                                                            :rules="fileRules"
                                                            accept=".h5p"
                                                            placeholder="Selecciona un archivo" 
                                                            prepend-icon="mdi-file"
                                                            label="Archivo" 
                                                            outlined 
                                                            dense 
                                                            required                                                            
                                                            @change="uploadFile">
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
            
                                    </v-container>                                    
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                    <v-data-table :headers="headers" :items="scenes" :search="search" sort-by="title" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Lista de Escenas</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
                            </v-toolbar>
                        </template>
                        <!--template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                        </template-->
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {    
    data() {
        return {
            scenes: [],
            search: '',
            dialog: false,
            editedIndex: -1,
            resources: [],
            manes_resources: [],
            namesFiles:[],
            editedItem: {
                title: '',
                background: '',
                hiper_objects: [],
                level: '',
                competence: '',
                skill: '',
                minigame: [],                
            },
            defaultItem: {
                title: '',
                background: '',
                hiper_objects: [],
                level: '',
                competence: '',
                skill: '',
                minigame: []
            },
            headers: [
                {
                    text: 'Título',
                    align: 'left',
                    value: 'title'
                },
                {
                    text: 'Fondo',
                    align: 'left',
                    value: 'background'
                },
                {
                    text: 'Recurso',
                    align: 'left',
                    value: 'hiper_objects'
                },
                {
                    text: 'Nivel',
                    align: 'left',
                    value: 'level'
                },
                {
                    text: 'Competencia',
                    align: 'left',
                    value: 'competence'
                },                
                {
                    text: 'Fondo',
                    align: 'left',
                    value: 'background'
                },
                {
                    text: 'Acciones',
                    value: 'actions',
                    sortable: false
                }
            ],
            fileRules: [],
            selectedInputType: 'Archivo', // Tipo de entrada seleccionado por defecto
            inputTypes: ['Archivo H5P'], // Opciones del select
            url: '',
            secondSelectOptions: [],
            competences: [
                { text: 'Observación', value:'observation'}, 
                { text: 'Comparación', value:'comparison'}, 
                { text: 'Clasificación', value:'clasification'}, 
                { text: 'Descripción', value: 'description' }
            ],
            titleRules: [
                (v) => !!v || "El título es obligatorio", // Regla de validación para el título
            ],
            levelRules: [
                (v) => !!v || "El nivel es obligatorio", // Regla de validación para el nivel
            ],
            competenceRules: [
                (v) => !!v || "La competencia es obligatoria", // Regla de validación para la competencia
            ],
            fileRules: [
                (v) => !!v || "El archivo es obligatorio", // Regla de validación para el input file
            ],
            // fileRequiredRule: (v) => !this.fileLoaded || !!v, // Regla de validación personalizada para mostrar mensaje de error si no se ha cargado el archivo
            secondSelectOptionsRules: [(v) => !!v || "La habilidad es obligatoria", // Regla de validación para el segundo select
            ]
        };
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Crear Escena' : 'Editar Escena';
        }
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.scenes.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            const index = this.scenes.indexOf(item);
            if (confirm('¿Estás seguro de que quieres eliminar esta escena?')) {
                // Aquí debes realizar la petición DELETE a tu API para eliminar el objeto de MongoDB
                this.scenes.splice(index, 1);
            }
        },
        close() {
            this.resetForm();
            this.dialog = false;
            this.namesFiles = [];
            this.editItem.hiper_objects = []
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },
        save() {            
            if (this.editedIndex > -1) {
                // Aquí se debe realizar la petición PUT a tu API para actualizar el objeto de MongoDB                
                // Object.assign(this.scenes[this.editedIndex], this.editedItem);
            } else {

                this.$axios.post('/scenes', this.editedItem ).then(response => {
                    console.log('add scenes',response);
                    this.$emit('onSaveNewScene', response.data._id);
                    this.scenes.push(response.data);
                    // emit function onSaveNewScene and set id scene                    
                    this.close();
                }).catch(error => {
                    console.log(error);
                    this.close();
                });
            }            
        },
        // new methods
        async uploadFile(file) {
            if (!file) return;

            if (this.selectedInputType === 'Archivo') {
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await this.$axios.post('/upload', formData);
                    const { fileName, fileSize, fileType, message } = response.data;
                    // console.log(`fileName ${fileName} fileSize ${fileSize} fileType ${fileType} message ${message}`);
                    this.resources.push(this.name_resource)
                    this.name_resource = '';
                    console.log(fileName, fileSize, fileType, message)
                    if (fileType == 'application/octet-stream') {
                        this.editedItem.hiper_objects.push(`/uploads/${fileName}`);
                        this.namesFiles.push(fileName);
                    }
                    else
                        this.editedItem.background = `/uploads/${fileName}`;
                    
                } catch (error) {
                    console.error(error);
                }
            } else if (this.selectedInputType === 'URL') {
                console.log('URL:', this.url);
            }
        },        
        updateURL(url) {
            this.url = url;
        },
        updateInputType() {
            // Limpiar la URL cuando se cambia el tipo de entrada
            this.url = '';
        },
        updateInputType() {
            switch (this.editedItem.competence) {
                case "observation":
                    this.secondSelectOptions = [
                        { text: "Dar a conocer", value: "n1-obs-1" },
                        { text: "Detectar", value: "n1-obs-2" },
                        { text: "Identificar", value: "n1-obs-3" },
                    ];
                    break;
                case "comparison":
                    this.secondSelectOptions = [
                        { text: "Definir", value: "n1-com-1" },
                        { text: "Detectar", value: "n1-com-2" },
                        { text: "Identificar", value: "n1-com-3" },
                    ];
                    break;
                case "clasification":
                    this.secondSelectOptions = [
                        { text: "Asociar", value: "n1-cla-1" },
                        { text: "Proponer", value: "n1-cla-2" },
                        { text: "Caracterizar", value: "n1-cla-3" },
                    ];
                    break;
                case "description":
                    this.secondSelectOptions = [
                        { text: "Analizar", value: "n1-des-1" },
                        { text: "Listar", value: "n1-des-2" },
                        { text: "Reflexionar", value: "n1-des-3" },
                    ];
                    break;
                default:
                    this.secondSelectOptions = [];
                    break;
            }

            // Limpiar la opción seleccionada del segundo select
            this.editedItem.option = "";
        },
        resetForm() {
            // Resetea los valores del formulario a sus valores iniciales o a valores vacíos
            this.editedItem.title = "";
            this.editedItem.level = "";
            this.editedItem.competence = "";
            // ... restablecer otros campos del formulario según sea necesario ...
            this.fileLoaded = false; // Restablecer el estado del input file
        },
    },
    mounted() {
        // Aquí debes realizar la petición GET a tu API para obtener las escenas de MongoDB y asignarlas a this.scenes
        this.$axios.get('/scenes').then(response => {
            this.scenes = response.data;
        }).catch(error => {
            console.log(error);
        });
        
    }
};
</script>
