<template>
    <div>
        <v-row justify="center">
            <v-col cols="12">
                <v-card class="mx-auto pa-0 mb-5">
                    <v-toolbar>
                        <v-toolbar-title>Ruta de aprendizaje</v-toolbar-title>                        
                        <v-progress-linear
                            :active="loading"
                            :indeterminate="loading"
                            absolute
                            bottom
                            color="deep-purple accent-4"
                        ></v-progress-linear>
                    </v-toolbar>                    
                    <v-card-actions> 
                        <ListPlansAdmin v-if="!loading" :students="students"/>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>        
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    // ... otras opciones del componente ...
    computed: {
        ...mapState('auth', ['loggedIn', 'user']),
        ...mapState('students', ['loading', 'students']),
        userRole() {
            return this.user ? this.user.rol : null;
        },
    },
    methods: {
        ...mapActions('students', ['getAllStudents', 'getStudent']),
    },
    async beforeMount() {
        if (this.userRole === 'admin') {
            await this.getAllStudents();
        } else  if (this.$store.state.auth.user.rol != 'admin') {
            this.getStudent(this.$store.state.auth.user.id);
        }
    },
};
</script>
<!--script>
import { mapState } from 'vuex';
var axios = require('axios');
export default {    
    data() {
        return {
            loading:false,
            students: [],            
            plans: [],
        }
    },
    methods: {
    //Obtener todos los estudiantes planificados isPlanning:true
        getAllStudents() {
            this.loading = true;
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
                    this.loading = false;                    
            })
            .catch((error) => {
                this.loading = false;
                console.log(error);
            })
        },
        getStudent() {
            this.loading = true;
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
                    this.loading = false;              
            })
            .catch( (error) => {
                console.log(error);
                this.loading = false;
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
</script-->
