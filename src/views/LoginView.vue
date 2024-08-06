<template>
  <main class="login">
    <h2>ログイン</h2>
    <dl>
      <dt>メールアドレス</dt>
      <dd><input autocomplete="off" type="email" v-model="data.email" /></dd>
      <dt>パスワード</dt>
      <dd><input autocomplete="off" type="password" v-model="data.password" /></dd>
    </dl>
    <button class="button" @click="userLogin">ログイン</button>
  </main>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue';
import { useUserStore } from '../stores/user';
import router from '../router';
const userStore = useUserStore();

const data = reactive<{ email: string; password: string }>({ email: '', password: '' });

const { userStoreLogin } = userStore;

const userLogin = () => {
  userStoreLogin(data.email, data.password);
};

const loginStatus = computed<boolean>(() => {
  return userStore.getLoginStatus;
});

watch(userStore, () => {
  if (loginStatus.value) window.location.href = "/";
});
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  dl {
    height: 200px;
    margin-bottom: 16px;
    dt {
      margin: 16px 0 8px;
    }
    dd {
      input {
        background-color: #faefde;
        border: none;
        appearance: none;
        border-radius: 4px;
        height: 36px;
        width: 240px;
        padding: 0 8px;
      }
    }
  }
}
</style>
