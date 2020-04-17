<template>
  <canvas
    ref="canvas"
    :width="totalWidth"
    :height="totalHeight"
    @click="handleClick"
    @mousemove="handleClick"
  />
</template>

<script>
import { IndexedImageBase } from '@/ac-designs';

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

export default {
  props: {
    image: {
      type: IndexedImageBase,
      required: true,
    },
    activeColorIndex: {
      default: null,
      type: Number,
    },
    scale: {
      default: 10,
      type: Number,
    },
  },
  computed: {
    width() {
      return this.image.width * this.scale;
    },
    totalWidth() {
      return this.width + 1;
    },
    height() {
      return this.image.height * this.scale;
    },
    totalHeight() {
      return this.height + 1;
    },
  },
  watch: {
    image: {
      deep: true,
      handler: 'draw',
    },
    totalWidth() { this.$nextTick(() => this.draw()); },
    totalHeight() { this.$nextTick(() => this.draw()); },
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      if (this.$refs.canvas) {
        // Get the destination drawing context
        const context = this.$refs.canvas.getContext('2d');

        context.beginPath();
        context.rect(0, 0, this.totalWidth, this.totalHeight);
        context.fillStyle = '#FFF';
        context.fill();

        // Draw a checkerboard background (to represent transparency)
        context.beginPath();
        const rectSize = this.scale / 3;
        for (let x = 0; x <= this.totalWidth / rectSize; x++) {
          for (let y = 0; y <= this.totalHeight / rectSize; y++) {
            if ((x + y) % 2 === 0) {
              context.rect(x * rectSize, y * rectSize, rectSize, rectSize);
            }
          }
        }
        context.fillStyle = '#CCC';
        context.fill();

        // Disable image smoothing and copy the (scaled-up) image
        context.imageSmoothingEnabled = false;
        const imageCanvas = this.image.toImage().toCanvas();
        context.drawImage(imageCanvas, 0, 0, imageCanvas.width, imageCanvas.height, 0, 0, this.width, this.height);

        // Draw a grid over the image
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = '#CCC';
        for (let x = 0; x <= this.image.width; x++) {
          context.moveTo(x * this.scale + 0.5, 0.5);
          context.lineTo(x * this.scale + 0.5, this.height + 0.5);
        }
        for (let y = 0; y <= this.image.height; y++) {
          context.moveTo(0.5, y * this.scale + 0.5);
          context.lineTo(this.width + 0.5, y * this.scale + 0.5);
        }
        context.stroke();
      }
    },
    handleClick(e) {
      if (e.type !== 'click' && !e.buttons) {
        return;
      }

      const x = clamp(Math.floor(e.offsetX / this.scale), 0, this.image.width - 1);
      const y = clamp(Math.floor(e.offsetY / this.scale), 0, this.image.height - 1);
      this.image.setColorIndexAt(x, y, this.activeColorIndex);
    }
  }
}
</script>
