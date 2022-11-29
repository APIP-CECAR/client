<template>
    <div>        
        <DinamycElement 
            :is="render" 
            :element="element"
            @updateElement="onUpdateElement"            
        />
    </div>
</template>
<script>        
    const ElementInput = () => import('~/components/ElementInput');
    const ElementSelect = () => import('~/components/ElementSelect');

    export default {
        data: () => ({}),
        props: {
            element: {}
        },
        methods: {
            render(){                
                switch(this.element.type){
                    case 'text':
                        return ElementInput();
                        break;
                    case 'select':
                        return ElementSelect();
                    /*case 'number':
                        return this.renderNumber();
                    case 'date':
                        return this.renderDate();
                    case 'time':
                        return this.renderTime();
                    case 'datetime-local':
                        return this.renderDatetimeLocal();
                    case 'email':
                        return this.renderEmail();
                    case 'tel':
                        return this.renderTel();
                    case 'url':
                        return this.renderUrl();
                    case 'color':
                        return this.renderColor();
                    case 'file':
                        return this.renderFile();
                    case 'checkbox':
                        return this.renderCheckbox();
                    case 'radio':
                        return this.renderRadio();                    
                    case 'select-multiple':
                        return this.renderSelectMultiple();
                    case 'textarea':
                        return this.renderTextarea();*/
                }
            },
            onUpdateElement(element){
                this.$emit('updateElement', element);
            }
        }
    }
</script>