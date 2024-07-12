<template>
  <main class="task_list">
    <div class="date_box">
      <input type="date" v-model="data.date" @change="changeDate" />
    </div>
    <ul>
      <li v-for="task in data.tasks" :key="task.id">
        <router-link :to="'/task/' + task.id">
          <font-awesome-icon icon="icons" />
          <span>{{ getMasterName(task.master) }}</span>
          <font-awesome-icon icon="user" />
          <span>{{ task.person }}</span>
          <font-awesome-icon icon="calendar" />
          <span>{{ task.date }}</span>
        </router-link>
      </li>
    </ul>
    <div class="float_btn" @click="addTask"><font-awesome-icon icon="plus" /></div>
  </main>
</template>
<script setup lang="ts">
import { reactive, watch, onBeforeMount } from 'vue';
import { useTaskStore } from '../stores/task';
import { useMasterStore } from '../stores/master';
import type { TaskItemType } from '@/stores/types';
import router from '../router';

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
  fetchStoreTask(data.date, data.date);
  setCurrentDate(data.date);
};

const addTask = () => {
  router.push('/task/new');
};

watch(taskStore, () => {
  data.tasks = taskStore.getTaskList;
});
</script>
<style lang="scss" scoped>
.task_list {
  input[type='date'] {
    font-size: 20px;
    font-weight: bold;
    height: 48px;
    width: calc(100vw - 32px);
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      a {
        border-bottom: dotted 1px #efefef;
        margin: 4px 16px;
        padding: 8px;
        display: flex;
        align-items: center;
        span {
          margin: 0 16px 0 8px;
        }
      }
    }
  }
}
</style>
