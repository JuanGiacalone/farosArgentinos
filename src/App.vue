<script setup>
import HelloWorld from './components/HelloWorld.vue'


</script>

<template>
  <div id="app">
    <header>
        <nav class="navbar navbar-expand-sm fixed-top bg bg-dark navbar-dark">
          <div class="container">
            <div class="greetings">
              <h1 class="green">FarosArgentinos</h1>
            </div>
            
            <router-link to="/">Inicio</router-link>
            <router-link to="/about">Sobre el proyecto</router-link>
            <router-link to="/contact">Contacto</router-link>
           </div>
        </nav>
    </header>
    <keep-alive>
      <router-view />
    </keep-alive>

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
