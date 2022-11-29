<template>
    <div>
        <v-text-field
            :label="element.caption"
            :rules="element.rules"
            v-model="element.value"
            :required="element.required"
            @click="onSelected"            
        ></v-text-field>
    </div>
</template>
<script>
    export default {
        name: 'ElementInput',
        data: () => ({
            editElement: {}
        }),
        props: {
            element: {}            
        },
        methods: {
            onUpdateElement(element){
                this.$emit('updateElement', element);
            },            
        },
        mounted(){
            this.editElement = {...this.element};
        }
    }
</script>