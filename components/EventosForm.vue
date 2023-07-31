<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#46BBE7"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Nuevo evento
        </v-btn>
      </template>
      <v-card>
        <v-form
            ref="f_new_event"
            v-model="valid"
            lazy-validation
        >
            <v-card-title>
            <span class="text-h5">Nuevo evento</span>
            </v-card-title>
            <v-card-text>            
                    <v-container>
                        <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="* Nombre del evento"
                                hint="Nombre del evento"
                                type="text"
                                v-model="name"
                                :rules="nameRules"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date_event"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-combobox
                                  v-model="date_event"
                                  multiple
                                  chips
                                  small-chips
                                  label="Multiple picker in menu"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-combobox>
                              </template>
                              <v-date-picker
                                v-model="date_event"
                                multiple
                                no-title
                                scrollable
                                format="dd/mm/yyyy"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date_event)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>            
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="onCancelCreateEvent"
            >
                Cancelar
            </v-btn>            
            <v-btn              
              color="blue darken-1"
              text
              @click="onCreateEvent"
            >
                Crear evento
            </v-btn>
            </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
        valid: true,
        dialog: false,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 200) || 'Name must be less than 200 characters',
        ],
        date_event: [],
        menu: false,
    }),
    methods: {
        onCancelCreateEvent() {
            this.dialog = false
        },
        onCreateEvent() {
          if(this.$refs.f_new_event.validate()){
            this.$axios.post('/events', {
                name: this.name,
                date_event: this.date_event
            })
            .then(response => {                
                this.$emit('addEvents', true);
                this.dialog = false
            })
            .catch(error => {
                this.$emit('addEvents', false);
                console.log(error)
            })
          }
        }
    }
  }
</script>