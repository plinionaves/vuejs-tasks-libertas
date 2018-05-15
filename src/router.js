import Vue from 'vue'
import VueRouter from 'vue-router';

import TarefasLista from './components/TarefasLista'
import TarefaSalvar from './components/TarefaSalvar'

Vue.use(VueRouter)

const routes = [
    { path: '', redirect: '/tarefas' },
    { path: '/tarefas', component: TarefasLista },
    { path: '/tarefas/salvar', component: TarefaSalvar },
    { path: '/tarefas/salvar/:id', component: TarefaSalvar }
];

export default new VueRouter({ 
    mode: 'history',
    routes 
});