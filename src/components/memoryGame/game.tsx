import {useState} from "react";
import {useRecoilState} from 'recoil';
import styled from "styled-components";

import {CardProps} from "@/types/cardType";
import {allCardState, clickedCardIndexState} from '@/states/atoms/cardState';
import {useGameState} from "@/states/hooks/gameState";
import {GameContainer} from "@/components/memoryGame/gameContainer";
import {GameController} from "@/components/memoryGame/gameController";
import {GameEnd} from "@/components/memoryGame/gameEnd";


export const MemoryGame = () => {
    const [allCard, setAllCard] = useRecoilState(allCardState);
    const [clickedCardIndex, setClickedCardIndex] = useRecoilState(clickedCardIndexState);
    const [gameState, setGameState] = useGameState()
    const [time, setTime] = useState(0)
    const [timer, setTimer] = useState<NodeJS.Timer>()

    const card = (i: number) => Object.assign({}, allCard[i])
    const cards = () => allCard.concat()

    const update = (changedCard: CardProps | CardProps[] , index: number | number[]) => {
        const cardIndies = Array.isArray(index) ? index : [index]
        const changedCards = Array.isArray(changedCard) ? changedCard : [changedCard]
        const updatingCards = cards()
        cardIndies.forEach((cardIndex, loopIndex) => updatingCards[cardIndex] = changedCards[loopIndex])
        setAllCard(updatingCards)
    }

    const turn = (index: number, isOpen: boolean) => {
        const cardIndies = isOpen ? [index] : [index, clickedCardIndex]
        cardIndies.forEach(i => {
            const clickedCard = card(i)
            clickedCard.isTurned = isOpen
            update(clickedCard, i)
        })
    }

    const match = (i: number) => {
        const indies = [clickedCardIndex, i]
        const changedCards = indies.map(i => {
            const selectedCard = card(i)
            selectedCard.isMatched = true
            return selectedCard
        })
        update(changedCards, indies)
    }

    const hasOpen = (i: number) => card(i).isTurned

    const compareCards = (i: number) => card(i).number == card(clickedCardIndex).number

    const correct = (i: number) => {
        setGameState({
            correctNum: gameState.correctNum + 1,
            result: true
        })
        setTimeout(()=>match(i), 500)
    }

    const wrong = (i: number) => {
        setGameState({
            wrongNum: gameState.wrongNum + 1,
            result: false
        })
        setTimeout(()=>turn(i, false), 500)
    }

    const reset = () => {
        setClickedCardIndex(-1)
        setGameState({result: null})
    }

    const startTimer = () => setTimer(setInterval(() => {setTime(prevState => prevState + 1)}, 1000));

    const stopTimer = () => clearInterval(timer);

    const clickHandler = async (i: number) => {
        if (!gameState.isStart) start()
        if (hasOpen(i) || gameState.isPause) return
        turn(i, true)
        if (clickedCardIndex == -1) {
            setClickedCardIndex(i)
        } else {
            if (compareCards(i)) {
                correct(i)
            } else {
                wrong(i)
            }
            setTimeout(() => reset(), 500)
        }
    }

    const start = () => {
        if (!gameState.isStart) {
            setGameState({isStart: true})
            startTimer()
        }
    }

    const pause = () => {
        setGameState({isPause: true})
        stopTimer()
    }

    const resume = () => {
        setGameState({isPause: false})
        startTimer()
    }

    const giveUp = () => {
        setGameState({isGiveUp: confirm("諦めてよろしいですか？")})
        allOpen()
    }

    const allOpen = () => {
        const indies: number[] = []
        const changedCards = cards().map((_, i) => {
            const card_ = card(i)
            card_.isTurned = true
            indies.push(i)
            return card_
        })
        update(changedCards, indies)
    }

    const isEnd = () => gameState.correctNum == 26 || gameState.isGiveUp

    return (
        <Container>
            <GameEnd isEnd={isEnd()} isGiveUp={gameState.isGiveUp} time={time} wrongNum={gameState.wrongNum} stopTimer={stopTimer}/>
            <GameContainer allCard={allCard} isPause={gameState.isPause} cardClickHandler={clickHandler} />
            <GameController isPause={gameState.isPause} resume={resume} pause={pause} giveUp={giveUp} result={gameState.result} time={time} />
        </Container>
    );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
`
