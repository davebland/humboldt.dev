<template>
  <HWSLogo bg="#ff1"/>
</template>

<script>
import HWSLogo from './components/HWSLogo.vue'

export default {
  name: 'App',
  components: {
    HWSLogo
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap');

#app {
  font-family: 'Cutive Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: darkgreen;
  animation: fadein 500ms;
}

@keyframes fadein {
  from {opacity: 0;}
  to {opacity: 1;}
}
</style>
