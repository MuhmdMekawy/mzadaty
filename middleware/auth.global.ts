import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/globalStore';
import { useAuthStore } from '@/stores/authStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const authStore = useAuthStore();
  const authValue = window.sessionStorage.getItem('authStore') || authStore?.userData;

  // If user is not authenticated and not going to auth pages
  if (!authValue && !to.path.startsWith('/auth') && !to.path.startsWith('/en/auth')) {
    return router.push(`${globalStore?.lang == 'ar' ? '' : '/en'}/auth/login`);
  } 
  // If user is authenticated but trying to access auth pages
  else if (authValue && (to.path.startsWith('/auth') || to.path.startsWith('/en/auth'))) {
    if (to.path.endsWith('activation_code') || to.path.endsWith('new_password')) {
      return;
    }
    return router.push(`${globalStore?.lang == 'ar' ? '/' : '/en'}`);
  }
  
  // Otherwise, do nothing (let the navigation proceed)
});

