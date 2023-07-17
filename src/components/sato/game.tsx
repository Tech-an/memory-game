import {useState, useEffect} from "react";
import { useRecoilState } from 'recoil';
import {clickedCardsState} from "@/components/sato/CardState";

import Card from "@/components/sato/card";

const marks = ["hearts", "diamonds", "spades", "clubs"]; // カードのスートを配列で定義
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const cardData = marks.map(mark => numbers.map(number => {
    return {number, mark}
})).flat()

export default function Game() {
    const [matchNum, setMatchNum] = useState(0)
    const [unMatchNum, setUnMatchNum] = useState(0)
    const [clickedCards, setClickedCards] = useRecoilState(clickedCardsState);

    useEffect(() => {
        console.log(clickedCards.length >= 2)
        if (clickedCards.length == 2) {
            console.log(`result: ${clickedCards[0].number}/${clickedCards[1].number}/${clickedCards[0].number==clickedCards[1].number}`)
            setClickedCards([])
        }
    }, [clickedCards, setClickedCards])

    return (
        <>
            {
                cardData.map(data => {
                    return (
                        <div key={data.mark+data.number}
                             // onClick={}

                        >
                            Card(data)
                        </div>
                    )
                })
            }
        </>
    )
}