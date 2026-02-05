// internal application code imports
import AboutView from '@/features/home/views/AboutView.vue';
import HomeView from '@/features/home/views/HomeView.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About' },
  }
];