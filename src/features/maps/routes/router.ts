// internal application code imports
import MapView from '@/features/maps/views/MapView.vue';

// main variables
const ROUTE_PREFIX = '/maps';

// main export
export default [
  {
    path: `${ROUTE_PREFIX}`,
    name: 'maps.map',
    component: MapView,
    meta: { title: 'Map' },
  },
];
