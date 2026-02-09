import { createApp } from 'vue';
import router from './router'
import { createPinia } from "pinia";

import './style.css'
import App from './App.vue'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler
)

const app = createApp(App)
app.use(createPinia())
app.use(router);

app.mount("#app");
