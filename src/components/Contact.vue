<template>
    <div class="container-fluid" style="margin-top: 7vh" >
        <div class="row" style="font-size: small;" >
            
            <div class="col-md-4" style="width: 100vw;">
                <b-card style="text-align:center; margin: 0vh 0vh 2vh 0vh; justify-self: center; " >
                    <b-card style="background-color:whitesmoke; " >
                        <b-card-text style="color: black; " id="textoContacto">
                            <h3>Juan Pablo Giacalone</h3>
                            <h4><a href="mailto:juanpablogiacalone8@gmail.com">juanpablogiacalone8@gmail.com</a></h4>
                            <h5>Reclamos, sugerencias, correcciones y aportes serán siempre bienvenidos.</h5>
                            <h6><a href="https://github.com/JuanGiacalone">Github</a> <a href="https://t.me/jgiacalone">Telegram</a></h6>
                         </b-card-text>
                    </b-card>
    
                </b-card>
            </div>
            
        </div>
        <b-card style="width:100%; text-align:center; margin-top: 0.5vh;" >
            <b-card-text style="font-size: 110%;">
                Presiona la tecla <router-link to="/">&lt;-</router-link> para volver al <router-link to="/">inicio</router-link>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    props:{},
    created() {
                // Se define el atajo de teclado
        window.addEventListener("keydown", e => {
        if (e.key == 'ArrowLeft') 
        this.$router.push('/').catch(()=>{}) })
    }

}
</script>

<style>
@media screen and (min-width: 80rem) {
    #textoContacto{
        font-size: small;
    }
    div.container-fluid {
        margin-top: 0;
    }
    footer{
        font-size:small ;
    }
    b-card-text{
        color: black;
    }
}

</style>