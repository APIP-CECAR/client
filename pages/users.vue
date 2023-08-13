<template>
    <v-card class="mx-auto pa-3 mb-5">
        <v-card-title>Administración de Usuarios y Perfiles</v-card-title>
        <v-data-table :headers="headers" :items="users" item-key="id" class="elevation-1 mx-auto pa-3 mb-5">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="openEditDialog(item)">mdi-pencil</v-icon>
                <v-icon small @click="onDeleteUser(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
        <!--v-btn color="primary" @click="addUser">Agregar Usuario</v-btn-->
        <v-btn color="primary" @click="openAddDialog">Agregar Usuario</v-btn>

        <!-- Diálogo para editar usuario -->
        <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
                <v-card-title>{{ editedUser._id ? 'Editar Usuario' : 'Agregar Usuario' }}</v-card-title>                
                <v-card-text>
                    <v-form ref="editForm">
                        <v-text-field v-model="editedUser.username" label="Nombre de Usuario"></v-text-field>
                        <v-text-field v-model="editedUser.password" label="Contraseña" type="password"></v-text-field>
                        <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
                        <v-text-field v-model="editedUser.name" label="Nombre"></v-text-field>
                        <v-text-field v-model="editedUser.surname" label="Apellido"></v-text-field>
                        <v-text-field v-model="editedUser.identification" label="Identificación"></v-text-field>
                        <v-text-field v-model="editedUser.age" label="Edad" type="number"></v-text-field>
                        <v-text-field v-model="editedUser.program" label="Programa"></v-text-field>
                        <v-checkbox v-model="editedUser.active" label="Activo"></v-checkbox>
                        <v-select v-model="editedUser.role" :items="roles" label="Rol"></v-select>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="saveEditedUser">{{ editedUser._id ? 'Guardar' : 'Agregar' }}</v-btn>
                    <!--v-btn color="primary" @click="saveEditedUser">Guardar</v-btn-->
                    <v-btn @click="editDialog = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Users',
    computed: {
        ...mapState('user', ['users']),
    },
    data() {
        return {
            headers: [
                { text: 'ID', value: '_id' },
                { text: 'Nombre de Usuario', value: 'username' },
                { text: 'Email', value: 'email' },
                { text: 'Rol', value: 'role' },
                { text: 'Acciones', value: 'actions', sortable: false },
            ],
            editDialog: false,
            editedUser: {
                _id: null,
                username: '',
                password: '',
                email: '',
                name: '',
                surname: '',
                identification: '',
                age: null,
                program: '',
                active: true,
                role: '',
            },
            roles: ['admin', 'consumer', 'tester'],
        };
    },
    methods: {
        ...mapActions('user', ['fetchUsers', 'addUser', 'editUser', 'deleteUser']),
        openEditDialog(user) {
            this.editDialog = true;
            let { password, ...filtered } = { ...user }            
            //this.editedUser = { ...user };
            this.editedUser = { ...filtered };
        },
        openAddDialog() {
            this.editDialog = true;
            this.editedUser = {
                id: null,
                username: '',
                password: '',
                email: '',
                name: '',
                surname: '',                
                program: '',
                active: true,
                role: '',
            };
        },
        async saveEditedUser() {
            if (this.$refs.editForm.validate()) {
                if (this.editedUser.id) {
                    // Si existe un id, actualizar el usuario
                    await this.editUser(this.editedUser);
                } else {
                    // Si no existe un id, crear un nuevo usuario
                    await this.addUser(this.editedUser);
                }
                this.editDialog = false;
                this.editedUser = {
                    username: '',
                    password: '',
                    email: '',
                    name: '',
                    surname: '',
                    identification: '',
                    active: true,
                    role: '',
                };
            }
        },
        onDeleteUser(user) {
            const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
            if (confirmDelete) {
                this.deleteUser(user._id);
                // message eliminated
                alert(`Usuario eliminado correctamente`);
            }
        },
    },
    created() {
        this.fetchUsers();
    },
};
</script>
