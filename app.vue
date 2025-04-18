<script setup>
useSeoMeta({
  title: "KKLuck - определитель победителей в конкурсах",
  description:
      "KKnights - Приложение для определения победителей в конкурсах на сайте kknights.com",
  icon: "/favicon.ico",
});
</script>

<template>
  <div class="app">
    <AppHeader/>
    <main class="view">
      <NuxtPage/>
    </main>
  </div>
</template>

<style lang="scss">
.app {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.view {
  z-index: 5;
  padding-top: 50px;
}
</style>
