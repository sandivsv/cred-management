import './index.css'
import './assets/style/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import globalComponents from './global-components/index'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
globalComponents(app)


app.mount('#app')
