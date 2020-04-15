<template>
  <canvas
    v-if="displayImage"
    ref="canvas"
    :width="displayImage.width"
    :height="displayImage.height"
  />
</template>

<script>
import { Image } from 'ac-designs';

export default {
  props: {
    image: {
      type: Image,
      required: true,
    },
    xbrz: {
      default: null,
      type: [Boolean, Number],
    },
  },
  data() {
    return {
      displayImage: null,
    };
  },
  watch: {
    image: 'updateDisplayImage',
    xbrz: 'updateDisplayImage',
  },
  mounted() {
    this.updateDisplayImage();
  },
  methods: {
    async updateDisplayImage() {
      if (!this.image) {
        this.displayImage = null;
        return;
      }

      let image = this.image;

      if (this.xbrz) {
        let factor = parseInt(this.xbrz) || 4;
        image = await this.image.applyXbrzUpscaling(factor);
      }

      this.displayImage = image;

      this.$nextTick(() => this.draw());
    },
    draw() {
      if (this.$refs.canvas) {
        this.displayImage.toCanvas(this.$refs.canvas);
      }
    }
  }
}
</script>
