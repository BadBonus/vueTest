import Vue from "vue";
import App from "./App.vue";
import VueFormulate from "@braid/vue-formulate";
import CustomFormulateSelect from "./components/CustomFormulateSelect";

// register your component with Vue
Vue.component("CustomFormulateSelect", CustomFormulateSelect);

Vue.use(VueFormulate, {
  library: {
    autocomplete: {
      classification: "text",
      component: "CustomFormulateSelect",
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
