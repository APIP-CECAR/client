<template>
    <div>         
        <v-select
          v-model="select"          
          :items="items"
          item-text="option"
          item-value="value"
          :label="element.caption"
          persistent-hint
          return-object
          single-line
        ></v-select>
    </div>
</template>
<script>
    export default {
        name: 'ElementInput',
        data: () => ({
            editElement: {},
            select: { option: '', value: '' },
            items:[]
        }),
        watch: {
            element: {
                handler: function (val) {
                    this.items =[];
                    let options = val.properties[0].options
                    let values = val.properties[1].values
                    this.items = options.map((option, i) => {
                        return { option: option, value: values[i] }
                    })
                },
                deep: true
            }
        },
        props: {
            element: {}            
        },
        methods: {
            onUpdateElement(element){
                this.$emit('updateElement', element);
            }
        },
        mounted(){
            this.editElement = {...this.element};
        }
    }
</script>