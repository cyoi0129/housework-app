import './assets/css/base.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { setupCalendar } from 'v-calendar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartSimple, faCalendar, faListCheck, faBroom, faIcons, faCoins, faPerson, faPersonDress, faPlus, faFloppyDisk, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueGoogleCharts from 'vue-google-charts';

library.add(faChartSimple, faCalendar, faListCheck, faBroom, faIcons, faCoins, faPerson, faPersonDress, faPlus, faFloppyDisk, faUser);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(setupCalendar, {});
app.use(VueGoogleCharts);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
