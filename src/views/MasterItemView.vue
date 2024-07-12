<template>
  <main class="master">
    <h2>マスター編集</h2>
    <dl>
      <dt>家事名</dt>
      <dd><input type="text" v-model="data.master.name" /></dd>
      <dt>カテゴリ</dt>
      <dd><input type="text" v-model="data.master.category" /></dd>
      <dt>
        ポイント<span>{{ data.master.point }}</span>
      </dt>
      <dd><input type="range" name="point" min="0" max="100" step="5" v-model="data.master.point" /></dd>
    </dl>
    <div class="action_box"><button class="button" @click="saveMaster">保存</button> <button v-if="!data.new" class="button sub" @click="removeMaster">削除</button></div>
  </main>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMasterStore } from '../stores/master';
import type { MasterItemType } from '@/stores/types';
import router from '../router';
const route = useRoute();
const masterStore = useMasterStore();
const { getTargetMasterById, addStoreMaster, updateStoreMaster, removeStoreMaster } = masterStore;

const data = reactive<{ new: boolean; master: MasterItemType }>({ new: false, master: { id: 0, user: 1, name: '', category: '', point: 0 } });

onBeforeMount(() => {
  if (route.params.id === 'new') {
    data.new = true;
  } else {
    const target_master = getTargetMasterById(Number(route.params.id));
    if (target_master) data.master = target_master;
  }
});

const saveMaster = () => {
  if (data.new) {
    addStoreMaster(data.master);
  } else {
    updateStoreMaster(data.master);
  }
  router.push('/masters');
};

const removeMaster = () => {
  removeStoreMaster(Number(route.params.id));
  router.push('/masters');
};

watch(masterStore, () => {
  const target_master = getTargetMasterById(Number(route.params.id));
  if (target_master) data.master = target_master;
});
</script>

<style lang="scss" scoped>
.master {
  dl {
    padding: 16px;
    dt {
      font-weight: bold;
      margin: 16px 0 8px;
      span {
        font-size: 80%;
        margin-left: 8px;
        &:before {
          content: '(';
        }
        &:after {
          content: ')';
        }
      }
    }
    dd {
      input[type='text'] {
        position: relative;
        font-size: 16px;
        color: #323232;
        height: 40px;
        width: calc(100vw - 64px);
        padding: 0 16px;
        border: none;
        border-radius: 8px;
        background-color: #faefde;
      }
      input[type='range'] {
        appearance: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        width: calc(100vw - 48px);
        padding: 0 8px;
        &::-webkit-slider-runnable-track {
          background: #ddd;
          height: 8px;
          border-radius: 8px;
        }
        &::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          margin-top: -6px;
          background-color: #8d6c9f;
          border-radius: 50%;
        }
        &::-moz-range-track {
          background: #ddd;
          height: 8px;
          border-radius: 8px;
        }
        &::-moz-range-thumb {
          border: none;
          height: 20px;
          width: 20px;
          background-color: #8d6c9f;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
