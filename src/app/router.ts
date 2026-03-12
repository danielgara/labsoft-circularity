// external libraries imports
import { createRouter, createWebHistory } from 'vue-router';

// internal application code imports
import homeRouter from '@/features/home/routes/router';
import mapsRouter from '@/features/maps/routes/router';

// main code execution
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...homeRouter, ...mapsRouter],
});

// main export
export default router;
