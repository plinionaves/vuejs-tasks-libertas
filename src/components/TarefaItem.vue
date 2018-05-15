<template>
    <ion-item-sliding @click="editarTarefa">
        <ion-item>
            <ion-label>
                <span :class="{concluido: tarefa.concluido}">{{ tarefa.titulo }}</span>
            </ion-label>
            <ion-toggle 
                v-once
                :checked="tarefa.concluido" 
                @ionChange="concluirTarefa">
            </ion-toggle>
        </ion-item>
        <ion-item-options side="end">
            <ion-item-option expandable color="primary" tappable @click.stop="editarTarefa">
                <ion-icon name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option expandable color="danger" tappable @click.stop="deletarTarefa">
                <ion-icon name="trash"></ion-icon>
            </ion-item-option>
        </ion-item-options>
    </ion-item-sliding>
</template>

<script>
export default {
    props: ['tarefa'],
    methods: {
        editarTarefa() {
            this.$emit('editarTarefa', this.tarefa);
        },
        concluirTarefa(event) {
            this.tarefa.concluido = event.detail.checked;
            this.$emit('concluirTarefa', this.tarefa);
        },
        deletarTarefa() {
            this.$emit('deletarTarefa', this.tarefa);
        }
    }
}
</script>


<style scoped>
.concluido {
    text-decoration: line-through;
}
</style>

