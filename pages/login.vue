<script setup>
import { useAuth } from "~/composables/auth/useAuth";

const authFormData = reactive({
  email: "",
  password: "",
});
const errorMsg = ref("");

const authForm = async () => {
  await useAuth(authFormData, errorMsg);
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
