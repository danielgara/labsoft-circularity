// external libraries imports
import { useMapStore } from '@/features/maps/stores/mapstore';

// internal application code imports
import type { MapFeatureCollection } from '@/features/maps/interfaces/MapInterface';

// main class
export class MapService {
  static getGeoData(): MapFeatureCollection {
    return useMapStore().geoData;
  }
}