<script setup lang="ts">
import { onBeforeMount, onMounted, reactive } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import Cookies from 'js-cookie';
import router from './router';
import { useMasterStore } from './stores/master';
const route = useRoute();

import { useUserStore } from './stores/user';
const userStore = useUserStore();
const masterStore = useMasterStore();
const { fetchStoreMaster } = masterStore;
const { setLoginStatus } = userStore;

const data = reactive<{ login: boolean }>({ login: false });

onBeforeMount(() => {
  setLoginStatus();
});

onMounted(() => {
  if (!Cookies.get('token')) {
    router.push('login');
  } else {
    data.login = true;
    fetchStoreMaster();
  }
});
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter :current="route.path" :login="data.login" />
</template>

<style scoped lang="scss"></style>
