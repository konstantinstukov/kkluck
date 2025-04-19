import type {FilterCriteria, Participant} from '~/types';

export class ParticipantService {
    filterParticipants(participants: Participant[], criteria: FilterCriteria): Participant[] {
        if (!Array.isArray(participants)) return [];

        const uniqueIds = new Set();
        return participants.filter(participant => {
            if (!participant?.user?.id) return false;

            if (criteria.filterBy === 'comment' && criteria.findByWord) {
                const searchWord = criteria.word?.toLowerCase() || '';
                const comment = participant.text?.toLowerCase() || '';

                if (searchWord && !comment.includes(searchWord)) {
                    return false;
                }
            }

            if (criteria.filterBy === 'comment' && criteria.hasImage && !participant.hasImage) {
                return false;
            }

            const userId = participant.user.id;
            if (!uniqueIds.has(userId)) {
                uniqueIds.add(userId);
                return true;
            }
            return false;
        });
    }
}