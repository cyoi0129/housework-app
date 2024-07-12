import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CalendarView from '@/views/CalendarView.vue';
import LoginView from '@/views/LoginView.vue';
import MasterListView from '@/views/MasterListView.vue';
import MasterItemView from '@/views/MasterItemView.vue';
import TaskListView from '@/views/TaskListView.vue';
import TaskItemView from '@/views/TaskItemView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/masters',
      name: 'masters',
      component: MasterListView,
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskListView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/master/:id',
      name: 'master',
      component: MasterItemView,
    },
    {
      path: '/task/:id',
      name: 'task',
      component: TaskItemView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
