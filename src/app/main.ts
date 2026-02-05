import '@/assets/main.css';

// external libraries imports
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// internal application code imports
import App from '@/app/App.vue';
import router from '@/app/router';

// main code execution
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
