<template>
  <v-card
    class="d-flex pa-2"
    outlined
    tile
  >
    <div> {{key}}    
        <v-container fluid>
            <v-combobox
            v-model="model"            
            clearable
            hide-selected            
            label="Agrege valores para esta propiedad"
            multiple
            persistent-hint
            small-chips
            >            
            </v-combobox>
        </v-container>
    </div>
  </v-card>
</template>
<script>
    export default {
        name: 'ArrayPropertiesPanel',
        data: () => ({
            editPropertie: {},            
            model: [],
            items: [],
            search: null,
            key: ''
        }),
        watch: {        
            editPropertie (val) {
                this.key = Object.keys(this.editPropertie)[0];
                this.items = this.editPropertie[this.key];
            },
            model (val) {
                this.editPropertie[this.key] = val;
                this.$emit('updatePropertie', {propertie:this.editPropertie, index:this.index});
                //this.$emit('updatePropertie', { [this.key]: val, index:this.index });
            }
        },
        props: {
            propertie: {},
            index: {}
        },
        methods: {},
        mounted(){
            this.editPropertie = {...this.propertie};
        }
    }
</script>
