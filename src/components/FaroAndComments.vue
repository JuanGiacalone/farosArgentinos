<template >
<div>
    
    
   <div class="container-fluid">
    <b-button v-b-toggle.sidebar-variant>Ver Comentarios</b-button>
        <div class="row">
            <div class="col-3">
                <!-- <div class="card faros-list" style="width: fit-content"  >
                    <ul class="list-group list-group-flush"
                    v-for="comentario, index in comentarios.comentarios" :key=index>

                        <li class="list-group-item"> {{comentario.fecha}} {{comentario.nombre}} {{comentario.email}} {{comentario.cuerpo}} </li> 

                    </ul>
                </div>        -->
                
            </div>
            
            <div class="col-3">
                <div class="card faros-list" style="width: fit-content">
                    
                </div>
            </div>

        </div>
    </div>
    <b-container >
        
        <b-sidebar id="sidebar-variant"  no-header text-variant="light" shadow>
            <b-button v-b-toggle.sidebar-variant variant="btn btn-secondary not-collapsed" aria-controls="sidebar-variant" style="margin:1rem; margin-bottom:0rem;
            margin-top:1rem" shadow>Cerrar comentarios</b-button>
            <div>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Email:"
                        label-for="input-1"
                        description="Tu email sera visualizado con tu comentario"
                        style="margin-left: 1rem; width:75%">
                        <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            placeholder="Ingresa tu email"
                            required
                        > </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" style="margin-left: 1rem; margin-bottom:0.5rem;margin-top:0.5rem; width:75%;">
                        <b-form-input
                          id="input-2"
                          v-model="form.nombre"
                          placeholder="Ingresa tu nombre"

                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group id="input-group-3 ">

                                <b-form-textarea
                                style="width:75%; resize:auto; margin-left: 1rem ; margin-bottom: 0.5rem"
                                id="textarea"
                                v-model="form.cuerpo"
                                placeholder="Ingresa tu comentario..."
                                rows="3"
                                max-rows="6"
                                required
                            ></b-form-textarea>

                                <div class="float-right" >
                                    <b-button type="submit" variant="btn btn-secondary not-collapsed" class="text-right" style="margin: 1rem; margin-left:60%">Enviar</b-button>
                                    <b-button type="reset" variant="btn btn-secondary not-collapsed" class="text-right" style="margin: 1rem;">Limpiar</b-button>

                                </div>
                                
                        
                      </b-form-group>
                       

                </b-form>

            
                
            </div>
            <b-list-group 
                    v-for="comentario, index in comentarios.comentarios" :key=index>
                        <b-list-group-item href="#" class="flex-column align-items-start" style="width:95%; margin-left:2rem; margin-top:0.3rem">
                          <div class="d-flex w-30 justify-content-between">
                            <h5 class="mb-1">{{comentario.nombre}}</h5>
                            <small>{{comentario.fecha}}</small>
                          </div>
                      
                          <p class="mb-1" style="word-wrap:break-word">
                            {{comentario.cuerpo}}
                          </p>
                      
                          <small>{{comentario.email}}</small>
                        </b-list-group-item>
                    </b-list-group>
        </b-sidebar>
    </b-container>

</div>
</template>

<script>
import { mapGetters } from "vuex";

 export default {
    name: "FaroAndComments",
    
    props: {
        faro: Object
    },

    created() {

        this.$store.dispatch('getComentarios', this.faro.idFaro)

        // Si se refresca, se devuelve al user al inicio
        if(this.faro == undefined) {
            
                this.$router.push('/');
            }
    },

    setup() {
         
    },

    data() {
        return {
            show:true,
            form: {
                email: '',
                nombre: '',
                cuerpo: '',
            }
        }
    },
    computed: {
        ...mapGetters(['comentarios'])
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.nombre = ''
        this.form.cuerpo = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }

    },
}
</script>
<style lang="scss">
    b-list-group-item{
        margin-top: 0.5rem;
    }
    b-container{
        margin-top: 5rem;
        background-color: whitesmoke;
        padding: 1rem;
    }
    div.container-fluid {
  
        margin-top: 5rem;
        background-color: whitesmoke;
        padding: 1rem;
      }
    .faros-list {
        overflow-y: scroll;
        height: 50vh;
        background-color: whitesmoke;
        li {
          &:hover {
            background-color: whitesmoke;
          
          }
        }
      }
</style>