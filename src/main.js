/* import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Library Components
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue3-apexcharts'
import BootstrapVue3 from 'bootstrap-vue-3'
import CounterUp from 'vue3-autocounter'
import 'aos/dist/aos.css'

// Custom Components & Directives
import globalComponent from './plugins/global-components'
import globalDirective from './plugins/global-directive'
import globalMixin from './plugins/global-mixin'

// firebase
import Vue from 'vue';
import App from './App.vue';
import firebase from './firebase';
Vue.config.productionTip = false;

// Make Firebase app (or specific services) globally available
Object.defineProperty(Vue.prototype, '$firebase', {
  get() {
    return firebase;
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');

require('waypoints/lib/noframework.waypoints.min')

const app = createApp(App)
app.use(store).use(router)

// Library Components
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.use(BootstrapVue3)
app.component('counter-up', CounterUp)

// Custom Components & Directives
app.use(globalComponent)
app.use(globalDirective)
app.mixin(globalMixin)

app.mount('#app')

export default app */

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Library Components
import VueSweetalert2 from 'vue-sweetalert2';
import VueApexCharts from 'vue3-apexcharts';
import BootstrapVue3 from 'bootstrap-vue-3';
import CounterUp from 'vue3-autocounter';
import 'aos/dist/aos.css';

// Custom Components & Directives
import globalComponent from './plugins/global-components';
import globalDirective from './plugins/global-directive';
import globalMixin from './plugins/global-mixin';


import {auth, onAuthStateChanged } from "@/firebase";

let vueApp;

//onAuthStateChanged(auth, (user) => {
onAuthStateChanged(auth,() => {

  if (!vueApp) {
    vueApp = createApp(App)
      .use(store)
      .use(router)
      .use(VueSweetalert2)
      .use(VueApexCharts)
      .use(BootstrapVue3)
      .component('counter-up', CounterUp)
      .use(globalComponent)
      .use(globalDirective)
      .mixin(globalMixin)
      .mount('#app');
  }
});

export default vueApp;