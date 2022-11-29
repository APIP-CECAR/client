<template>
  <v-container>    
    <v-card-title> Login </v-card-title>
    <UserAuthForm buttonText="Login"/>
  </v-container>    
</template>
<script>
import UserAuthForm from '~/components/UserAuthForm'
export default {
  components: {
    UserAuthForm
  },
  methods: {}
}
</script>
