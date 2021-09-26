<template>
  <div class="box">
    <p v-for="(v,i) in pixelData" :key="v">{{i}}: {{v}}</p>
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
</style>
