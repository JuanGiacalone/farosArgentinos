<template>
  <div class="container-fluid" style="background-color: white;margin-top: 7vh" >
    <div class="row" >

                <b-card style="width: 100%; height: fit-content; text-align:center; background-color:whitesmoke;" >
                    <b-card-text style="color: black;">
                        <h3>No se encontraron imágenes interactivas para este faro</h3>
                        <h4>Te invitamos a visitarlo y realizar una captura dinámica vos mismo</h4>
                        <h5>Subila a Google Maps en la ubicación del faro y <router-link to="/contact">contactate</router-link></h5>
                        <h6>Aprende más en el siguiente enlace oficial  <a href="https://www.google.com.ar/streetview/contribute/">Contribuir a StreetView</a></h6>
                     </b-card-text>


            </b-card>
    </div>

  </div>
</template>

<script>
export default {
    name: 'Contribute',
    props:{}

}
</script>

<style>

header{
  display: none;
}

</style>