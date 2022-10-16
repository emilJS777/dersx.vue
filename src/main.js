import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import mitt from "mitt";
import Paginate from "vuejs-paginate-next";




const app = createApp(App)
app.config.globalProperties.emitter = mitt();
app.use(router)
app.use(store)
app.component('VPaginate', Paginate)
app.mount('#app')