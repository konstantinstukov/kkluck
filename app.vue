<script setup>
import {NuxtLayout} from "#components";

useHead({
  title: "KKLuck - определитель победителей в конкурсах",
  meta: [
    {
      name: "description",
      content:
          "KKnights - Приложение для определения победителей в конкурсах на сайте kknights.com",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "https://kkluck.vercel.app/favicon.ico",
    },
  ],
});
</script>

<template>
  <div class="app">
    <NuxtLayout>
      <AppHeader/>
      <NuxtLoadingIndicator/>
      <main class="view">
        <div class="main-content">
          <NuxtPage/>
        </div>
      </main>
      <AppFooter/>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.view {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 50px;
  padding-bottom: 20px;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 20px;
}

.container {
  padding: 30px;
  border-radius: 24px;
  box-shadow: 2px 2px 20px 0 rgba(13, 66, 115, 0.21);
  background-color: var(--background-panel);
}

.title {
  font-size: 1.2rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.input-simple {
  height: 40px;
  width: 100%;
  border-radius: 8px;
  background: var(--input-background);
  color: var(--text-primary);
  font-family: Open Sans, sans-serif;
  font-size: 14px;
  padding: 8px 8px 10px;
  box-shadow: none;
  outline: 0 none transparent;
  margin-top: 10px;
}

.form-input--correct {
  background-color: var(--input-background-correct);
  color: var(--background-toolbar);
}

.form-input--error {
  border: 2px solid var(--color-red-500);
}

.button {
  outline: 0 none transparent;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  height: 40px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 20px;
  text-align: center;

  color: var(--color-primary);
  background: var(--color-secondary);

  &:hover {
    color: var(--background-toolbar);
    background: var(--color-primary);
  }
}
</style>
