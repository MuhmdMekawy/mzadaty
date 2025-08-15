import { defineStore } from 'pinia';


export const useAuthStore = defineStore('authStore', () => {
  const userData = ref(null);
  const userImage = ref(null);
  const userName = ref(null);
  const userToken = ref(null)

  const handleUserData = (newUser) => {
    userData.value = newUser;
    userImage.value = newUser.image;
    userName.value = newUser.name;
    userToken.value = newUser.token
  };

  return {
    userData,
    userImage,
    userName,
    handleUserData
  };
}, {
  persist: true
});
