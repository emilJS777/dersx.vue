import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import mitt from "mitt";
import Paginate from "vuejs-paginate-next";
//vue-app/src/main.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();




const app = createApp(App)
app.config.globalProperties.emitter = mitt();
app.use(router)
app.use(store)
app.use(FontAwesomeIcon)
app.component('VPaginate', Paginate)
app.mount('#app')