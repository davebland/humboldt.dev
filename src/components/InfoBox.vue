<template>
  <div class="box" :style="{ background: 'rgba('+infoBoxData.pixelColour[0]+','+infoBoxData.pixelColour[1]+','+infoBoxData.pixelColour[2]+','+infoBoxData.pixelColour[3]+')'}">
    <label v-for="(v,i) in infoBoxData" :key="v">
      {{i}}
      <input type="text" :value="v" disabled>
    </label>
    <button @click="$emit('submitNewPixel')">Save</button>
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
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

label {
  padding: 0 10px;
}
</style>
