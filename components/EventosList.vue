<template>
  <v-container fluid>
    <template v-if="isLoading">
        <v-sheet
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
        >
            <v-skeleton-loader
                class="mx-auto"                
                type="card"
            ></v-skeleton-loader>
        </v-sheet>
    </template>
    <v-data-iterator
        :items="events"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
        v-if="!isLoading"
    >
    <template  v-slot:default="props">
        <v-card 
            v-for="item in props.items"
            :key="item._id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="mx-auto ma-2"
            color="#1FACE3"
            outlined
        >
            <v-list-item three-line>
            <v-list-item-content>                
                <v-list-item-title class="text-h5 mb-1">
                {{item.name}}
                </v-list-item-title>
                <v-list-item-subtitle>                    
                    <v-chip
                        v-for="date_event in item.date_event" :key="date_event"
                        color="#0A23A9"
                        text-color="white"
                        small
                        class="ma-2"
                    >
                        <v-avatar left>
                            <v-icon small>mdi-calendar</v-icon>
                        </v-avatar>
                        {{date_event.split('T')[0]}}
                    </v-chip>                    
                </v-list-item-subtitle>
                <div class="text-overline mb-4">
                    <v-switch 
                        v-model="item.active" 
                        :label="`${item.active?'Activo' : 'Inactivo'}`" 
                        color="#17EA66"
                        @change="updateEventActive(item)"
                    >
                    </v-switch>                    
                </div>
            </v-list-item-content>

                <v-avatar class="ma-3" size="125" tile>
                    <v-img src="./images/entrevistas.png"></v-img>
                </v-avatar>
            </v-list-item>

            <v-card-actions>
                <EventosInterview />
                <v-spacer></v-spacer>            
                <EventosDelete :item="item" @deleteEvent="onDeleteEvent"/>
            </v-card-actions>
        </v-card>
    </template>      
    </v-data-iterator>
  </v-container>
</template>
<script>  
  export default {
    inject: {
      theme: {
        default: { isDark: false },
      },
    },
    props:{
        events_length: 0
    },
    data () {
      return {
        isLoading: false,
        dialog: false,
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'name',        
        events:[],        
      }
    },
    watch:{
        events_length(){
            this.getEvents();
        }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },      
    },
    methods: {
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage (number) {
            this.itemsPerPage = number
        },
        getEvents(){
            this.isLoading = true;
            this.$axios.get('/events').then(response => {                
                if(response.data.length > 0){
                    this.events = response.data;
                }else{
                    this.events = [];
                }                
                this.isLoading = false;                
            })
        },
        updateEventActive(item){
            this.$axios.put('/events/'+item._id, {
                active: item.active
            }).then(response => {
                this.getEvents()
            })
        },        
        editEvent(item){
            // this.$router.push({name: 'editEvent', params: {id: item._id}})
        },
        onDeleteEvent(item){
            if(item){
                this.getEvents();
            }else{
                console.log('Error al eliminar el evento')
            }            
        }
    },
    mounted(){
      this.getEvents();
    }
  }
</script>