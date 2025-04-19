<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const handleOutsideClick = (event) => {
  if (event.target.classList.contains('modal-wrapper')) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && props.isOpen) {
      closeModal();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('keydown', closeModal);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-wrapper" @click="handleOutsideClick">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <div class="modal-content">
          <slot/>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-modal-wrapper-background);
  z-index: 1000;
}

.modal {
  background-color: var(--color-modal-background);
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-6);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-panel-line);
}

.modal-title {
  font-family: Railway, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-heading);
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--color-text);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: var(--color-orange);
}

.modal-content {
  padding: 20px;
}
</style>