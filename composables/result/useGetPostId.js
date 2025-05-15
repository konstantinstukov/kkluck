export const useGetPostId = async (postTitle) => {
	try {
		const response = await $fetch(`/api/post/${postTitle}/`);
		return response.id;
	} catch (error) {
		console.error("Fetch error:", error);
		return '';
	}
}
