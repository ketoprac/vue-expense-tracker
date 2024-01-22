import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import './assets/style.css';

const app = createApp(App);
app.use(Toast, {
  timeout: 1200,
  hideProgressBar: true,
});
app.mount('#app');
