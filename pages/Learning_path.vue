<template>
    <div>
        <v-row justify="center">
            <v-col cols="12">
                <v-card class="mx-auto pa-0 mb-5">
                    <v-card-title class="headline">
                        Ruta de aprendizaje
                    </v-card-title>
                    <v-card-actions>
                        <ListPlansAdmin :students="students"/>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>        
    </div>
</template>
<script>

var axios = require('axios');
export default {    
    data() {
        return {
            students: [],            
            plans: [],
        }
    },
    methods: {
    //Obtener todos los estudiantes planificados isPlanning:true
        getAllStudents() {
            axios.get(`${process.env.CECAR_API}/planner/students`)
                .then((response) => {                                         
                    let { students, plans } = response.data;
                    this.students = students;
                    // console.log(this.students, plans);
                    this.students.forEach(student => {
                        student.plansLengt = student.plans.length;

                        student.plans.forEach(plan => {                    
                            student.history = plan.history.name
                        });
                        let field = `student_${student._id}`
                        //console.log(field,typeof plans, plans[field])
                        student.path = plans[field];                        
                    });   
                    console.log(students)                 
            })
            .catch( (error) => {
                console.log(error);
            })
        },    
    },
    async created() {        
        await this.getAllStudents();        
    }
}
</script>
