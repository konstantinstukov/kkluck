export const useGetDataPath = (url, formData) => {
  const isBonfire = url.includes("bonfire/");
  const isPost = url.includes("posts/");
  const isApiPost = url.includes("/api/v1/post/");
  const filter = formData.filterBy;

  if (filter === "like") {
    if (isBonfire) {
      const match = url.match(/bonfire\/(\d+)/);
      if (match) return `/api/like/${match[1]}/?type=3`;
    }
    if (isPost) {
      const match = url.match(/posts\/(\d+)-/);
      if (match) return `/api/like/${match[1]}/?type=1`;
    }
  }

  if (filter === "comment") {
    if (isBonfire) {
      const match = url.match(/bonfire\/(\d+)/);
      if (match) return `/api/shout/${match[1]}/`;
    }
    if (isPost) {
      const match = url.match(/posts\/(\d+.*?)(?:\/|$)/);
      if (match) return `/api/post/${match[1]}/`;
    }
    if (isApiPost) {
      return url;
    }
  }

  return null;
};
