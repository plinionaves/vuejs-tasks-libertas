<template>
  <ion-page>
      <ion-header>
          <ion-toolbar color="primary">
              <ion-title>Lista de Tarefas</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content>
          <ion-list>
            <tarefa-item
                v-for="tarefa in listaTarefas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editarTarefa="editarTarefa"
                @concluirTarefa="concluirTarefa"
                @deletarTarefa="deletarTarefa">
            </tarefa-item>
          </ion-list>
          <ion-fab-button class="fixed-fab-button" @click="addTarefa">
              <ion-icon name="add"></ion-icon>
          </ion-fab-button>
      </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';
import TarefaItem from './TarefaItem';
import { API_URL } from '../config';

export default {
    components: {
        'TarefaItem': TarefaItem
    },
    data() {
        return {
            tarefas: []
        }
    },
    computed: {
        listaTarefas() {
            return this.tarefas
                .slice()
                .sort((tarefaA, tarefaB) => tarefaA.titulo > tarefaB.titulo)
                .sort((tarefaA, tarefaB) => tarefaA.concluido > tarefaB.concluido);
        }
    },
    methods: {
        addTarefa() {
            this.$router.push({ path: '/tarefas/salvar' })
        },
        concluirTarefa(tarefa) {
            axios.put(`${API_URL}/${tarefa.id}`, tarefa);
        },
        editarTarefa(tarefa) {
            this.$router.push({ path: `/tarefas/salvar/${tarefa.id}` });
        },
        deletarTarefa(tarefa) {
            const autorizadoDeletar = window.confirm(`Deseja realmente deletar a tarefa '${tarefa.titulo}'?`);
            if (autorizadoDeletar) {
                axios.delete(`${API_URL}/${tarefa.id}`)
                    .then(() => {
                        this.tarefas = this.tarefas.filter(t => t.id !== tarefa.id);
                    });
            }
        }
    },
    mounted() {
        axios.get(API_URL)
            .then(res => {
                this.tarefas = res.data;
            });
    }
}
</script>



