<template>
  <main class="calendar">
    <DatePicker v-model="data.date" @click="changeDate" mode="date" />
    <ul>
      <li v-for="task in data.tasks" :key="task.id">
        <font-awesome-icon icon="icons" />
        <span>{{ getMasterName(task.master) }}</span>
        <font-awesome-icon icon="user" />
        <span>{{ task.person }}</span>
        <font-awesome-icon icon="calendar" />
        <span>{{ task.date }}</span>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { reactive, watch, onBeforeMount } from 'vue';
import { useTaskStore } from '../stores/task';
import { useMasterStore } from '../stores/master';
import type { TaskItemType } from '@/stores/types';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const taskStore = useTaskStore();
const masterStore = useMasterStore();
const { fetchStoreTask, setCurrentDate } = taskStore;
const { getTargetMasterById } = masterStore;

const data = reactive<{ date: string; tasks: TaskItemType[] }>({ date: '', tasks: [] });

onBeforeMount(() => {
  data.date = taskStore.getCurrentDate;
  fetchStoreTask(data.date, data.date);
});

const getMasterName = (id: number): string | undefined => {
  return getTargetMasterById(id)?.name;
};

const changeDate = () => {
  data.date = new Date(data.date).toLocaleDateString('sv-SE');
  fetchStoreTask(data.date, data.date);
  setCurrentDate(data.date);
};

watch(taskStore, () => {
  data.tasks = taskStore.getTaskList;
});
</script>
<style lang="scss" scoped>
.calendar {
  padding: 80px 16px 0;
  ul {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    li {
      border-bottom: dotted 1px #efefef;
      margin: 4px 0;
      padding: 8px;
      display: flex;
      align-items: center;
      span {
        margin: 0 16px 0 8px;
      }
    }
  }
}
</style>
