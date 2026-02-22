// internal application code imports
import type { MapFeatureCollection } from '@/features/maps/interfaces/MapInterface';
import colombiaGeo from '@/features/maps/data/colombia-geo.json';

export const mapSeeder: MapFeatureCollection = colombiaGeo as MapFeatureCollection;
