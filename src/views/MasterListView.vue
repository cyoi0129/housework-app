<template>
  <main class="master_list">
    <ul>
      <li v-for="master in data.masters" :key="master.id">
        <router-link :to="'/master/' + master.id">
          <h3>{{ master.name }}</h3>
          <div class="detail">
            <font-awesome-icon icon="icons" />
            <span>{{ master.category }}</span>
            <font-awesome-icon icon="coins" />
            <span>{{ master.point }}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="float_btn" @click="addMaster"><font-awesome-icon icon="plus" /></div>
  </main>
</template>

<script setup lang="ts">
import { reactive, watch, onBeforeMount } from 'vue';
import { useMasterStore } from '../stores/master';
import type { MasterItemType } from '@/stores/types';
import router from '../router';

const masterStore = useMasterStore();

const data = reactive<{ masters: MasterItemType[] }>({ masters: [] });

onBeforeMount(() => {
  data.masters = masterStore.getMasterList;
});

const addMaster = () => {
  router.push('/master/new');
};

watch(masterStore, () => {
  data.masters = masterStore.getMasterList;
});
</script>
<style lang="scss" scoped>
.master_list {
  ul {
    display: flex;
    flex-direction: column;
    li {
      a {
        border-radius: 4px;
        background-color: #fff;
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
        margin: 4px;
        padding: 8px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        row-gap: 4px;
        .detail {
          span {
            margin: 0 16px 0 8px;
          }
        }
      }
    }
  }
}
</style>
