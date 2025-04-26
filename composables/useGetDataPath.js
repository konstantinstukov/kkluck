export const useGetDataPath = (url, formData) => {
  const isBonfire = url.includes("bonfire/");
  const isPost = url.includes("posts/");
  const filterByLike = formData.filterByLike;
  const filterByComment = formData.filterByComment;

  if (filterByLike) {
    if (isBonfire) {
      const match = url.match(/bonfire\/(\d+)/);
      if (match) return `/api/like/${match[1]}/?type=3`;
    }
    if (isPost) {
      const match = url.match(/posts\/(\d+)-/);
      if (match) return `/api/like/${match[1]}/?type=1`;
    }
  }

  if (filterByComment) {
    if (isBonfire) {
      const match = url.match(/bonfire\/(\d+)/);
      if (match) return `/api/shout/${match[1]}/`;
    }
    if (isPost) {
      const match = url.match(/posts\/(\d+.*?)(?:\/|$)/);
      if (match) return `/api/post/${match[1]}/`;
    }
  }

  return null;
};
