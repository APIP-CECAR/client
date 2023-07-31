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
import { mapState } from 'vuex';
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
            axios.get(`${process.env.CECAR_API}/planner/students/`)
                .then((response) => {                                         
                    let { students, plans } = response.data;
                    this.students = students;                    
                    this.students.forEach(student => {
                        student.plansLengt = student.plans.length;

                        student.plans.forEach(plan => {                    
                            student.history = plan.history.name;
                            student.historyId = plan.history._id;
                        });
                        let field = `student_${student._id}`                        
                        student.path = plans[field];                        
                    });   
                    // console.log(students)                 
            })
            .catch( (error) => {
                console.log(error);
            })
        },
        getStudent() {
            axios.get(`${process.env.CECAR_API}/planner/student/${this.user.id}`)
                .then((response) => {                                         
                    let { student, plans } = response.data;
                    this.students.push(student);                    
                    this.students.forEach(student => {
                        student.plansLengt = student.plans.length;

                        student.plans.forEach(plan => {                    
                            student.history = plan.history.name;
                            student.historyId = plan.history._id;
                        });
                        let field = `student_${student._id}`                        
                        student.path = plans[field];                        
                    });   
                    // console.log(students)                 
            })
            .catch( (error) => {
                console.log(error);
            })            
        }    
    },
    computed: {
        ...mapState('auth', ['loggedIn', 'user']),
        userRole() {
            return this.user ? this.user.rol : null;
        },
    },
    async beforeMount() {
        if(this.userRole=='admin')
            await this.getAllStudents();   
        else
            this.getStudent();     
    }
}
</script>
