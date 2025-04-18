<script setup>
onMounted(() => {
  selectWinners();
});

const error = ref(null);

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
const winners = ref(new Set());

const filterParticipants = computed(() => {
  if (!Array.isArray(props.apiResult)) return [];

  const uniqueIds = new Set();
  return props.apiResult.filter(participant => {
    if (!participant?.user?.id) return false;

    const userId = participant.user.id;
    if (!uniqueIds.has(userId)) {
      uniqueIds.add(userId);
      return true;
    }
    return false;
  });
});

const selectWinners = () => {
  const participants = filterParticipants.value;
  if (!participants.length) return;

  if (localFormData.value.winnersCount > participants.length) {
    error.value = `Максимальное доступное количество победителей: ${participants.length}`;
    winners.value.clear();
    return;
  }

  winners.value.clear();

  const availableParticipants = [...participants];
  const winnersCount = Math.min(localFormData.value.winnersCount, participants.length);

  for (let i = 0; i < winnersCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableParticipants.length);
    const winner = availableParticipants.splice(randomIndex, 1)[0];
    winners.value.add(winner);
  }
};
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
