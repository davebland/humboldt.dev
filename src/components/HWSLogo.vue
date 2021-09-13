<template>
  <div class="container" :style="{ backgroundColor: bg }">
    <span><img src="../assets/humboldt100.png" alt="HWS Logo"></span>
    <span class="logo-text">hws</span>
  </div>
</template>

<script>
export default {
  name: 'HWSLogo',
  props: {
    bg: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container  {
  display: flex;
  align-items: center;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
}

.logo-text {
  font-size: 50px;
  font-weight: bold;
}
</style>
