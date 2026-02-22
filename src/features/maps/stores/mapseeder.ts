// external libraries imports
import type { MapFeatureCollection } from '@/features/maps/interfaces/MapInterface';

// internal application code imports
import geojson from '@/features/maps/data/states-geo.json';

// main export
export const mapSeeder = geojson as MapFeatureCollection;