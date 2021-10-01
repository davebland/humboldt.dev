<template>
  <div class="box">
    <p v-for="(v,i) in pixelData" :key="v">{{i}}: {{v.slice(0,20)}}</p>
    <div class="pixel-colour-icon" style="background: rgba(1,1,1,0.5);"></div>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: [
    'pixelData',
  ],
  mounted() {
    console.log(this.pixelData);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box  {
  padding: 10px;
  border: 1px solid blue;
  border-radius: 5px;
}
.pixel-colour-icon {
  width: 10px;
  height: 10px;
}
</style>
