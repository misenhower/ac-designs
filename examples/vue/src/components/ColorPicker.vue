<template>
  <div class="parent">
    <div style="display: flex; align-items: center">
      <div
        class="selected-color"
        :class="{ active: active }"
        :style="{ background: value }"
        @click="activate"
      />
      <div class="toggle" @click="togglePanel">
        &#9660;
      </div>
    </div>


    <div v-if="panelOpen" v-click-outside="() => panelOpen = false" class="panel">
      <div class="color-groups">
        <div v-for="(group, i) in colorGroups" :key="i" class="color-group">
          <div
            v-for="color in group"
            :key="color"
            :style="{ background: color }"
            class="color"
            @click="select(color)"
          />
        </div>
      </div>

      <div class="gray-group">
        <div
          v-for="color in grayscaleColors"
          :key="color"
          :style="{ background: color }"
          class="color"
          @click="select(color)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Color } from '@/ac-designs';
import chunk from 'lodash/chunk';

const allColors = Color.newLeafColorCodes.filter(c => c);
const grays = allColors.filter((c, i) => i % 10 === 9);
const colors = allColors.filter(c => grays.indexOf(c) === -1);
const colorGroups = chunk(colors, 9);

export default {
  props: {
    value: { default: null, type: String },
    active: Boolean,
  },
  data() {
    return {
      panelOpen: false,
    };
  },
  computed: {
    colorGroups() { return colorGroups; },
    grayscaleColors() { return grays; },
  },
  methods: {
    activate() {
      this.$emit('activate');
    },
    select(color) {
      this.$emit('input', color);
      this.panelOpen = false;
    },
    togglePanel() {
      this.panelOpen = !this.panelOpen;
      if (this.panelOpen) {
        this.activate();
      }
    }
  }
}
</script>

<style scoped>
.parent {
  position: relative;
  display: inline-block;
}

.selected-color {
  width: 25px;
  height: 25px;
  border: 3px solid #000;
  border-radius: 999px;
  margin: 5px;
  display: inline-block;
  cursor: pointer;
}

.selected-color.active {
  box-shadow: 0 0 0 4px #0cf;
}

.toggle {
  display: inline-block;
  cursor: pointer;
}

.panel {
  position: absolute;
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

.color-groups {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.color-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.gray-group {
  margin-top: 20px;
}

.color {
  width: 20px;
  height: 20px;
  display: inline-block;
  cursor: pointer;
}
</style>
