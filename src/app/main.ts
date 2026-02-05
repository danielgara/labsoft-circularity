import '@/assets/main.css';

// external libraries imports
import { createApp } from 'vue';

// internal application code imports
import App from '@/app/App.vue';
import router from '@/app/router';
import PiniaInit from '@/app/PiniaInit';

// main code execution
const app = createApp(App);

app.use(PiniaInit.init());
app.use(router);

app.mount('#app');
