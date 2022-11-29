<template>
  <v-treeview :items="items"></v-treeview>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          id: 1,
          name: 'Historia principal :',
          children: [
            { id: 1, name: 'Historia secundaria 1', children: [
                    { id: 1, name: 'Nivel A', children:[
                        {id: 1, name: 'Competencia 1', children: [
                            { id:1, name: "Habilidad 1"}
                        ]}
                    ]},
                ] 
            },
            { id: 3, name: 'Historia secundaria 2', children: [
                    { id: 1, name: 'Nivel B', children:[
                        {id: 1, name: 'Competencia 2', children: [
                            { id:1, name: "Habilidad 2"}
                        ]}
                    ]},
                ] 
            },
            { id: 4, name: 'Historia secundaria 3', children: [
                    { id: 1, name: 'Nivel C', children:[
                        {id: 1, name: 'Competencia 3', children: [
                            { id:1, name: "Habilidad 3"}
                        ]}
                    ]},
                ] 
            },            
          ],
        },        
      ],
    }),
  }
</script>