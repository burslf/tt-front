<template>
    <q-dialog v-model="confirmDialogState" transition-show="scale" transition-hide="scale">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Are you sure ?</div>
        </q-card-section>


        <q-card-actions align="right" class="bg-white">
          <q-btn color="secondary" label="Logout" v-close-popup @click="() => confirmFunction()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useConfirmDialogState } from '../../stores/dialog-store';

const { confirmDialogState, confirmFunction } = useConfirmDialogState();

</script>