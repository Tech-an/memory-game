import { useRecoilState } from 'recoil';
import { allCardState, clickedCardIndexState } from '@/components/sato2/card_state';
import {CardProps} from "@/components/sato2/card_type";


export const ClickHandler = (i: number) => {
    const [allCard, setAllCard] = useRecoilState(allCardState);
    const [clickedCardIndex, setClickedCardIndex] = useRecoilState(clickedCardIndexState);
    const updateAllCardState = (changedCards: CardProps[], cardIndies: number[]) => {
        setAllCard(cardIndies.map(i => allCard[i] = changedCards[i]))
    }
    const turn = (card: CardProps) => {
        card.isTurned = !card.isTurned
        updateAllCardState([card], [i])
    }

    /**
     * メインの処理
     */
    const card = allCard[i]
    turn(card)
    console.log(clickedCardIndex)

    if (clickedCardIndex == -1) {
        setClickedCardIndex(i)
    } else {
        setClickedCardIndex(-1)
    }


}

