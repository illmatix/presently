import "./scss/style.scss";
import Vue from 'vue';
import vueApp from './app.vue';

document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: '#app',
        render: h => h(vueApp)
    });
});

