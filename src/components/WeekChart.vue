<template>
  <GChart type="ColumnChart" :data="data" />
</template>

<script setup lang="ts">
import { GChart } from 'vue-google-charts';
defineProps<{
  data: Array<Array<string | number>>;
}>();
</script>
