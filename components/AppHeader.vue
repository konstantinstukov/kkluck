<script setup>
import {useAuthStore} from "~/store/authStore";
import {useFormDataStore} from "~/store/formDataStore";
import {useResultStore} from "~/store/resultStore";

const route = useRoute();

const authStore = useAuthStore();
const formDataStore = useFormDataStore();
const resultStore = useResultStore();

const logOut = async () => {
  const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

  try {
    await $fetch("/api/auth/sign-out/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    });

    authStore.$reset();
    formDataStore.$reset();
    resultStore.$reset();

    await navigateTo("/login");
  } catch (err) {
    console.error("Auth error:", err);
  }
};
</script>

<template>
  <header class="header">
    <div class="header-logo text-(--color-primary)">
      <a href="/"> KKLuck</a>
    </div>
    <div class="flex">
      <AppAbout/>
      <button
          v-if="route.path !== '/login'"
          class="w-10 h-10 ml-4 bg-(--color-secondary) fill-(--color-primary) hover:fill-(--background-toolbar) flex items-center justify-center rounded-4xl cursor-pointer border border-transparent hover:bg-(--color-primary) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
          @click="logOut"
      >
        <svg
            aria-hidden="true"
            class="w-4 h-4"
            data-icon="right-from-bracket"
            data-prefix="fas"
            focusable="false"
            role="img"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              class="fill-inherit"
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 50px;
  width: 100%;
  padding: 0 20px;
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 20px 0 rgba(13, 66, 115, 0.21);
  background-color: var(--background-toolbar);

  .menu-link {
    padding-right: 8px;
  }
}

.header-logo {
  font-size: 16px;
  font-weight: 600;
}
</style>
