<script setup lang="ts">
import { RouterLink } from 'vue-router';
defineProps<{
  current: string;
  login: boolean;
}>();
</script>
<template>
  <footer>
    <ul>
      <li :class="current === '/' ? 'active' : ''">
        <router-link :to="login ? '/' : '/login'"><font-awesome-icon icon="chart-simple" />サマリー</router-link>
      </li>
      <li :class="current === '/calendar' ? 'active' : ''">
        <router-link :to="login ? '/calendar' : '/login'"><font-awesome-icon icon="calendar" />履歴</router-link>
      </li>
      <li :class="current.includes('task') ? 'active' : ''">
        <router-link :to="login ? '/tasks' : '/login'"><font-awesome-icon icon="list-check" />タスク</router-link>
      </li>
      <li :class="current.includes('master') ? 'active' : ''">
        <router-link :to="login ? '/masters' : '/login'"><font-awesome-icon icon="broom" />マスター</router-link>
      </li>
    </ul>
  </footer>
</template>
