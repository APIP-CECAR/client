<template>	
	<div class="text-center">
		<v-dialog v-model="dialog" max-width="auto" scrollable >
			<template v-slot:activator="{ on, attrs }">
				<v-btn plain color="indigo" outlined v-bind="attrs" v-on="on" class="mx-0 align-self-end">Actividades</v-btn>			
			</template>

			<v-card>
				<v-card-title class="text-h5 grey lighten-2"> Actividad H5P </v-card-title>				
				<v-card-text>				
					<div class="wrapper">
						<h5p
							key="es"
							:src="`${server}/uploads${ho}`" 
							:l10n="translations" 
							@xapi="handleXAPIEvent"							
							:copy="true"
							:copyright="true"							
						>
							Cargando...
							<template #error>
								Recurso no disponible. Consulte con su proveedor de servicio.
							</template>
						</h5p>

					</div>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>					
					<v-btn color="warning"  @click="dialog = false">
						cerrar 
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>	                                        
</template>
<script>
import h5p from 'vue-h5p'
// https://www.npmjs.com/package/vue-h5p
// https://github.com/technowledgy/vue-h5p
import translations from '~/utils/translations'

export default {
	name: 'RenderH5P',
	props: {
		ho: {},
		server: {
			type: String,
			default: ''
		},
		studentId: {
			type: String,
			default: ''
		},
		competence: {
			type: String,
			default: ''
		},
		skill: {
			type: String,
			default: ''
		}
	},	
	data() {
		return {
			dialog: false,
			actor: { name: this.studentId }

		}
	},
	methods: {
		handleXAPIEvent(ev) {
			let stament = ev.statement;
			let { result } = stament
			let studentId = this.studentId;
			let competence = this.competence;
			let skill = this.skill.replace(/-/g, '')

			if (result) { 
				this.$axios.post(`/activitiesH5P`, {
						studentId, 
						stament,
						competence,
						skill
					})
					.then(response => { 
						// actualizar el storage
					})
					.catch(error => console.log(error)						
				)}
			// console.log('H5P emitió evento X-API', ev)			
		}		
	},
	computed: {
		translations() {
			return translations
		}
	},
	components: {
		h5p
	}
}
</script>
<style>
	iframe {
		width: 100% !important;;
		height: 70vh !important;;
	}
</style>