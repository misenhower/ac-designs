<template>
  <canvas ref="canvas" />
</template>

<script>
import { QRData } from 'ac-designs';

export default {
  props: {
    qrData: {
      type: QRData,
      required: true,
    }
  },
  watch: {
    qrData: 'draw',
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      if (this.$refs.canvas) {
        this.qrData.toCanvas(this.$refs.canvas);
      }
    }
  }
}
</script>
