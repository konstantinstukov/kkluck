<script setup>
const authFormData = reactive({
  email: "",
  password: "",
});

const errorMsg = ref("");
const router = useRouter();
const loading = ref(false);

const authForm = async () => {
  try {
    loading.value = true;
    errorMsg.value = "";

    const response = await $fetch("/api/login", {
      method: "POST",
      body: {
        email: authFormData.email,
        password: authFormData.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.access) {
      await router.push("/");
    } else {
      errorMsg.value = "Неверные учетные данные";
    }
  } catch (err) {
    console.error("Auth error:", err);
    errorMsg.value = "Ошибка авторизации: Доступ запрещен";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form
    class="flex flex-col items-center justify-center mt-8 mb-8 pl-4 pr-4"
    @submit.prevent="authForm"
  >
    <h2>Вход с учётной записью kknights.com</h2>

    <div class="row">
      <div class="field">
        <input
          id="email"
          v-model="authFormData.email"
          name="email"
          placeholder="Почта"
          type="email"
        />
        <label for="email">Почта</label>
      </div>
    </div>
    <div class="row">
      <div class="field last">
        <input
          id="password"
          v-model="authFormData.password"
          name="password"
          placeholder="Пароль"
          type="password"
        />
        <label for="password">Пароль</label>
      </div>
    </div>
    <div class="form-actions">
      <button class="button uppercased blue" type="submit">Войти</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.button {
  outline: 0 none transparent;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.button.uppercased {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0;
  background: none;
}

.button.uppercased.blue {
  color: var(--color-blue);
}
</style>
