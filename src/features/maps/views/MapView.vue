<script setup lang="ts">
import { onMounted } from 'vue';
import * as L from 'leaflet';

// internal application code imports
import {
  MapService,
  createGeoJsonLayer,
  createInfoControl,
  createLegend,
} from '@/features/maps/services/MapService';

onMounted(() => {
  const map = L.map('map').setView([37.8, -96], 4);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  createInfoControl().addTo(map);
  createLegend().addTo(map);

  const statesData = MapService.getGeoData();
  createGeoJsonLayer(statesData, map).addTo(map);
});
</script>

<template>
  <div id="map" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>

<style>
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.info h4 {
  margin: 0 0 5px;
  color: #777;
}

.legend {
  line-height: 18px;
  color: #555;
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
</style>