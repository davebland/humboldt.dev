<template>
  <div class="row">
    <HWSLogo bg="#fff"/>
    <h3>Click on the canvas to make a contribution</h3>
  </div>
  <hr>
  <Canvas/>
</template>

<script>
import HWSLogo from './components/HWSLogo.vue'
import Canvas from './components/Canvas.vue'

export default {
  name: 'App',
  components: {
    HWSLogo,
    Canvas
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap');

#app {
  font-family: 'Cutive Mono', monospace;
}

body {
  animation: fadein 500ms;
}

@keyframes fadein {
  from {opacity: 0;}
  to {opacity: 1;}
}

.row  {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h3 {
  margin: 50px;
}
</style>
