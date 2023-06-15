import {createApp} from 'vue'
import './assets/styles/main.less'
import App from './App.vue'
import {createPinia} from 'pinia'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const pinia = createPinia()
createApp(App).component('EasyDataTable', Vue3EasyDataTable).use(pinia).mount('#app')
