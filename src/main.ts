import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {initMessage} from './websocket'

initMessage()
const app = createApp(App)

app.use(router)

app.mount('#app')
