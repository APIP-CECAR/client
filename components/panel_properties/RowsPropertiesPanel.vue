<template>        
    <v-row>
        <v-col>
            {{propertie.caption}}
        </v-col>
        <v-col cols="6">        
            <v-text-field
                v-model="propertie.value"
                @click="onSelected"
            ></v-text-field>
        </v-col>
    </v-row>      
</template>
<script>
    export default {
        name: 'RowsPropertiesPanel',
        data: () => ({
            editPropertie: {}
        }),
        props: {
            propertie: {},
            index: {}
        },
        methods: {
            updatePropertie(propertie, index){
                this.$emit('updatePropertie', propertie, index);
            },
            onSelected(){
                console.log('onSelected');
            }
        },
        mounted(){
            this.editPropertie = {...this.propertie};
        }
    }
</script>