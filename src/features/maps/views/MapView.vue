<script setup lang="ts">
import { onMounted } from 'vue';
import * as L from 'leaflet';
import {
  getGeoData,
  createGeoJsonLayer,
  createInfoControl,
  createLegend,
} from '@/features/maps/services/MapService';

const MAP_CONTAINER_ID = 'map';
const MAP_CENTER: [number, number] = [4.5, -72];
const DEFAULT_ZOOM = 5;
const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

function initMap(): void {
  const map = L.map(MAP_CONTAINER_ID).setView(MAP_CENTER, DEFAULT_ZOOM);

  L.tileLayer(OSM_TILE_URL, {
    maxZoom: 19,
    attribution: OSM_ATTRIBUTION,
  }).addTo(map);

  createInfoControl().addTo(map);
  createLegend().addTo(map);
  createGeoJsonLayer(getGeoData(), map).addTo(map);
}

onMounted(initMap);
</script>

<template>
  <div :id="MAP_CONTAINER_ID" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>

<style>
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
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
