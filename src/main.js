import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/];

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
