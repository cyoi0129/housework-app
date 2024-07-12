import { defineStore } from 'pinia';
import { userDbLogin } from './db';
import Cookies from 'js-cookie';

export const useUserStore = defineStore('user', {
  state: () => ({
    login: false as boolean,
    error: false as boolean,
  }),
  getters: {
    getLoginStatus(state) {
      return state.login;
    },
  },
  actions: {
    setLoginStatus() {
      if (Cookies.get('token')) this.login = true;
    },
    async userStoreLogin(email: string, password: string) {
      const response = await userDbLogin({ email: email, password: password });
      if (response.status === 0) {
        this.login = true;
        Cookies.set('token', response.token);
      } else {
        this.login = false;
        this.error = true;
      }
    },
  },
});
