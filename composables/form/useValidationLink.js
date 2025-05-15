export const useValidationLink = (link) => {
  const isLinkCorrect = ref(null);
  const linkErrorText = ref("");

  const validateLink = () => {
    const bonfirePattern = /^https:\/\/kknights\.com\/bonfire\/\d+$/;
    const postsPattern = /^https:\/\/kknights\.com\/posts\/([^/?#]+)/;

    if (bonfirePattern.test(link.value) || postsPattern.test(link.value)) {
      isLinkCorrect.value = true;
      linkErrorText.value = "";
    } else {
      isLinkCorrect.value = false;
      linkErrorText.value = "Некорректный формат ссылки";
    }
  };

  return {
    isLinkCorrect,
    linkErrorText,
    validateLink,
  };
};
