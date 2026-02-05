import '@/assets/main.css';

// external libraries imports
import { createApp } from 'vue';

// internal application code imports
import App from '@/app/App.vue';
import PiniaInit from '@/app/PiniaInit';
import router from '@/app/router';

// main code execution
const app = createApp(App);

app.use(PiniaInit.init());
app.use(router);

app.mount('#app');
