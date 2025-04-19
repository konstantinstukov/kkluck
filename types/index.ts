export interface User {
    id: number;
    username: string;
    avatar: {
        small: string;
    };
}

export interface Participant {
    user: User;
    text?: string;
    hasImage?: boolean;
}

export interface FilterCriteria {
    filterBy: 'like' | 'comment';
    findByWord: boolean;
    word?: string;
    hasImage?: boolean;
}

export interface WinnerOptions {
    winnersCount: number;
}