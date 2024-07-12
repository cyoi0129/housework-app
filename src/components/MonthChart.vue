<template>
  <GChart
    type="PieChart"
    :data="[
      ['担当', 'ポイント'],
      ['パパ', dad],
      ['ママ', mom],
    ]"
    :options="{
      width: 360,
      height: 280,
      legend: {
        position: bottom,
      },
      chartArea: {
        width: 300,
        height: 200,
      },
    }"
  />
</template>

<script setup lang="ts">
import { GChart } from 'vue-google-charts';
import { bottom } from '@popperjs/core';
defineProps<{
  dad: number;
  mom: number;
}>();
</script>
