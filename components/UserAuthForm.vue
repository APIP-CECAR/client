<template>
    <v-form v-model="valid" ref="form_login">
        <v-text-field 
            prepend-icon="mdi-account"
            dense 
            outlined 
            v-model="userInfo.username"
            label="Usuario"  
            required   
            :rules="rulesUsername"
        />
        <v-text-field 
            dense 
            outlined 
            v-model="userInfo.password"
            prepend-icon="mdi-key"
            label="Contraseña"
            :type="showPassword? 'text' : 'password'" 
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            counter=true
            required
            :rules="rulesPassword"
            />
        <v-btn 
            :disabled="!valid"
            dense 
            outlined 
            color="success" 
            @click="submitForm(userInfo)"
        >{{buttonText}}
        </v-btn>        

        <v-snackbar v-model="snackbar"  :timeout="timeout" :color="snackbarColor">            
            {{snackbarText}}
        </v-snackbar>
    </v-form>
</template>
<script>    
    const jwt = require("jsonwebtoken");
    export default{
        data(){
            return {
                valid: true,
                showPassword: false,
                snackbar: false,
                timeout: 3000,
                snackbarText: '',
                snackbarColor: 'success',                
                userInfo: {
                    username: '',                    
                    password: ''
                },
                rulesUsername: [
                    v => !!v || 'El usuario es requerido',
                ],
                rulesPassword: [
                    v => !!v || 'La contraseña es requerida',
                    v => (v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres'
                ],                
            }
        },
        props:[
            "submit", "buttonText", "hasName"
        ],
        methods: {
            submitForm(userInfo){                
                this.$refs.form_login.validate();
                try{
                    // peticion de login
                    const response = this.$auth.loginWith('local', { data: userInfo})
                        .then((response) => {                                                    
                            this.$router.push({ path: '/' })
                            // !Esta linea se debe utilizar para refrescar el token. Se debe ubicar en default.vue
                            // await this.$auth.setUserToken(response.data.access_token, response.data.refresh_token)
                            this.logeading = false;
                        }).catch((error) => {
                            console.log(error)
                            this.snackbarText = 'Usuario o contraseña incorrectos'
                            this.snackbarColor = 'error'
                            this.snackbar = true
                            this.logeading = false;
                        })                    
                } catch(e) {
                    // console.log(e.message)
                    this.snackbarText = "Error de usuario o contraseña"
                    this.snackbarColor = "error"
                    this.snackbar = true
                }            
            }            
        }
    }
</script>
