// external libraries imports
import { defineStore } from 'pinia';

// internal application code imports
import type { MapInterface } from '@/features/maps/interfaces/MapInterface';
import { mapSeeder } from '@/features/maps/stores/mapseeder';

export const useMapStore = defineStore('map', {
  state: () => ({
    mapData: mapSeeder as MapInterface,
  }),
});
