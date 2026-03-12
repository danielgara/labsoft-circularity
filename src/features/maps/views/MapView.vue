<script setup lang="ts">
// external libraries imports
import { onMounted } from 'vue';
import * as L from 'leaflet';

// internal application code imports
import { MapService } from '@/features/maps/services/MapService';
import { MapUtils } from '@/features/maps/utils/MapUtils';

onMounted(() => {
  const map = L.map('map').setView([4.5709, -74.2973], 5);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const mapData = MapService.getMapData();

  const mapUtils = new MapUtils(map);

  mapUtils.createGeoJsonLayer(mapData).addTo(map);
  mapUtils.createInfoControl().addTo(map);
  mapUtils.createLegend().addTo(map);
});
</script>

<template>
  <div id="map" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>

<style>
.info {
  padding: 0;
  font:
    14px/1.4 system-ui,
    -apple-system,
    sans-serif;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  min-width: 140px;
}

.info-panel {
  padding: 10px 12px;
}

.info-panel__title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  margin-bottom: 6px;
}

.info-panel__content {
  border-top: 1px solid #e2e8f0;
  padding-top: 8px;
}

.info-panel__name {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}

.info-panel__meta {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}

.info-panel__hint {
  font-size: 12px;
  color: #94a3b8;
  font-style: italic;
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
