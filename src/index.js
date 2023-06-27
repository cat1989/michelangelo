import Vue from 'vue'
import router from '@/router'
import App from './App'
import ElementUI from 'element-ui'
import '@/assets/styles/normalize.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
    size: 'medium',
    zIndex: 2000,
})

new Vue({
    router,
    render: (h) => h(App),
}).$mount(document.getElementById("app"))
