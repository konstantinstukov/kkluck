<script setup>
import {useAuthStore} from "~/store/authStore";

const authStore = useAuthStore();

onMounted(() => {
  if (authStore.user) {
    navigateTo("/");
  }
});

const authFormData = reactive({
  email: "",
  password: "",
});

const errorMsg = ref("");
const loading = ref(false);

const getCsrfToken = async () => {
  await $fetch("/api/user/csrf/", {
    method: "GET",
    credentials: "include",
  });

  return document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
};

const authForm = async () => {
  try {
    loading.value = true;
    errorMsg.value = "";

    const csrfToken = await getCsrfToken();

    await $fetch("/api/auth/sign-in/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: {
        email: authFormData.email,
        password: authFormData.password,
      },
    });

    await navigateTo("/");
  } catch (err) {
    console.error("Auth error:", err);
    errorMsg.value = "Неправильный логин или пароль.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form
      class="flex flex-col items-center justify-center gap-5 mt-8 mb-8 max-w-[375px] container"
      @submit.prevent="authForm"
  >
    <h2 class="title text-center">Вход с учётной записью kknights.com</h2>

    <p v-if="errorMsg" class="text-red-500 text-sm mt-2">
      {{ errorMsg }}
    </p>

    <div class="w-full">
      <input
          id="email"
          v-model="authFormData.email"
          class="input-simple"
          name="email"
          placeholder="Почта"
          type="email"
      />
    </div>
    <div class="w-full">
      <input
          id="password"
          v-model="authFormData.password"
          class="input-simple"
          name="password"
          placeholder="Пароль"
          type="password"
      />
    </div>
    <div>
      <button
          class="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-(--color-secondary) px-4 py-2 text-sm font-medium text-(--color-primary) hover:bg-(--color-primary) hover:text-(--background-panel) focus:outline-none focus-visible:ring-2 focus-visible:ring-(color-primary) focus-visible:ring-offset-2"
          type="submit"
      >
        Войти
      </button>
    </div>
  </form>
</template>
