<template>
    <v-container>    
        <h1> Usted está cerrando sesión </h1>
    </v-container>
</template>
<script>
    export default {
        data(){
            return {
                title: 'Logout'
            }
        },
        mounted(){
            this.$auth.logout()
        }
    }
</script>