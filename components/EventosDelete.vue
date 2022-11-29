<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                outlined
                rounded
                text
                color="red darken-3"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>                        
        </template>
        <v-card>
            <v-card-title class="text-h5">
                Eliminar evento
            </v-card-title>
            <v-card-text>Está a punto de eliminar un evento. ¿Está seguro que desea continuar?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
                Cancelar
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="deleteEvent()"
            >
                Eliminar
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data: () => ({
        dialog: false,
    }),
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        deleteEvent(item){            
            
            this.$axios.delete('/events/'+this.item._id).then(response => {
                if(response.status == 200){
                    this.$emit('deleteEvent', true);                    
                }else{
                    this.$emit('deleteEvent', false);
                }
                this.dialog = false;
            }).catch(error => {
                console.log(error);
                this.$emit('deleteEvent', false);
            });
        },
    },
};
</script>