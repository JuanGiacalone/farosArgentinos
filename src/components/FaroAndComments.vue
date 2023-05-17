<template >
<div>

   <div class="container-fluid">

        <div class="row" style="margin-top:0.3rem">
                <div class="col-3" style="text-align: center" >
                    <b-card :title=faro.nombre :img-src=faro.urlImagen img-alt="Image" img-top style="width:fit-content; padding:0.5rem">
                        <b-card-text>
                            {{faro.descripcion}}
                        </b-card-text>
                        <template #footer>
                            Imagen provista por <a :href=faro.urlImagen >hidro.gov.ar</a>
                            
                        </template>
                        <template>
                        </template>

                            <b-button pill :variant="accesibilidadVariant()" style="margin:0.4rem">{{this.accesibilidad}}</b-button>
                            <b-button pill :variant="ingresoPagoVariant()" style="margin:0.4rem">{{this.ingresoPago}}</b-button>   
                    </b-card>

                    
                </div>
                
                
                <div class="col-9" style="text-align: center;padding-right: 0px;">

                    <div class="row" style="text-align: left;padding-left:0">

                        <div class="col-8" style="padding-left:0">
                            <b-card style="width: fit-content; height: 100%; text-align:center">
                                <b-embed
                                type="iframe"
                                :src=faro.urlVista
                                allowfullscreen
                                width="920" height="500"
                                    
                                ></b-embed>
                            </b-card>


                        </div>

                        <div class="col-4" style="padding-left:1vw; padding-right: 1vw;">
                            <b-card style="width: 100%; height: 100%; text-align:center" >
                                <b-card style="width: 100%; height: fit-content; text-align:center; background-color;margin-bottom: 1vh;" >
                                    <b-card-text>
                                        <h5>Auspicia este faro</h5>
                                        <h6>{{ publicidades.nombre }}</h6>  
                                        <h6>{{ publicidades.descripcion }}</h6>
                                     </b-card-text>
                                </b-card>

                                <b-embed
                                type="iframe"
                                :src=publicidades.url 
                                allowfullscreen
                                width="400" height="370"
                                    
                                ></b-embed>    

                            </b-card>
                            

                        </div>
                    </div>

                    <div class="row" style="margin-top: 2vh;padding-right: 1vw;">
                        <b-card style="overflow: hidden; background-color: white;"  >

                            <b-tabs pills card vertical content-class="tabsFondoBlanco">
                                <b-tab title="Historia" active><b-card-text>{{faro.historia}}</b-card-text></b-tab>
                                <b-tab title="Caracteristicas"><b-card-text>{{faro.caracteristicas}}</b-card-text></b-tab>
                                <b-tab title="Información Turistica"><b-card-text>{{faro.turismo}}</b-card-text></b-tab>
                                <b-tab title="Ubicación"><b-card-text>{{faro.ubicacion}}</b-card-text></b-tab>

                            </b-tabs>
                        
                        </b-card>
                        <b-card style="width:100%; text-align:center; margin-top: 0.5vh;" >
                            <b-card-text>
                                Presiona la tecla <router-link to="/">&lt;-</router-link> para volver al <router-link to="/">inicio</router-link>
                            </b-card-text>
                        </b-card>
                        
                        <b-button variant="info" v-b-toggle.sidebar-variant style="margin-top:0.5vh; color:white">Ver Comentarios</b-button>

                        <b-alert
                            :show="dismissCountDown"
                            variant="success"
                            @dismissed="dismissCountDown=0"
                            @dismiss-count-down="countDownChanged"
                            style="height:fit-content; margin-top: 0.5vh">
                            <h4 class="dark">Comentario agregado con exito!</h4>
                            <p>Cerrando en: {{ dismissCountDown }}</p>
                       </b-alert>

                        <b-container>

            
                            <b-sidebar  id="sidebar-variant"  no-header text-variant="light" shadow style="overflow-y: scroll;">
            
            
                                    <b-button v-b-toggle.sidebar-variant variant="btn btn-secondary not-collapsed" aria-controls="sidebar-variant" style="margin:1rem; margin-left:2rem" shadow>Cerrar comentarios</b-button>
                                    <b-button v-b-toggle.sidebar-variant2 variant="btn btn-secondary not-collapsed" aria-controls="sidebar-variant" style="margin:1rem;" shadow>Crear comentario</b-button>
                            <b-sidebar  id="sidebar-variant2"  no-header text-variant="light" style="height: fit-content; overflow-y: hidden;">
            
                                <b-form @submit="onSubmit" @reset="onReset" >
                                    <b-button type="submit"  variant="success not-collapsed" class="text-right" style="margin-top:1rem; margin-left:2rem;">Enviar</b-button>
                                    <b-button type="reset" variant="danger not-collapsed" class="text-right" style="margin-top:1rem; margin-left:2rem;">Limpiar</b-button>
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
                                            autofocus
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
                            </b-sidebar>
            
                                <b-list-group 
                                    v-for="comentario, index in comentarios.comentarios.slice().reverse()" :key=index style="margin-top:0.3rem; text-align:left">
                                    <b-list-group-item href="#" class="flex-column align-items-start" style="width:95%; margin-left:2rem; margin-top:0.3rem">
                                        <div class="d-flex w-30 justify-content-between">
                                    
                                        <h5 class="mb-1">{{comentario.nombre}}</h5>
                                        <small>{{fechaAdjust(comentario.fecha)}}</small>
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
            </div>

            


        </div>
           
    </div>
   
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
            this.$store.dispatch("getPublicidades", this.faro.idFaro)
            this.$store.dispatch("putImpresion", this.faro.idFaro)

            this.show = true
            this.form.comentarios.idFaro = this.faro.idFaro
            this.ingresoPagoVariant()
            this.accesibilidadVariant()
        }

    },

    created() {
        window.addEventListener("keydown", e => {
          if (e.key == 'ArrowLeft') 
            this.$router.push('/').catch(()=>{}) })

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
            accesibilidad:'',
            ingresoPago:'',
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

        ...mapGetters(['comentarios', 'publicidades']),
        

        faros() {

            return this.$store.state.comentarios & this.$store.state.publicidades
        }
    },
    methods: {

        fechaAdjust(fecha) {
            fecha = new Date(fecha)
            return fecha.toLocaleString()
        },

        ingresoPagoVariant(){
            if (this.faro.accesoPago) {
                this.ingresoPago = 'Ingreso pago'
                return 'danger'
            }  else {
                this.ingresoPago = 'Ingreso gratuito' 
                return 'success' 
            } 
        },
        accesibilidadVariant() {
            if (this.faro.accesible) {
                this.accesibilidad = 'Acceso habilitado'
                return 'success' 
                
            }  else {
                this.accesibilidad = 'Acceso restringido' 
                return 'warning'
            }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },



        onSubmit(event) {
           event.preventDefault()

            
            this.form.comentarios.fecha  = new Date()

            try {
                this.$store.dispatch("putComentario", Object.assign({},this.form))
                setTimeout(() => {
                   // this.form.comentarios.fecha = 'Ahora mismo';
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
            // Resetea los campos
            this.form.comentarios.email = ''
            this.form.comentarios.nombre = ''
            this.form.comentarios.cuerpo = ''

            // Resetea/limpia el estado nativo de la validacion del formulario provista por el navegador.
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
        
        color: black;
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
    .tabsFondoBlanco{
        background-color: white
    }
</style>