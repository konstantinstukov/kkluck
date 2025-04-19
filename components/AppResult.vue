<script lang="ts" setup>
import type {Participant} from "~/types";

const participantService = useParticipantService();
const winnerService = useWinnerService();

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  apiResult: {
    type: Object,
    required: true,
  },
});
const localFormData = ref({...props.formData});
const winners = ref(new Set<Participant>());
const error = ref<string | null>(null);

const filterParticipants = computed(() => {
  return participantService.filterParticipants(props.apiResult, {
    filterBy: localFormData.value.findBy,
    findByWord: localFormData.value.findByWord,
    word: localFormData.value.word,
    hasImage: localFormData.value.hasImage,
  })
})

const selectWinners = () => {
  const participants = filterParticipants.value;
  if (!participants.length) return;

  const validationError = winnerService.validateWinnersCount(localFormData.value.winnersCount, participants.length);

  if (validationError) {
    error.value = validationError;
    winners.value.clear();
    return;
  }

  error.value = null;
  winners.value = winnerService.selectWinners(participants, {
    winnersCount: localFormData.value.winnersCount,
  });
};

onMounted(() => {
  selectWinners();
})
</script>

<template>
  <div
      class="flex flex-col items-center gap-4 max-w-[440px] container"
  >
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-center">Определение победителя среди {{
          localFormData.findBy === 'like' ? "лапок" : "комментов"
        }} по
        ссылке:</h1>
      <a :href="localFormData.link" class="text-(--color-steam-key)"> {{ localFormData.link }} </a>
    </div>
    <div>
      <h2>Количество уникальных участников: {{ filterParticipants.length }}</h2>
    </div>

    <div v-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <div v-else class="flex flex-col items-center gap-4">
      <h2>{{ localFormData.winnersCount > 1 ? "Победители:" : "Победитель:" }}</h2>
      <div class="flex flex-col gap-4">
        <div
            v-for="(winner, index) in winners"
            :key="index"
            class="flex items-center gap-4"
        >
          <img
              :src="winner.user.avatar.small"
              alt="avatar"
              class="w-[40px] h-[40px] rounded-full object-cover"
          >
          <p class="text-center ">
            {{ winner.user.username }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
