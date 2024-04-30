import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import'./assets/scss/main.scss'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app');

// createApp(App).use(router).use(store).mount('#app') // Или так 