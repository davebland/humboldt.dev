<template>
  <div class="fixed">
    <canvas class="canvas" ref="canvas" @click="selectPixel"></canvas>
    <InfoBox :style="infoBoxStyleObject" :pixel-data="infoBoxData" id="pixel-info-box"/>
  </div>
</template>

<script>
import InfoBox from './InfoBox.vue'
import {getUserIp} from './ipinfo'

export default {
  name: 'Canvas',
  components: {
    InfoBox
  },
  props: [
    'currentPixelData'
  ],
  data() {
    return {
      infoBoxStyleObject: {       
        left: '10px',
        top: '10px',

      },
      infoBoxData: {
        browser: navigator.userAgent,
        datetime: new Date().toISOString(),
        userString: ''
      }
    }
  },
  methods: {
    populate() {   
      // let ctx = this.$refs.canvas.getContext('2d');
      // ctx.fillStyle = 'rgb(200, 0, 0)';
      // ctx.fillRect(10, 10, 50, 50);
    },
    selectPixel(event) {
      // scale mouse pointer position from display coordinates to model coordinates
      let modelX = Math.round( event.offsetX * (this.$refs.canvas.width / this.$refs.canvas.offsetWidth) );
      let modelY = Math.round( event.offsetY * (this.$refs.canvas.height / this.$refs.canvas.offsetHeight) ); 
      // Add colour to the canvas pixel at the mouse cordinates
      let ctx = this.$refs.canvas.getContext('2d');
      var imgData = ctx.createImageData(1, 1);
      var i;
      for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+0] = 255;
        imgData.data[i+1] = 0;
        imgData.data[i+2] = 0;
        imgData.data[i+3] = 255;
      }
      ctx.putImageData(imgData, modelX, modelY); 
      // Show the info box
      this.showInfoBox(event.offsetX, event.offsetY);
    },
    showInfoBox(x, y) {
      // Set location to mouse cords
      this.infoBoxStyleObject.left = x+'px';
      this.infoBoxStyleObject.top = y+'px';
      getUserIp();
    }
  },
  mounted() {
    this.populate();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas  {
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
}

#pixel-info-box {
  position: absolute;
  margin: 5px;
}

.fixed {
  position: absolute;
}
</style>
