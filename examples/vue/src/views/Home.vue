<template>
  <div>
    <div class="params">
      <div>
        <label>Title</label>
        <input v-model="design.title" maxlength="24">
      </div>
      <div>
        <label>Creator Name</label>
        <input v-model="design.creator" maxlength="9">
      </div>
      <div>
        <label>Village Name</label>
        <input v-model="design.village" maxlength="9">
      </div>
      <div>
        <label>Design Usage</label>
        <select v-model="design.usageId">
          <option v-for="usage in usages" :key="usage.id" :value="usage.id">
            {{ usage.description }}
          </option>
        </select>
      </div>
    </div>

    <div>
      <ColorPicker
        v-for="(color, i) in design.colors"
        :key="i"
        v-model="color.hex"
        :active="activeColorIndex === i"
        @activate="activeColorIndex = i"
      />
    </div>

    <div>
      <ImageEditor :image="indexedImage" :active-color-index="activeColorIndex" />
    </div>

    <div>
      <ImagePreview :image="image" />
      &nbsp;
      <ImagePreview :image="image" xbrz />
    </div>

    <div v-if="qrCodeImages && qrCodeImages.length">
      <ImagePreview v-for="(qrImage, i) in qrCodeImages" :key="i" :image="qrImage" />
    </div>
  </div>
</template>

<script>
import { Design, DesignUsage } from '@/ac-designs';
import debounce from 'lodash/debounce';

export default {
  components: {
    ImagePreview: require('@/components/ImagePreview').default,
    ColorPicker: require('@/components/ColorPicker').default,
    ImageEditor: require('@/components/ImageEditor').default,
  },
  data() {
    return {
      design: new Design,
      qrCodes: null,
      activeColorIndex: 0,
    };
  },
  computed: {
    usages() {
      return DesignUsage.all;
    },
    image() {
      return this.design.toImage();
    },
    indexedImage() {
      return this.design.getIndexedImage();
    },
    qrCodeImages() {
      return this.qrCodes &&
        this.qrCodes.map(qrCode => qrCode.toImage());
    },
  },
  watch: {
    design: {
      deep: true,
      handler: debounce(function () { this.updateQRCodes(); }, 250),
    }
  },
  mounted() {
    this.design.title = 'Example Design';
    this.design.creator = 'Someone';
    this.design.village = 'Somewhere';
    this.design.colorPalette.acnlBytes = [0x14, 0x24, 0x74, 0xF4, 0xA4, 0xD4, 0xC4, 0x94, 0x84, 0x54, 0x34, 0x64, 0x0F, 0x7F, 0xEF];
    this.design.imageData.colorIndexes.fill(12);
  },
  methods: {
    updateQRCodes() {
      try {
        this.qrCodes = this.design.toQRData();
      } catch (e) {
        this.qrCodes = null;
      }
    },
  }
}
</script>

<style scoped>
.params label {
  display: inline-block;
  width: 200px;
  text-align: right;
  margin-right: 5px;
}

.params input,
.params select {
  width: 250px;
}

.params>div {
  margin-bottom: 5px;
}
</style>
