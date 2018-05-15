<template>
  <ion-page>
      <ion-header>
          <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button @click="voltar">
                        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Salvar Tarefa</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content>
          <ion-item>
                <ion-input 
                    @input="tarefa.titulo=$event.target.value"
                    :value="tarefa.titulo"
                    @keyup.enter="salvarTarefa">
                </ion-input>
          </ion-item>
      </ion-content>
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button @click="salvarTarefa">
        <ion-icon name="checkmark"></ion-icon>
        </ion-fab-button>
      </ion-fab>
  </ion-page>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../config';

export default {
  data() {
      return {
          tarefa: {
              titulo: '',
              concluido: false
          }
      }
  },
  methods: {
      salvarTarefa() {
        if (this.tarefa.titulo) {
            const operacao = (this.tarefa.id)
                ? axios.put(`${API_URL}/${this.tarefa.id}`, this.tarefa)
                : axios.post(API_URL, this.tarefa);

            operacao
                .then(() => {
                    this.voltar();
                });
        }        
      },
      voltar() {
          this.$router.push({ path: '/tarefas' })
      }
  },
  mounted() {
      const id = this.$route.params.id;
      if (id) {
          axios.get(`${API_URL}/${id}`)
            .then(res => this.tarefa = res.data);
      }
  }
}
</script>

