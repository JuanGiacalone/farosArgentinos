<template >
<div>

   <div class="container-fluid">

    <b-button v-b-toggle.sidebar-variant >Ver Comentarios</b-button>
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

    <b-container>
        <b-alert
        :show="dismissCountDown"
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        style="width:fit-content; height:fit-content"
      >    <h4 class="dark">Comentario agregado con exito!</h4>
            <p>Cerrando en: {{ dismissCountDown }}</p>
    </b-alert>

            <b-sidebar no-slide  id="sidebar-variant"  no-header text-variant="light" shadow >

            <div>
                <b-form @submit="onSubmit" @reset="onReset">
                    <b-button v-b-toggle.sidebar-variant variant="btn btn-secondary not-collapsed" aria-controls="sidebar-variant" style="margin-top:2rem; margin-left:2rem;" shadow>Cerrar comentarios</b-button>
                    <b-button type="submit"  variant="success not-collapsed" class="text-right" style="margin-top:2rem; margin-left:2rem;">Enviar</b-button>
                    <b-button type="reset" variant="danger not-collapsed" class="text-right" style="margin-top:2rem; margin-left:2rem;">Limpiar</b-button>
                    <b-form-group
                        id="input-group-1"
                        label-for="input-1"
                        description="Tu email sera visualizado con tu comentario"
                        style="margin-left: 2rem; width:75%; margin-top:1rem">
                        <b-form-input
                            id="input-1"
                            v-model="form.comentarios.email"
                            type="email"
                            placeholder="Ingresa tu email"
                            ref="emailInput"
                            required
                        > </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" style="margin-left: 2rem; margin-bottom:0.5rem;margin-top:0.5rem; width:75%;">
                        <b-form-input
                          id="input-2"
                          v-model="form.comentarios.nombre"
                          placeholder="Ingresa tu nombre"

                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group id="input-group-3 ">

                                <b-form-textarea
                                style="width:75%; resize:auto; margin-left: 2rem ; margin-bottom: 0.5rem"
                                id="textarea"
                                v-model="form.comentarios.cuerpo"
                                placeholder="Ingresa tu comentario..."
                                rows="3"
                                max-rows="6"
                                required
                            ></b-form-textarea>
              
                      </b-form-group>

                </b-form>

            
                
            </div>
            
            <lazy-component wrapper-tag="section">
                <b-list-group 
                    v-for="comentario, index in comentarios.comentarios.slice().reverse()" :key=index>
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
                <!-- Optional loading indicator -->
                <span slot="placeholder">Loading..</span>
              </lazy-component>
           
        </b-sidebar>
    </b-container>


   
</div>
</template>

<script>
import { mapGetters } from "vuex";

 export default {
    name: "FaroAndComments",

    
    props: {
        faro: {}
    },
    activated() {

         // Si se refresca, se devuelve al user al inicio
        if(this.faro == undefined) {
            
            this.$router.push('/').catch(()=>{});
        } else {
            this.$store.dispatch("getComentarios", this.faro.idFaro)
            this.show = true
            this.form.comentarios.idFaro = this.faro.idFaro
        }
    },
    deactivated() {

    },
    created() {

        // Si se refresca, se devuelve al user al inicio
        if(this.faro == undefined) {
            this.$router.push('/').catch(()=>{});
        } else {
            this.$store.dispatch("getComentarios", this.faro.idFaro)
        }
    },

    data() {
        return {
            dismissSecs: 5,
            dismissCountDown: 0,
            show:true,
            form: {
                comentarios:{
                idFaro: Number,
                fecha:'',
                email: '',
                nombre: '',
                cuerpo: '',
                }
            },
        }
    },
    computed: {
        ...mapGetters(['comentarios']),

        faros() {

            return this.$store.state.comentarios
        }
    },
    methods: {

        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },

        onSubmit(event) {
           event.preventDefault()

            this.form.comentarios.fecha = new Date();

            try {
                this.$store.dispatch("putComentario", Object.assign({},this.form))
                setTimeout(() => {
                    this.form.comentarios.fecha = 'Ahora mismo';
                    this.comentarios.comentarios.push(Object.assign({},this.form.comentarios))

                    this.onReset(event)
                    this.showAlert()
                    this.$bvToast.show('my-toast')
            }, 350 ) 
                
            } catch (error) {
                console.error(error);
            }
            
            
            },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.comentarios.email = ''
            this.form.comentarios.nombre = ''
            this.form.comentarios.cuerpo = ''
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

    div.sidebarButtons{

        margin-top: 5rem;
    }
    b-container{
        margin-top: 2rem;
        overflow-y: scroll;
        height: 30vh;
        margin-top: 5rem;
        background-color: whitesmoke;
        padding: 1rem;
    }
    div.container-fluid {
  
        margin-top: 2rem;
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