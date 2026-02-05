// internal application code imports
import AboutView from '@/features/home/views/AboutView.vue';
import HomeView from '@/features/home/views/HomeView.vue';

// main variables
const ROUTE_PREFIX = '';

// main export
export default [
  {
    path: `${ROUTE_PREFIX}/`,
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' },
  },
  {
    path: `${ROUTE_PREFIX}/about`,
    name: 'about',
    component: AboutView,
    meta: { title: 'About' },
  },
];
