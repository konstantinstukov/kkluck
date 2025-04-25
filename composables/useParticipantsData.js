/**
 * Композабл для получения и обработки данных участников
 * @returns {Object} Объект, содержащий метод fetchParticipants
 */
export const useParticipantsData = () => {
  /**
   * Рекурсивно обрабатывает комментарии и добавляет уникальных участников в Map
   * @param {Array<Object>} comments - Массив объектов комментариев
   * @param {Map} uniqueMap - Map для хранения уникальных участников
   * @param {Object} comments[].user - Объект пользователя в комментарии
   * @param {string|number} comments[].user.id - Уникальный идентификатор пользователя
   * @param {Array<Object>} [comments[].children] - Опциональные вложенные комментарии
   */
  const processComments = (comments, uniqueMap) => {
    if (!comments?.length) return;

    comments.forEach((comment) => {
      if (!uniqueMap.has(comment.user.id)) {
        uniqueMap.set(comment.user.id, comment);
      }
      if (comment.children?.length) {
        processComments(comment.children, uniqueMap);
      }
    });
  };

  /**
   * Получает и обрабатывает участников на основе фильтров
   * @param {string} link - URL для получения данных
   * @param {Object} formData - Данные формы с настройками фильтров
   * @param {boolean} formData.filterByLike - Флаг фильтрации по лайкам
   * @param {boolean} formData.filterByComment - Флаг фильтрации по комментариям
   * @returns {Promise<Array<Object>>} Массив уникальных участников
   * @throws {Error} Если запрос не удался
   */
  const fetchParticipants = async (link, formData) => {
    if (formData.filterByLike && formData.filterByComment) {
      const [likesResponse, commentsResponse] = await Promise.all([
        $fetch(useGetDataPath(link, { ...formData, filterBy: "like" })),
        $fetch(useGetDataPath(link, { ...formData, filterBy: "comment" })),
      ]);

      const uniqueParticipants = new Map();

      likesResponse.likes?.forEach((like) => {
        uniqueParticipants.set(like.user.id, like);
      });

      processComments(commentsResponse.comments, uniqueParticipants);

      return Array.from(uniqueParticipants.values());
    }

    const response = await $fetch(useGetDataPath(link, formData));

    if (formData.filterByLike) {
      return response.likes || [];
    }

    if (formData.filterByComment) {
      const uniqueComments = new Map();
      processComments(response.comments, uniqueComments);
      return Array.from(uniqueComments.values());
    }

    return [];
  };

  return {
    fetchParticipants,
  };
};
