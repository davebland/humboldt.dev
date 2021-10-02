<template>
  <div class="fixed">
    <canvas class="canvas" ref="canvas" @click="selectPixel"></canvas>
    <InfoBox :style="infoBoxStyleObject" :info-box-data="infoBoxData" id="pixel-info-box"/>
  </div>
</template>

<script>
import InfoBox from './InfoBox.vue'
import {getUserIp} from './ipinfo'
import {calculatePixelColour} from './cryptoColourGenerator'

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
        browser: String(),
        datetime: String(),
        userIp: String(),
        userString: String(),
        pixelColour: [0,0,0,0]
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
      let ctx = this.$refs.canvas.getContext('2d');
      // scale mouse pointer position from display coordinates to model coordinates
      const modelX = Math.round( event.offsetX * (this.$refs.canvas.width / this.$refs.canvas.offsetWidth) );
      const modelY = Math.round( event.offsetY * (this.$refs.canvas.height / this.$refs.canvas.offsetHeight) );
      // Determine if pixel is already taken
      const existingPixelData = ctx.getImageData(modelX, modelY, 1, 1);
      if (!existingPixelData.data.every((e)=>e==0)) {
        console.log('taken');
        return
      }
      // Show the info box
      this.showInfoBox(event.offsetX, event.offsetY);
      // Add colour to the canvas pixel at the mouse cordinates
      var imgData = ctx.createImageData(1, 1);
      var i;
      for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+0] = this.infoBoxData.pixelColour[0];
        imgData.data[i+1] = this.infoBoxData.pixelColour[1];
        imgData.data[i+2] = this.infoBoxData.pixelColour[2];
        imgData.data[i+3] = 255;
      }
      ctx.putImageData(imgData, modelX, modelY);
    },
    async showInfoBox(x, y) {
      // Set location to mouse cords
      this.infoBoxStyleObject.left = x+'px';
      this.infoBoxStyleObject.top = y+'px';
      // Populate dynamic data
      this.infoBoxData.browser = navigator.userAgent;
      this.infoBoxData.datetime = new Date().toISOString();
      this.infoBoxData.userIp = await getUserIp();
      // Calculate colour from strings
      this.infoBoxData.pixelColour = await calculatePixelColour(this.infoBoxData);
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
