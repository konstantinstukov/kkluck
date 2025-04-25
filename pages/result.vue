<script setup>
import { useResultStore } from "~/store/resultStore";
import { useFormDataStore } from "~/store/formDataStore.js";

const formDataStore = useFormDataStore();
const resultStore = useResultStore();
const { fetchParticipants } = useParticipantsData();

const router = useRouter();
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  if (!formDataStore.getLink) {
    await navigateTo("/");
    return;
  }

  if (resultStore.getParticipants && resultStore.getWinners) {
    isLoading.value = false;
    return;
  }

  try {
    const participants = await fetchParticipants(
      formDataStore.getLink,
      formDataStore.getFormData()
    );

    resultStore.setParticipants(
      useFilterParticipants(participants, formDataStore)
    );
    resultStore.setWinners(
      useWinnerSelect(
        resultStore.getParticipants,
        formDataStore.getWinnersCount
      )
    );

    isLoading.value = false;
    error.value = false;
  } catch (err) {
    console.error(err);
    error.value = "Ошибка при загрузке данных";
    isLoading.value = false;
  }
});

const goBack = () => {
  resultStore.$reset();
  router.back();
};
</script>

<template>
  <div class="flex flex-col items-center gap-7.5 max-w-[440px] container">
    <!-- Loading Spinner -->
    <div v-if="isLoading" role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-(--color-steam-key)"
        fill="none"
        viewBox="0 0 100 101"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <!-- Content if no error and loaded -->
    <div v-else>
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-center">
          Определение победителя среди
          {{ formDataStore.getFilterBy === "like" ? "лапок" : "комментов" }}
          по ссылке:
        </h1>
        <a
          :href="formDataStore.getLink"
          class="text-(--color-steam-key) text-center"
        >
          {{ formDataStore.getLink }}
        </a>
        <h2>
          Количество уникальных участников:
          {{
            resultStore.getParticipants ? resultStore.getParticipants.length : 0
          }}
        </h2>
      </div>

      <!-- Winners list -->
      <div
        v-if="
          !resultStore.getParticipants || resultStore.getParticipants.length < 1
        "
      >
        <h2 class="title text-center">Нет подходящих участников =(</h2>
      </div>

      <div v-else class="flex flex-col items-center gap-4">
        <h2 class="title">
          {{
            resultStore.getWinners.length > 1 ? "Победители:" : "Победитель:"
          }}
        </h2>
        <div class="flex flex-col gap-4">
          <div
            v-for="winner in resultStore.getWinners"
            :key="winner.user.id"
            class="flex items-center gap-4"
          >
            <a
              :href="`https://kknights.com/users/${winner.user.id}`"
              class="text-(--color-orange) flex items-center gap-2.5"
            >
              <img
                :src="winner.user.avatar.small"
                alt="avatar"
                class="w-[40px] h-[40px] rounded-full object-cover"
              />
              {{ winner.user.username }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div>
      <button
        class="button-secondary text-(--color-red) cursor-pointer"
        @click="goBack"
      >
        Назад
      </button>
    </div>
  </div>
</template>
