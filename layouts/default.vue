<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
                  {{ user.name }} {{ user.surname }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        
        <v-list-item
          v-for="(item, i) in filteredItems"
          :key="i"
          :to="item.to"
          router
          exact          
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{item.title}}
            </v-list-item-title>            
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />                  
      <v-toolbar-title>{{ title  }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
        v-model="rightDrawer"
        :right="right"
        temporary
        fixed
      >
        <v-list>
          <v-list-item @click.native="right = !right">
            <v-list-item-action>
              <v-icon light>
                mdi-repeat
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>APIP &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'DefaultLayout',
  data () {
    return {
      rightDrawer: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/',
          roles:['consumer', 'admin']
        },
        {
          icon: 'mdi-car-shift-pattern',
          title: 'Ruta de aprendizaje',
          to: '/learning_path',
          roles: ['admin', 'consumer']
        },
        /*{
          icon: 'mdi-shield-crown-outline',
          title: 'Administración',
          to: '/admin'
        },*/
        {
          icon: 'mdi-comment-edit-outline',
          title: 'Editor de historias',
          to: '/history_editor',
          roles: [ 'admin']
        },
        /*{
          icon: 'mdi-application-cog-outline',
          title: 'Propiedades de la historia',
          to: '/historyProperties'
        },*/
        /*{
          icon: 'mdi-clipboard-text-clock',
          title: 'Historia',
          to: '/history'
        },*/        
        /*{
          icon: 'mdi-book-open-page-variant-outline',
          title: 'Escenas',
          to: '/scene'
        },*/
        /*{
          icon: 'mdi-wrench-outline',
          title: 'Gestion de ambientes',
          to: '/management'
        },*/
        {
          icon: 'mdi-clipboard-text-outline',
          title: 'Generacion de plan',
          to: '/planner',
          roles: ['admin']
        },
        // logout
        {
          icon: 'mdi-logout',
          title: 'Cerrar sesión',
          to: '/logout',
          roles: ['consumer', 'admin']
        }
      ],
      miniVariant: false,
      right: true,      
      title: 'APIP'
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn', 'user']),
    userRole() {
      return this.user ? this.user.rol : null;
    }, filteredItems() {
      // Filtrar los elementos del array items según la condición
      return this.items.filter(item => item.roles.includes(this.userRole));
    }    
  },  
}
</script>
