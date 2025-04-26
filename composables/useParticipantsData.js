import {useFilterParticipants} from "~/composables/useFilterParticipants.js";

export const useParticipantsData = () => {
	const fetchParticipants = async (link, formData) => {
		if (formData.filterByLike && formData.filterByComment) {
			try {
				const [likePath, commentsPath] = await Promise.all([
					useGetDataPath(link, {...formData, filterByComment: false}),
					useGetDataPath(link, {...formData, filterByLike: false}),
				]);

				const [likesResponse, commentsResponse] = await Promise.all([
					$fetch(likePath),
					$fetch(commentsPath),
				]);

				const commentsUsersMap = new Map();
				useFilterParticipants(commentsResponse.comments, commentsUsersMap, formData);

				const uniqueParticipants = new Map();

				if (Array.isArray(likesResponse)) {
					likesResponse.forEach((participant) => {
						if (participant?.user?.id && commentsUsersMap.has(participant.user.id)) {
							uniqueParticipants.set(participant.user.id, participant);
						}
					});
				}

				return Array.from(uniqueParticipants.values());
			} catch (error) {
				console.error("Fetch error:", error);
				return [];
			}
		}

		const path = await useGetDataPath(link, formData);
		const response = await $fetch(path);

		if (formData.filterByLike) {
			return response || [];
		}

		if (formData.filterByComment) {
			const uniqueComments = new Map();
			useFilterParticipants(response.comments, uniqueComments, formData);
			return Array.from(uniqueComments.values());
		}

		return [];
	};

	return {
		fetchParticipants,
	};
};