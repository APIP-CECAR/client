<template>
    <v-container>    
        <h1> Usted está cerrando sesión </h1>
    </v-container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Logout',
    data(){
        return {
            title: 'Logout'
        }
    },
    mounted() {    
        this.handleLogout()    
    },
    methods: {        
        handleLogout() {
            // Lógica para cerrar la sesión...
            // Por ejemplo, hacer una petición al backend para cerrar la sesión o eliminar el token de sesión del localStorage

            this.$auth.logout()
            // Después de cerrar la sesión, llamamos a la acción "logout" para actualizar el estado
            // this.logout();

            // Redirigimos a la página de inicio o a donde consideres necesario después del logout
            this.$router.push('/login');
        },
    },
}
</script>