// card_state.ts

import { atom } from 'recoil';

type CardProps = {
    number: number;
    mark: string;
};

export const clickedCardsState = atom<CardProps[]>({
    key: 'clickedCardsState',
    default: [],
});

