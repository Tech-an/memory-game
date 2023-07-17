import { atom } from 'recoil';
import { CardProps } from "@/types/cardType";

const marks = ["hearts", "diamonds", "spades", "clubs"];
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const cards = marks.map(mark => numbers.map(number => {
    return {number, mark, imgPath: `${number}_of_${mark}`, isTurned: false, isMatched: false}
})).flat().map((data, index) => {
    return {...data, index}
})
// const cards = marks.map(mark => numbers.map(number => {
//     return {number, mark, imgPath: `${number}_of_${mark}`, isTurned: false, isMatched: false}
// })).flat().sort(() => Math.random() - 0.5).map((data, index) => {
//     return {...data, index}
// })


export const allCardState = atom<CardProps[]>({
    key: 'allCardState',
    default: cards,
});

export const clickedCardIndexState = atom<number>({
    key: 'clickedCardIndex',
    default: -1
})