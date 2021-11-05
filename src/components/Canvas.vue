<template>
  <div class="">
    <button @click="test">API</button>
  </div>
  <div class="fixed">
    <canvas class="canvas" ref="canvas" @click="selectPixel" width="500" height="500">Sorry, your browser needs to support canvas.</canvas>
    <InfoBox :style="infoBoxStyleObject" :info-box-data="infoBoxData" id="info-box" @submitNewPixel="submitNewPixel"/>
  </div>
</template>

<script>
import InfoBox from './InfoBox.vue'
import {getUserIp} from '../js/ipinfo'
import {calculatePixelColour} from '../js/cryptoColourGenerator'
import {getAllPixels, getPixelData, sendNewPixel} from '../js/pixelsApi'

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
        left: '',
        top: '',

      },
      infoBoxData: {
        browser: String(),
        datetime: String(),
        userIp: String(),
        userString: String(),
        pixelColour: [0,0,0,0]
      },
    }
  },
  methods: {
    async populate() {
      // Get current pixel array from API
      const curPixelArray = await getAllPixels();
      // Populate canvas with current pixels
      let ctx = this.$refs.canvas.getContext('2d');
      curPixelArray.forEach((pixel) => {
        ctx.fillStyle = 'rgba('+pixel['rgba'][0]+','+pixel['rgba'][1]+','+pixel['rgba'][2]+','+pixel['rgba'][2]/100+')';
        ctx.fillRect(pixel['x'],pixel['y'], 1, 1);
      });
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
        this.showExistingPixelData(modelX, modelY);
        return
      }
      // Else show the new pixel data
      this.showNewIPixelData()
      .then(() => {
        // Add new colour to the canvas pixel at the mouse cordinates
        var imgData = ctx.createImageData(1, 1);
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
          imgData.data[i+0] = this.infoBoxData.pixelColour[0];
          imgData.data[i+1] = this.infoBoxData.pixelColour[1];
          imgData.data[i+2] = this.infoBoxData.pixelColour[2];
          imgData.data[i+3] = 255;
        }
        ctx.putImageData(imgData, modelX, modelY);
      });
      
    },
    async showNewIPixelData() {
      // Populate dynamic data
      this.infoBoxData.browser = navigator.userAgent;
      this.infoBoxData.datetime = new Date().toISOString();
      this.infoBoxData.userIp = await getUserIp();
      // Calculate colour from strings
      this.infoBoxData.pixelColour = await calculatePixelColour(this.infoBoxData);
    },
    async showExistingPixelData(x,y) {
      // Query API for data about this pixel
      const existingPixelInfo = await getPixelData(String(x)+String(y));
      // Populate with retrieved data
        console.log(existingPixelInfo);
        if (existingPixelInfo) {
          this.infoBoxData.browser = existingPixelInfo['browser'];
          this.infoBoxData.datetime = existingPixelInfo['datetime'];
          this.infoBoxData.userIp = existingPixelInfo['userIp'];
          //this.infoBoxData.pixelColour = Array.from(existingPixelData.data);
        }
    },
    async submitNewPixel() {
      // Send new pixel to API
      console.log("Sending to API: "+this.infoBoxData);
      console.log(await sendNewPixel(this.infoBoxData));
      //window.location.replace('/?newPixel=123');
    },
    test() {
      console.log(getAllPixels());
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
  width: 90vw;
  height: 70vh;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

#info-box {
  position: fixed;
  margin: 5px;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
}

.fixed {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
}


</style>