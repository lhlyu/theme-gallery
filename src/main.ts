import { createApp } from 'vue'
import store from './stores'
import i18n from './i18n'

import App from './App.vue'

const app = createApp(App)

app.use(store)
app.use(i18n)

app.mount('body')
