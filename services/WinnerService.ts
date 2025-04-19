import type {Participant, WinnerOptions} from '~/types';

export class WinnerService {
    selectWinners(participants: Participant[], options: WinnerOptions): Set<Participant> {
        const winners = new Set<Participant>();
        if (!participants.length) return winners;

        const availableParticipants = [...participants];
        const winnersCount = Math.min(options.winnersCount, participants.length);

        for (let i = 0; i < winnersCount; i++) {
            const randomIndex = Math.floor(Math.random() * availableParticipants.length);
            const winner = availableParticipants.splice(randomIndex, 1)[0];
            winners.add(winner);
        }

        return winners;
    }

    validateWinnersCount(count: number, availableParticipants: number): string | null {
        if (count > availableParticipants) {
            return `Максимальное доступное количество победителей: ${availableParticipants}`;
        }
        return null;
    }
}