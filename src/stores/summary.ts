import { defineStore } from 'pinia';
import { fetchDbTask } from './db';
import type { TaskItemType } from './types';
import { convertDbTaskList, getTargetDate } from './func';

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    week: [] as TaskItemType[],
    month: [] as TaskItemType[],
    error: false as boolean,
  }),
  getters: {
    getWeekTaskList(state) {
      return state.week;
    },
    getMonthTaskList(state) {
      return state.month;
    },
  },
  actions: {
    async fetchStorageWeekTask() {
      const response = await fetchDbTask(getTargetDate(8).toLocaleDateString('sv-SE'), getTargetDate(1).toLocaleDateString('sv-SE'));
      if (response.status === 0 && response.data) {
        this.week = convertDbTaskList(response.data);
        this.error = false;
      } else {
        this.week = [];
        this.error = true;
      }
    },
    async fetchStorageMonthTask() {
      const response = await fetchDbTask(getTargetDate(31).toLocaleDateString('sv-SE'), getTargetDate(1).toLocaleDateString('sv-SE'));
      if (response.status === 0 && response.data) {
        this.month = convertDbTaskList(response.data);
        this.error = false;
      } else {
        this.month = [];
        this.error = true;
      }
    },
  },
});
