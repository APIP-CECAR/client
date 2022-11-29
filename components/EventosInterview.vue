<template>
    <div>
        <v-dialog
            v-model="dialog"
            persistent                  
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    outlined
                    rounded
                    text
                    color="#03719B"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-cellphone-information</v-icon> Formulario de encuesta
                </v-btn>            
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    Formulario de encuesta
                </v-card-title>
                <v-card-text>
                    <div class="text-center">
                        <v-row>
                            <v-col cols="12" sm="8" md="8">
                                <v-select
                                    v-model="select"                        
                                    :items="types"
                                    item-text="title"
                                    item-value="value"
                                    label="Adiciona un elemento"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-btn @click="addFieldToForm">
                                    Adicionar elemento
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-row v-for="(f, i) in fields" :key="i">
                        <v-col cols="10" sm="8" md="8" class="pa-md-1 mx-lg-auto">
                            <RenderElement :element="f"/>
                        </v-col> 
                        <v-col cols="2" sm="2" md="2" >                            
                            <v-btn icon @click="showPropertiesElement(f, i)">
                                <v-icon>mdi-ballot-outline</v-icon>
                            </v-btn>
                            <v-btn icon @click="removeFieldFromForm(i)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <!--v-btn color="green darken-1" text>
                        Guardar
                    </v-btn-->
                </v-card-actions>

                <v-dialog v-model="dialog_properties" scrollable>
                    <v-card class="blue darken-3">
                        <v-card-title>Propiedades del elemento </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 300px;">
                            <v-text-field
                                v-model="fieldEdit.caption"
                                label="Etiqueta del campo"
                                required
                            >
                            </v-text-field>

                            <v-select
                                v-model="fieldEdit.type"
                                :items="types"
                                item-text="title"
                                item-value="value"
                                label="Tipo de dato del elemento"
                                persistent-hint
                                return-object
                                single-line
                            ></v-select>
                            
                            <v-switch 
                                v-model="fieldEdit.required" 
                                :label="`${fieldEdit.required?'Requerido' : 'No requredio'}`" 
                                color="success"                                    
                            >
                            </v-switch>
                            <PanelProperties :index="posFieldEdit" :properties="properties" @updateProperties="onUpdateProperties"/>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-btn color="blue darken-1"  @click="dialog_properties = false">
                            Cerrar
                        </v-btn>
                        <!--v-btn color="blue darken-1"  @click="dialog_properties = false">
                            Guardar
                        </v-btn-->
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-dialog>        
    </div>
    
</template>
<script>
import elements from '~/utils/elements'
export default {
    data: () => ({
        dialog: false,
        dialog_properties: false,
        properties: [],
        select: { title: '', value: '' },
        closeOnClick: true,
        fields:[],
        field:{},
        fieldEdit: {},
        posFieldEdit: -0,
        types:[            
            { title: 'Texto', value: 'text'},
            { title: 'Lista', value: 'select'},
            /*{ title: 'Número', value: 'number'},
            { title: 'Fecha', value: 'date'},
            { title: 'Hora', value: 'time'},
            { title: 'Fecha y hora', value: 'datetime-local'},
            { title: 'Email', value: 'email'},
            { title: 'Teléfono', value: 'tel'},
            { title: 'URL', value: 'url'},
            { title: 'Color', value: 'color'},
            { title: 'Archivo', value: 'file'},
            { title: 'Checkbox', value: 'checkbox'},
            { title: 'Radio', value: 'radio'},            
            { title: 'Lista múltiple', value: 'select-multiple'},
            { title: 'Texto largo', value: 'textarea'},*/
        ],
    }),
    props: {
        id:'',
    },
    methods: {        
        removeFieldFromForm(index){
            this.fields.splice(index, 1);
        },        
        addFieldToForm(){            
            this.field = elements[this.select.value];            
            this.fields.push(this.field);
            this.renderField();
        },
        renderField(){},
        showPropertiesElement(f, i){       
            console.log('showPropertiesElement', f, i);     
            this.fieldEdit = f;
            this.posFieldEdit = i;
            this.dialog_properties = true;
            this.properties = [...f.properties];

        },
        onUpdateProperties(properties){            
            this.properties = properties;
            this.fields[this.posFieldEdit].properties = [...properties];
            /*console.log('onUpdatePropertiesEI', properties);   
            console.log("Pos", this.posFieldEdit);
            console.log("Field", this.fields);
            //this.fields[this.posFieldEdit].properties = [...properties];
            // this.fields[this.posFieldEdit] = this.fieldEdit;    */        
        }
    },
};
</script>