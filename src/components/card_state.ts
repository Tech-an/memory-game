import { atom } from 'recoil';
import { CardProps } from "@/components/card_type";

const marks = ["hearts", "diamonds", "spades", "clubs"];
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const cardData = marks.map(mark => numbers.map(number => {
    return {number, mark, imgPath: `${number}_of_${mark}`, isTurned: false, isMatched: false}
})).flat().sort(() => Math.random() - 0.5).map((data, index) => {
    return {...data, index}
})

export const allCardState = atom<CardProps[]>({
    key: 'allCardState',
    default: cardData,
});

export const clickedCardIndexState = atom<number>({
    key: 'clickedCardIndex',
    default: -1
})