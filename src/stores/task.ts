import { defineStore } from 'pinia';
import { fetchDbTask, addDbTask, updateDbTask, removeDbTask } from './db';
import type { TaskItemType, TaskDbType, TaskDbDataType } from './types';
import { convertDbTaskList, convert2NewDbTask, convertDbTask, convert2DbTask } from './func';

export const useTaskStore = defineStore('task', {
  state: () => ({
    date: new Date().toLocaleDateString('sv-SE'),
    data: [] as TaskItemType[],
    error: false as boolean,
  }),
  getters: {
    getTaskList(state) {
      return state.data;
    },
    getTargetTaskById: (state) => {
      return (target: number) => state.data.find((task) => task.id === target);
    },
    getCurrentDate(state) {
      return state.date;
    },
  },
  actions: {
    async fetchStoreTask(start: string, end: string) {
      const response = await fetchDbTask(start, end);
      if (response.status === 0 && response.data) {
        this.data = convertDbTaskList(response.data);
        this.error = false;
      } else {
        this.data = [];
        this.error = true;
      }
    },

    async addStoreTask(data: TaskItemType) {
      const task: TaskDbType = convert2NewDbTask(data);
      const response = await addDbTask(task);
      if (response.status === 0 && response.data) {
        const new_task: TaskItemType = convertDbTask(response.data);
        this.data = [new_task, ...this.data];
        this.error = false;
      } else {
        this.error = true;
      }
    },
    async updateStoreTask(data: TaskItemType) {
      const task: TaskDbDataType = convert2DbTask(data);
      const response = await updateDbTask(task);
      if (response.status === 0 && response.data) {
        const new_task: TaskItemType = convertDbTask(response.data);
        this.data = this.data.filter((item) => item.id !== new_task.id);
        this.data = [new_task, ...this.data].sort((a, b) => {
          return b.id - a.id;
        });
        this.error = false;
      } else {
        this.error = true;
      }
    },
    async removeStoreTask(id: number) {
      const response = await removeDbTask(id);
      if (response.status === 0 && response.data) {
        this.data = this.data.filter((item) => item.id !== id);
        this.error = false;
      } else {
        this.error = true;
      }
    },

    setCurrentDate(date: string) {
      this.date = date;
    },
  },
});
