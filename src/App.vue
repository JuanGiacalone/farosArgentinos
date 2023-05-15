<script setup>



</script>

<template>
  <div id="app">
    <header>
        <nav class="navbar navbar-expand-sm fixed-top bg bg-dark navbar-dark">
          <div class="container">
            <div class="greetings">
              <h1 class="green"><router-link to="/">FarosArgentinos</router-link></h1>
              
            </div>
            <router-link to="/about">Sobre el proyecto</router-link>
            <router-link to="/contact">Contacto</router-link>
           </div>
        </nav>
    </header>
    <keep-alive>

        <router-view />

    </keep-alive>
    <footer class="text-center text-lg-start bg-light text-muted" style="padding: 0.1rem;">
    
      <!-- Section: Links  -->
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                FarosArgentinos
              </h6>
              <p>
                &nbsp; El objetivo del presente proyecto es promover el turismo moderno que surge alrededor del método de balizamiento más distinguible y apreciado, esas distintivas balizas que se encuentran a lo largo de los 6.816 kilómetros de costa argentina conocidas como faros.
              </p>
            </div>
            <!-- Grid column -->
    
            <!-- Grid column -->
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">
                Enlaces
              </h6>
              <p>
                <router-link to="/about">Sobre el proyecto</router-link>
                
              </p>
              <p>
                <router-link to="/contact">Contacto</router-link>
              </p>
              <p>
                <router-link to="/contact">Terminos y condiciones</router-link>
              </p>
            </div>
            <!-- Grid column -->
    
    
            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Autor</h6>
              <p>Giacalone, Juan Pablo</p>
              <p>
                juanpablogiacalone8@gmail.com
              </p>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->
    
      <!-- Copyright -->
      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><router-link to="/">FarosArgentinos</router-link> se encuentra licenciado bajo <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->

  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 15vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  margin-bottom: 5rem;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 0rem;
  background-color: var(--vt-c-white-mute);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  nav {
    text-align: left;
    font-size: 1rem;
   /* padding: 1.7rem 0;*/
    margin-top: 0rem;
  
  }
}
h1 {
  font-weight: 500;
  font-size: 2.0rem;
  top: 0px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    display: block;
    text-align: left;
  }
}
</style>
