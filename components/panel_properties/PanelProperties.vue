<template>
    <div>
        <v-row v-for="(propertie, i) in properties" :key="i">            
            <!--v-col cols="12"  v-if="typeof propertie.value == String">
                <RowsPropertiesPanel :propertie="propertie" :index="i" @updatePropertie="updatePropertie"/>
            </v-col-->
            <v-col cols="12">
                <ArrayPropertiesPanel :propertie="propertie" :index="i" @updatePropertie="onUpdatePropertie"/>
            </v-col>
        </v-row>
    </div>
</template>
<script>    
    import ArrayPropertiesPanel from './ArrayPropertiesPanel.vue';
    export default {
        name: 'PanelProperties',        
        data: () => ({            
            tempProperties:[]
        }),
        props: {
            properties: [],
            index: 0
        },
        watch: {
            properties (val) {
                this.tempProperties = [...val];
            }
        },
        methods: {
            onUpdatePropertie(data){                
                this.tempProperties[data.index] = data.propertie;
                this.$emit('updateProperties', this.tempProperties);                
            },
            onSelected(){
                // console.log('onSelected');
            }
        },
        mounted(){            
            this.tempProperties = this.properties;
        },
        components: {
            ArrayPropertiesPanel
        }
    }
</script>