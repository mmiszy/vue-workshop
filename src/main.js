import App from '/src/App.vue';
import ProductDetails from '/src/components/ProductDetails.vue';
import ProductForm from '/src/components/ProductForm.vue';
import ProductsList from '/src/components/ProductsList.vue';
import store from '/src/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import {sync} from 'vuex-router-sync';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueRouter);

const idAsNumber = (r) => {
  const idAsNumber = +r.params.id;
  let id = idAsNumber;
  if (isNaN(idAsNumber)) {
  	id = -1;
	}

	return { id };
};

const router = new VueRouter({
	routes: [
		{
			name: "productsList",
			path: "/",
			component: ProductsList
		}
		,
		{
			name: "productDetails",
			path: "/product/:id",
			component: ProductDetails,
      props: idAsNumber
		},
    {
    	name: "productForm",
			path: "/product/:id/edit",
			component: ProductForm,
			props: idAsNumber
		},
	]
});

sync(store, router);

new Vue({
	render: h => h(App),
  router,
  store
}).$mount('#app');
