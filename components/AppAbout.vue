<script setup>
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}
</script>

<template>
  <div class="flex items-center justify-center">
    <button
      class="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      @click="openModal"
    >
      Что умеет KKLuck?
    </button>
  </div>
  <TransitionRoot :show="isOpen" appear as="template">
    <Dialog as="div" class="relative z-100" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="about-content fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-100"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-100"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="modal-title leading-6 text-gray-900">
                Что умеет KKLuck?
              </DialogTitle>

              <div class="w-full px-4 pt-8">
                <h3 class="about-subtitle pb-2 font-medium">
                  Основные возможности:
                </h3>
                <div class="mx-auto w-full max-w-md rounded-2xl">
                  <Disclosure v-slot="{ open }">
                    <DisclosureButton
                      class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75"
                    >
                      <span>1. Выбор победителей по лапкам (лайкам):</span>
                      <ChevronUpIcon
                        :class="open ? 'rotate-180 transform' : ''"
                        class="h-5 w-5 text-blue-500"
                      />
                    </DisclosureButton>
                    <DisclosurePanel
                      class="px-4 pb-2 pt-4 text-sm text-gray-500"
                    >
                      - Вставьте ссылку на пост или записку в кострище<br />
                      - Укажите количество победителей (от 1 до 100)<br />
                      - Получите случайно выбранных победителей из тех, кто
                      поставил лапку
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure v-slot="{ open }" as="div" class="mt-2">
                    <DisclosureButton
                      class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75"
                    >
                      <span>2. Выбор победителей по комментариям:</span>
                      <ChevronUpIcon
                        :class="open ? 'rotate-180 transform' : ''"
                        class="h-5 w-5 text-blue-500"
                      />
                    </DisclosureButton>
                    <DisclosurePanel
                      class="px-4 pb-2 pt-4 text-sm text-gray-500"
                    >
                      - Вставьте ссылку на пост или записку в кострище<br />
                      - Укажите количество победителей (от 1 до 100)<br />
                      - Получите случайно выбранных победителей из тех, кто
                      оставил комментарий
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure v-slot="{ open }" as="div" class="mt-2">
                    <DisclosureButton
                      class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75"
                    >
                      <span>3. Фильтрация комментариев по содержанию:</span>
                      <ChevronUpIcon
                        :class="open ? 'rotate-180 transform' : ''"
                        class="h-5 w-5 text-blue-500"
                      />
                    </DisclosureButton>
                    <DisclosurePanel
                      class="px-4 pb-2 pt-4 text-sm text-gray-500"
                    >
                      - Выбор комментариев, содержащих определенное слово или
                      фразу<br />
                      - Выбор комментариев, содержащих изображения<br />
                      - Комбинирование этих фильтров для более точного отбора
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </div>
              <div class="w-full px-4 pt-8">
                <h3 class="about-subtitle font-medium">Как пользоваться:</h3>
                <div>
                  <ul class="usage-list">
                    <li>
                      <span class="usage-step"
                        >Залогиньтесь с помощью данных аккаунта
                        kknights.com</span
                      >
                    </li>
                    <li>
                      <span class="usage-step"
                        >Вставьте ссылку на пост или записку в кострище в
                        формате:
                        <ul class="pl-4">
                          <li class="font-normal">
                            <code>https://kknights.com/bonfire/123</code>
                          </li>
                          <li class="font-normal">
                            <code>https://kknights.com/posts/post-id</code>
                          </li>
                        </ul>
                      </span>
                    </li>
                    <li>
                      <span class="usage-step"
                        >Выберите тип отбора: по лапкам или комментариям</span
                      >
                    </li>
                    <li>
                      <span class="usage-step"
                        >Если выбран отбор по комментариям, вы можете
                        дополнительно фильтровать по содержанию:</span
                      >
                      <ul class="pl-4">
                        <li>Включите опцию "Выбирать по содержанию"</li>
                        <li>
                          Введите слово или фразу для поиска (до 30 символов)
                        </li>
                        <li>
                          При необходимости включите опцию "Содержит
                          изображение"
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span class="usage-step"
                        >Укажите количество победителей (от 1 до 100)</span
                      >
                    </li>
                    <li>
                      <span class="usage-step"
                        >Нажмите кнопку "Определить победителя" или "Определить
                        победителей"</span
                      >
                    </li>
                    <li>
                      <span class="usage-step"
                        >Получите список случайно выбранных победителей</span
                      >
                    </li>
                  </ul>
                </div>
                <h3 class="about-subtitle pt-8 font-medium">
                  Технические особенности:
                </h3>
                <div>
                  <ul class="usage-list">
                    <li>
                      <span class="usage-step"
                        >Приложение автоматически исключает дубликаты
                        участников</span
                      >
                    </li>
                    <li>
                      <span class="usage-step"
                        >Максимальное количество победителей ограничено
                        количеством уникальных участников</span
                      >
                    </li>
                    <li>
                      <span class="usage-step"
                        >Работает с постами и записками в кострище на сайте
                        kknights.com</span
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <div class="flex mt-4 pr-4 pl-4">
                <button
                  class="cursor-pointer ml-auto inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  type="button"
                  @click="closeModal"
                >
                  Закрыть
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped>
.modal-title {
  font-family: Railway, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
}

.about-content {
  font-size: 14px;
  line-height: 1.5;
}

.about-subtitle {
  font-size: 18px;
  margin-bottom: 12px;
}

.feature-title {
  color: var(-color-blue-500);
  font-weight: 600;
  margin-bottom: 8px;
}

.usage-list {
  li {
    padding-bottom: 8px;
  }

  .usage-step {
    font-weight: 600;

    code {
      background-color: var(--color-blue-100);
      border-radius: 4px;
      font-family: monospace;
      padding: 2px 4px;
    }
  }
}
</style>
