import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'primevue/resources/themes/lara-light-blue/theme.css'      
import 'primevue/resources/primevue.min.css'         
import 'primeicons/primeicons.css'  

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card'


const app = createApp(App)

app.use(PrimeVue)
app.use(VueSweetalert2)

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Card', Card)

app.mount('#app')