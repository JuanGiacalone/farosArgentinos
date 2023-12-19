<template >
<div>

   <div class="container-fluid">

        <div class="row">
                <div class="col-3" style="text-align: center" id="divDescripcionFaro" >
                                <!-- Componente con la descripcion del faro, imagen y nombre -->
                    <b-card :title=faro.nombre :img-src=faro.urlImagen img-alt="Image" img-top style="width:fit-content; padding:0.5rem">
                        <b-card-text>
                            {{faro.descripcion}}
                        </b-card-text>
                        <template #footer>
                            Imagen provista por <a :href=faro.urlImagen >hidro.gov.ar</a>
                            
                        </template>
                        <template>
                        </template>
                            <!-- Botones informativos sobre precio y accesibilidad -->
                            <b-button pill :variant="accesibilidadVariant()" style="margin:0.4rem" id="b-buttonDescripcion">{{this.accesibilidad}}</b-button>
                            <b-button pill :variant="ingresoPagoVariant()" style="margin:0.4rem" id="b-buttonDescripcion">{{this.ingresoPago}}</b-button>   
                    </b-card>

                    
                </div>
                
                
                <div class="col-9" style="text-align: center;padding-right: 0px;">

                    <div class="row" style="text-align: left;padding-left:0">

                        <div class="col-8" style="padding-left:0" id="divVistaDinamica">
                            <!-- Componente con la imagen dinamica del faro si tiene -->
                            
                            <b-card style=" text-align:center">
                                <div v-if="isContribute">
                                    <Contribute id="compContribute"/>
                                </div>
                                <div v-else>
                                    <b-embed
                                    type="iframe"
                                    :src=urlVistaFaro
                                    allowfullscreen
                                    width="920" height="500"
                                    id="b-embedVistaDinamica"
                                    style="overflow-y: hidden;"
                                    scrolling="no"
                                    ></b-embed>
                                </div>

                            </b-card>    


                        </div>

                        <div class="col-4" style="padding-left:1vw; padding-right: 1vw;" id="divPublicidades">
                            <b-card style="width: 100%; height: 100%; text-align:center" >
                                <!-- Componente con el auspiciante del faro -->
                                <b-card style="width: 100%; height: fit-content ;text-align:center; background-color:whitesmoke;margin-bottom: 1vh;" >
                                    <b-card-text>
                                        <h5>Auspicia este faro</h5>
                                        <a :href=publicidades.urlSitio style="font-size: 150%;">{{ publicidades.nombre }}</a>  
                                        <h6>{{ publicidades.descripcion }}</h6>
                                     </b-card-text>
                                </b-card>

                                <b-embed
                                type="iframe"
                                :src=publicidades.urlUbicacion 
                                allowfullscreen
                                width="400" height="350"
                                id="b-embedVistaUbicacion"
                                ></b-embed>    

                            </b-card>
                            
                        </div>
                    </div>

                    <div class="row" style="margin-top: 1vh;padding-right: 1vw;">

                        <!-- Componente con pestañas informativas para el faro -->
                        <b-card style="overflow: hidden; background-color: white;"  >

                            <b-tabs pills card vertical no-key-nav content-class="tabsFondoBlanco">
                                <b-tab title="Historia" active><b-card-text>{{faro.historia}}</b-card-text></b-tab>
                                <b-tab title="Caracteristicas"><b-card-text>{{faro.caracteristicas}}</b-card-text></b-tab>
                                <b-tab title="Información Turistica"><b-card-text>{{faro.turismo}}</b-card-text></b-tab>
                                <b-tab title="Ubicación"><b-card-text>{{faro.ubicacion}}</b-card-text></b-tab>

                            </b-tabs>
                        
                        </b-card>
                        <!-- Componente que informa al usuario sobre el atajo para volver al inicio -->
                        <b-card style="text-align:center; margin-top: 0.3vh;" >
                            <b-card-text style="font-size: 100%">
                                Presiona la tecla <router-link to="/">&lt;-</router-link> para volver al <router-link to="/">inicio</router-link>
                            </b-card-text>
                        </b-card>

                        <!-- Boton que permite ver los comentarios -->
                        <b-button variant="info" v-b-toggle.sidebar-variant style="margin-top:0.5vh; color:white; font-weight: bold;" id="showComments">Ver Comentarios</b-button>

                        <!-- Componente que informa sobre el exito de la publicacion de un comentario -->
                        <b-alert
                            :show="dismissCountDown"
                            variant="success"
                            @dismissed="dismissCountDown=0"
                            @dismiss-count-down="countDownChanged"
                            style="height:fit-content; margin-top: 0.5vh">
                            <h4 class="dark">Comentario agregado con exito!</h4>
                            <p>Cerrando en: {{ dismissCountDown }}</p>
                       </b-alert>

                       <!-- Componente con el formulario para realizar un comentario -->
                        <b-container>

                            
                            <b-sidebar  id="sidebar-variant"  no-header text-variant="light" shadow style="overflow-y: scroll;">
            
            
                                    <b-button v-b-toggle.sidebar-variant variant="btn btn-secondary not-collapsed" aria-controls="sidebar-variant" style="margin:1rem; margin-left:2rem" shadow>Cerrar comentarios</b-button>
                                    <b-button v-b-toggle.sidebar-variant2 variant="btn btn-secondary not-collapsed" aria-controls="sidebar-variant" style="margin:1rem;" shadow id="createComment">Crear comentario</b-button>
                            <b-sidebar  id="sidebar-variant2"  no-header text-variant="light" style="height: fit-content; overflow-y: hidden;">
            
                                <b-form @submit="onSubmit" @reset="onReset" >
                                    <b-button type="submit"  variant="success not-collapsed" class="text-right" style="margin-top:1rem; margin-left:2rem;" id="submitComment">Enviar</b-button>
                                    <b-button type="reset" variant="danger not-collapsed" class="text-right" style="margin-top:1rem; margin-left:2rem;" id="cleanComment">Limpiar</b-button>
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
                                    <b-form-group id="input-group-2" style="margin-left: 2remrem;margin-top:0.5rem; width:75%;">
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
                                <!-- Componente que ubica los comentarios existentes en una lista -->
                                <b-list-group 
                                    v-for="comentario, index in comentarios.comentarios.slice().reverse()" :key=index style="margin-top:0.5rem; text-align:left" id="commentsList">
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
import Contribute from './Contribute.vue'

 export default {
    name: "FaroAndComments",

    props: {
        faro: {}
    },
    components:{
        Contribute
    },
    activated() {



         // Si se refresca, se devuelve al user al inicio
        if(this.faro == undefined) {
            
            this.$router.push('/').catch(()=>{});
        } else {
            // Se disparan los gets y el put necesarios
            this.$store.dispatch("getComentarios", this.faro.idFaro)
            this.$store.dispatch("getPublicidades", this.faro.idFaro)
            this.$store.dispatch("putImpresion", this.faro.idFaro)

            this.show = true
            this.form.comentarios.idFaro = this.faro.idFaro
            this.ingresoPagoVariant()
            this.accesibilidadVariant()
            this.isContribute = this.checkContribute(this.faro.urlVista)
            this.urlVistaFaro = this.faro.urlVista
        }

    },

    created() {
        // Se define el atajo de teclado
        window.addEventListener("keydown", e => {
          if (e.key == 'ArrowLeft') 
            this.$router.push('/').catch(()=>{}) })

        // Si se refresca, se devuelve al user al inicio
        if(this.faro == undefined) {
            this.$router.push('/').catch(()=>{});
        } else {
            // Al crearse se obtienen los comentarios
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
            urlVistaFaro:'',
            isContribute: Boolean,
        }
    },
    computed: {
        // Se mapean los getters al inicio
        ...mapGetters(['comentarios', 'publicidades']),

        // Devuelve a la instancia el estado de los comentarios y la publicidad
        faros() {

            return this.$store.state.comentarios & this.$store.state.publicidades
        }
    },
    methods: {
        
        checkContribute(urlVista) {
            if ( urlVista == '/contribute' ) {
                return true
            } else return false         
        },

        // Ajusta la fecha recibida desde la base de datos
        fechaAdjust(fecha) {
            fecha = new Date(fecha)
            return fecha.toLocaleString()
        },
        // Ajusta el boton informativo de pago
        ingresoPagoVariant(){
            if (this.faro.accesoPago) {
                this.ingresoPago = 'Ingreso pago'
                return 'danger'
            }  else {
                this.ingresoPago = 'Ingreso gratuito' 
                return 'success' 
            } 
        },
        // Ajusta el boton informativo de accesibilidad
        accesibilidadVariant() {
            if (this.faro.accesible) {
                this.accesibilidad = 'Acceso habilitado'
                return 'success' 
                
            }  else {
                this.accesibilidad = 'Acceso restringido' 
                return 'warning'
            }
        },
        // Maneja la cuenta regresiva del pop up
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        // Muestra la alerta al realiza el comentario
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },



        onSubmit(event) {
            event.preventDefault()
            // Prepara la fecha del instante            
            this.form.comentarios.fecha  = new Date()

            console.log(this.form.comentarios.fecha + 'comm');

            try {
                // Se dispara el put y se envia a la store el form del comentario
                this.$store.dispatch("putComentario", Object.assign({},this.form))
                setTimeout(() => {
                    // se agrega el comentario a la lista actual
                    this.comentarios.comentarios.push(Object.assign({},this.form.comentarios))

                    this.onReset(event)
                    // Se muestra el componente de exito en el comentario
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
@media screen and (min-width: 80rem) {
    body {
        overflow-x:hidden ;
    }
    .container {
      margin: 0 0 ;
    }
    #divDescripcionFaro{
        font-size: small;
    }
    #b-buttonDescripcion{
        font-size: small;
        margin: 0;
        justify-content: flex-start;
    }
    #divPublicidades {
        width: 17vw;
        height: 60vh;
        font-size: small;
        padding-right: 0.5vw;
    }
    #divVistaDinamica {
        width: 57vw;
        padding-right: 0vw;
    }
    #b-embedVistaDinamica {
        width: 54vw;
        overflow-y: hidden;
        overflow-block: clip;
    }
    #divContribute {
        height: 35vh;
    }
    #compContribute {
        height: 35vh;
    }
    #b-embedVistaUbicacion {
        width: 12.5vw;
        height: 41vh;
    }

  }
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