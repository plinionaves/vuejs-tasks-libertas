<template>
  <ion-page>
      <ion-header>
          <ion-toolbar color="primary">
              <ion-title>Lista de Tarefas</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
            <ion-spinner 
                class="spinner"
                v-if="listaTarefas.length === 0" 
                color="primary">
            </ion-spinner>
            <TarefaItem
                v-for="tarefa in listaTarefas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editarTarefa="editarTarefa"
                @concluirTarefa="concluirTarefa"
                @deletarTarefa="deletarTarefa"/>
        </ion-list>
        <ion-alert-controller></ion-alert-controller>
        <ion-toast-controller></ion-toast-controller>
      </ion-content>
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button @click="addTarefa" color="danger">
            <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
  </ion-page>
</template>

<script>
import axios from 'axios';
import TarefaItem from './TarefaItem';
import { API_URL } from '../config';

export default {
    components: {
        TarefaItem
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
            axios.put(`${API_URL}/${tarefa.id}`, tarefa)
                .then(() => {
                    if (tarefa.concluido) {
                        this.mostrarToast(`Parabéns! Tarefa '${tarefa.titulo}' concluída!`)
                    }
                });
        },
        editarTarefa(tarefa) {
            this.$router.push({ path: `/tarefas/salvar/${tarefa.id}` });
        },
        deletarTarefa(tarefa) {

            const self = this;

            (async function() {
                const alertController = document.querySelector('ion-alert-controller');
                await alertController.componentOnReady();

                const alert = await alertController.create({
                    message: `Deseja realmente deletar a tarefa '${tarefa.titulo}'?`,
                    buttons: [
                        {
                            text: 'Sim',
                            handler: () => {
                                axios.delete(`${API_URL}/${tarefa.id}`)
                                    .then(() => {
                                        self.tarefas = self.tarefas.filter(t => t.id !== tarefa.id);
                                        self.mostrarToast(`Tarefa '${tarefa.titulo}' deletada com sucesso!`);
                                    });
                            }
                        },
                        'Não'
                    ]
                });
                alert.present();
            })();

        },
        mostrarToast(mensagem) {
            (async function () {
                const toastController = document.querySelector('ion-toast-controller');
                await toastController.componentOnReady()
                
                const toast = await toastController.create({
                    message: mensagem,
                    duration: 2000
                });
                toast.present();
            })();
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



