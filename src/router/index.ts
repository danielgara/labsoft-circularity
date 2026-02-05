// external libraries imports
import { createRouter, createWebHistory } from 'vue-router';

// internal application code imports
import AboutView from '@/views/AboutView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
  ],
});

export default router;
