<template>
    <div>
        <v-select
            v-model="history"
            :items="stories"
            item-text="name"
            item-value="id"
            label="Historias"
            clearable
        ></v-select>
        <v-data-table :loading="loading"
        loading-text="Cargando listado..." v-model="selected" :headers="headers" :items="reportStudents" :single-select="singleSelect" item-key="name"
            show-select class="elevation-1">
            <template v-slot:top>
                <!--v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch-->            
            </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-btn :disabled="!history || selected.length==0" color="primary" class="mr-2" @click="generatePlan">
            Generar ruta de aprendizaje
          </v-btn>          
        </div>
    </div>
</template>
<script>
var axios = require('axios');
export default {
    props: {
        ids: []
    },
    data() {        
        return {        
            singleSelect: false,            
            selected: [],
            reportStudents:[],
            headers: [
                { text: 'Nombre', value: 'name'},
                { text: 'Apellidos', value: 'surname' },                
            ],
            loading: false,
            stories: [],
            history:null
        }
    },
    methods: {        
        getAllStudentByIds() {            
             axios.post(`${process.env.CECAR_API}/get_all_students_by_ids`, { ids: this.ids })
                 .then((response) => {                                        
                    this.reportStudents = this.outputArrayFromTest(response.data.tests);
                })
                .catch(function (error) {
                    console.log(error);
                })                 
        },
        getAllStudentsUnPlanning() {
            this.loading = true;  
            axios.get(`${process.env.CECAR_API}/get_all_students_unplanning`)
                .then((response) => { 
                    this.loading = false                   
                    this.reportStudents = this.outputArrayFromUser(response.data.users);
            })
            .catch( (error) => {
                console.log(error);
            })
        },
        toggleOrder() {
            this.sortDesc = !this.sortDesc
        },
        nextSort() {
            let index = this.headers.findIndex(h => h.value === this.sortBy)
            index = (index + 1) % this.headers.length
            this.sortBy = this.headers[index].value
        },
        outputArrayFromTest(tests) {        
            return tests.map((obj) => {
                const { _id, name, surname, username } = obj.id_user;
                const { dimensions, indicators } = obj
                
                return {
                    id_usuario: _id,
                    name,
                    surname,
                    username,
                    dimensions,
                    indicators
                };
            });
        },
        outputArrayFromUser(users) {        
            return users.map((obj) => {
                const { _id, name, surname, username } = obj;
                
                return {
                    id_usuario: _id,
                    name,
                    surname,
                    username
                };
            });
        },        
        generatePlan() {
            // Generate plan for students 
            let ids = this.selected.map((obj) => obj.id_usuario)
            let history = this.history;
            axios.post(`${process.env.CECAR_API}/generate_plan`, { ids, history })
                .then((response) => {})
                .catch(function (error) {
                    console.log(error);
                })            
        },
        getStories() { 
            axios.get(`${process.env.CECAR_API}/history`)
                .then((response) => {                                                           
                    this.stories = response.data.map(
                        (obj) => {
                            const { _id, name } = obj;
                            return {
                                id: _id,
                                name,                                
                            };
                        }
                    )
            })
            .catch( (error) => {
                console.log(error);
            })
        }
    },
    mounted() {        
        this.getStories();
        if(this.ids.length>0)
            this.getAllStudentByIds();
        else
            this.getAllStudentsUnPlanning();
    }
}
</script>