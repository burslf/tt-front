<template>
  <div class="q-pa-md row q-gutter-md">
    <q-card class="my-card cursor-pointer">
      <q-img :src="props.albumFile" style="height: 210px;">
        <div class="absolute-bottom flex items-center justify-between">
          <span class="text-h6">{{ props.artName }}</span>
          <span class="text-subtitle2">Reward: {{ props.percentage }}%</span>
        </div>

      </q-img>

      <q-card-section>
        <div class="flex items-center justify-between q-pb-md">
          <q-avatar size="38px">
            <img :src="props.artistProfileFile">
          </q-avatar>
          <div>
            {{ props.artistName }}
          </div>
        </div>
        <div>
          <q-linear-progress stripe rounded size="20px" :value="0.7" color="secondary" />
        </div>
        <div class="flex justify-between items-center">
          <span class="text-italic">End on: {{ props.dateCountdown }}</span>
          <span class="status q-py-md text-weight-bold">$ 100/{{ props.amount }}</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
  
<script setup>

const props = defineProps({
  artistProfileFile: String,
  albumFile: String,
  artistName: String,
  artName: String,
  dateCountdown: String,
  amount: Number,
  percentage: Number
});

</script>

<style lang="scss">
.my-card {
  min-width: 200px;
  max-height: 420px;
}
</style>