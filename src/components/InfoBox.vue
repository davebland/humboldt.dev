<template>
  <div class="box" :style="{ background: 'rgba('+infoBoxData.pixelColour[0]+','+infoBoxData.pixelColour[1]+','+infoBoxData.pixelColour[2]+','+infoBoxData.pixelColour[3]+')'}">
    <p v-for="(v,i) in infoBoxData" :key="v">{{i}}: {{v.slice(0,20)}}</p>
    <input type="text" name="userStrig" id="">
    <button>Save</button>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: [
    'infoBoxData',
  ],
  mounted() {
    console.log(this.infoBoxData);
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
