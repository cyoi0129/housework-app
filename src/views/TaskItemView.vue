<template>
  <main class="task">
    <h2>タスク編集</h2>
    <dl>
      <dt>家事名</dt>
      <dd>
        <select v-model="data.task.master">
          <option v-for="master in data.masters" :key="master.id" :value="master.id">{{ master.name }}</option>
        </select>
      </dd>
      <dt>担当</dt>
      <dd>
        <input type="radio" id="dad" value="パパ" v-model="data.task.person" />
        <label for="dad">パパ</label>
        <input type="radio" id="mom" value="ママ" v-model="data.task.person" />
        <label for="mom">ママ</label>
      </dd>
      <dt>日付</dt>
      <dd>
        <div class="date_box">
          <input type="date" v-model="data.task.date" />
        </div>
      </dd>
    </dl>
    <div class="action_box"><button class="button" @click="saveTask">保存</button> <button v-if="!data.new" class="button sub" @click="removeTask">削除</button></div>
  </main>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMasterStore } from '../stores/master';
import { useTaskStore } from '../stores/task';
import type { MasterItemType, TaskItemType } from '@/stores/types';
import router from '../router';
const route = useRoute();
const masterStore = useMasterStore();
const taskStore = useTaskStore();
const { addStoreTask, updateStoreTask, removeStoreTask, getTargetTaskById } = taskStore;

const data = reactive<{ new: boolean; masters: MasterItemType[]; task: TaskItemType }>({
  new: false,
  masters: [],
  task: { id: 0, user: 1, master: 0, person: '', date: '' },
});

onBeforeMount(() => {
  data.masters = masterStore.getMasterList;
  data.task.date = taskStore.getCurrentDate;
  if (route.params.id === 'new') {
    data.new = true;
  } else {
    const target_task = getTargetTaskById(Number(route.params.id));
    if (target_task) {
      data.task = target_task;
    } else {
      router.push('/tasks');
    }
  }
});

const saveTask = () => {
  if (data.new) {
    addStoreTask(data.task);
  } else {
    updateStoreTask(data.task);
  }
  router.push('/tasks');
};

const removeTask = () => {
  removeStoreTask(Number(route.params.id));
  router.push('/tasks');
};

watch(masterStore, () => {
  data.masters = masterStore.getMasterList;
});
</script>
<style lang="scss" scoped>
.task {
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
      padding: 8px 16px;
      select {
        position: relative;
        font-size: 16px;
        text-align: center;
        color: #323232;
        height: 40px;
        width: calc(100vw - 64px);
        padding: 0 16px;
        border: none;
        border-radius: 8px;
        background-color: #faefde;
      }
      input[type='radio'] {
        cursor: pointer;
      }
      label {
        cursor: pointer;
        padding: 0 32px 0 8px;
        font-size: 16px;
      }
      input[type='date'] {
        font-size: 16px;
        height: 40px;
        width: calc(100vw - 32px);
      }
    }
  }
}
</style>
