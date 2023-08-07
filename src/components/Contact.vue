<template>
    <div class="container-fluid" >
        <div class="row" style="font-size: small;" >
            
            <div class="col-md-4" style="width: 100vw;">
                <b-card style="text-align:center; margin: 4vh 0vh 2vh 0vh; justify-self: center; " >
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
        
      </div>
</template>

<script>
export default {
    name: 'Contact',
    props:{}

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
}

</style>