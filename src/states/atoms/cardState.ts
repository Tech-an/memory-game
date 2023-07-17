import { atom } from 'recoil';
import { CardProps } from "@/types/cardType";

const marks = ["hearts", "diamonds", "spades", "clubs"];
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];

let cards_ = []
for (let i = 0; i < marks.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        cards_.push({number: numbers[j], mark: marks[i], imgPath: `${numbers[j]}_of_${marks[i]}`, isTurned: false, isMatched: false})
    }
}

// TODO 最終的にほしい配列 (トランプの全部のデータ)
// [
//         {number: 1, mark: "hearts", imgPath: `1_of_hearts`, isTurned: false, isMatched: false},
//         {number: 2, mark: "diamonds", imgPath: `2_of_diamonds`, isTurned: false, isMatched: false},
//         ...
//         {number: 1, mark: "diamonds", imgPath: `1_of_diamonds`, isTurned: false, isMatched: false},
//         {number: 3, mark: "hearts", imgPath: `3_of_hearts`, isTurned: false, isMatched: false},
//         {number: 3, mark: "diamonds", imgPath: `3_of_diamonds`, isTurned: false, isMatched: false},
//         {number: 2, mark: "hearts", imgPath: `2_of_hearts`, isTurned: false, isMatched: false},
//         ...
// ]

const cards = marks.map(mark => numbers.map(number => {
    return {number, mark, imgPath: `${number}_of_${mark}`, isTurned: false, isMatched: false}
})).flat().sort(() => Math.random() - 0.5)


export const allCardState = atom<CardProps[]>({
    key: 'allCardState',
    default: cards,
});

export const clickedCardIndexState = atom<number>({
    key: 'clickedCardIndex',
    default: -1
})