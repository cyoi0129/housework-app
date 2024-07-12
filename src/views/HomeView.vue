<template>
  <main class="home">
    <div class="chart_area">
      <h2>月間サマリー</h2>
      <MonthChart :dad="data.month_dad" :mom="data.month_mom" />
    </div>
    <div class="chart_area">
      <h2>週間レポート</h2>
      <WeekChart :data="data.week" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, watch, onBeforeMount } from 'vue';
import { useSummaryStore } from '../stores/summary';
import { useMasterStore } from '../stores/master';
import type { MasterItemType } from '@/stores/types';
import { getTargetDate } from '@/stores/func';
import WeekChart from '../components/WeekChart.vue';
import MonthChart from '../components/MonthChart.vue';

const data = reactive<{ month_dad: number; month_mom: number; week: Array<Array<string | number>>; masters: MasterItemType[] }>({ month_dad: 0, month_mom: 0, week: [[]], masters: [] });

const masterStore = useMasterStore();
const summaryStore = useSummaryStore();

const { fetchStorageWeekTask, fetchStorageMonthTask } = summaryStore;

onBeforeMount(() => {
  fetchStorageWeekTask();
  fetchStorageMonthTask();
});

const getMasterPoint = (id: number): number => {
  const target = data.masters.find((master) => master.id === id);
  return target ? target.point : 0;
};

const createMonthData = () => {
  const month_task_list = summaryStore.getMonthTaskList;
  data.month_dad = month_task_list.filter((task) => task.person === 'パパ').reduce((sum, task) => sum + getMasterPoint(task.master), 0);
  data.month_mom = month_task_list.filter((task) => task.person === 'ママ').reduce((sum, task) => sum + getMasterPoint(task.master), 0);
};

const createWeekData = () => {
  const week_task_list = summaryStore.getWeekTaskList;
  const result: Array<Array<string | number>> = [['日付', 'パパ', 'ママ']];
  [...Array(7)].map((_, i) => {
    const label = getTargetDate(7 - i).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' });
    const target_date = getTargetDate(7 - i).toLocaleDateString('sv-SE');
    const day_task_list = week_task_list.filter((task) => task.date === target_date);
    const dad_point = day_task_list.filter((task) => task.person === 'パパ').reduce((sum, task) => sum + getMasterPoint(task.master), 0);
    const mom_point = day_task_list.filter((task) => task.person === 'ママ').reduce((sum, task) => sum + getMasterPoint(task.master), 0);
    result.push([label, dad_point, mom_point]);
  });
  data.week = result;
};

watch(summaryStore, () => {
  data.masters = masterStore.getMasterList;
  createMonthData();
  createWeekData();
});

watch(masterStore, () => {
  data.masters = masterStore.getMasterList;
});
</script>
