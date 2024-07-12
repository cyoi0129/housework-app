import { defineStore } from 'pinia';
import { fetchDbMaster, addDbMaster, updateDbMaster, removeDbMaster } from './db';
import type { MasterDbType, MasterDbDataType, MasterItemType } from './types';
import { convertDbMasterList, convert2DbMaster, convert2NewDbMaster, convertDbMaster } from './func';

export const useMasterStore = defineStore('master', {
  state: () => ({
    data: [] as MasterItemType[],
    error: false as boolean,
  }),
  getters: {
    getMasterList(state) {
      return state.data;
    },
    getTargetMasterById: (state) => {
      return (target: number) => state.data.find((master) => master.id === target);
    },
  },
  actions: {
    async fetchStoreMaster() {
      const response = await fetchDbMaster();
      if (response.status === 0 && response.data) {
        this.data = convertDbMasterList(response.data);
        this.error = false;
      } else {
        this.data = [];
        this.error = true;
      }
    },
    async addStoreMaster(data: MasterItemType) {
      const master: MasterDbType = convert2NewDbMaster(data);
      const response = await addDbMaster(master);
      if (response.status === 0 && response.data) {
        const new_master: MasterItemType = convertDbMaster(response.data);
        this.data = [new_master, ...this.data];
        this.error = false;
      } else {
        this.error = true;
      }
    },
    async updateStoreMaster(data: MasterItemType) {
      const master: MasterDbDataType = convert2DbMaster(data);
      const response = await updateDbMaster(master);
      if (response.status === 0 && response.data) {
        const new_master: MasterItemType = convertDbMaster(response.data);
        this.data = this.data.filter((item) => item.id !== new_master.id);
        this.data = [new_master, ...this.data].sort((a, b) => {
          return b.id - a.id;
        });
        this.error = false;
      } else {
        this.error = true;
      }
    },
    async removeStoreMaster(id: number) {
      const response = await removeDbMaster(id);
      if (response.status === 0 && response.data) {
        this.data = this.data.filter((item) => item.id !== id);
        this.error = false;
      } else {
        this.error = true;
      }
    },
  },
});
