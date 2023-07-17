'use client'

import { useState } from "react";
import { useRecoilState } from 'recoil';
import {allCardState, clickedCardIndexState} from '@/components/card_state';
import styled from "styled-components";
import Image from 'next/image';
import {CardProps} from "@/components/card_type";


export default function TrumpGame() {
    const [allCard, setAllCard] = useRecoilState(allCardState);
    const [clickedCardIndex, setClickedCardIndex] = useRecoilState(clickedCardIndexState);
    const [correctNum, setCorrectNum] = useState(0)
    const [wrongNum, setWrongNum] = useState(0)
    const [result, setResult] = useState<boolean | null>(null)
    const [time, setGameTime] = useState(0)
    const [isGiveUp, setGiveUp] = useState(false)
    const [isPause, setPause] = useState(false)
    const [isStart, setStart] = useState(false)
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
        setTimeout(()=>match(i), 500)
        setCorrectNum(prev => prev+1)
        setResult(true)
    }

    const wrong = (i: number) => {
        setTimeout(()=>turn(i, false), 500)
        setWrongNum(prev => prev+1)
        setResult(false)
    }

    const reset = () => {
        setClickedCardIndex(-1)
        setResult(null)
    }

    const startTimer = () => {
        setTimer(setInterval(() => {
            setGameTime(prevCount => prevCount + 1);
        }, 1000));
    };

    const stopTimer = () => {
        clearInterval(timer);
        // setTimer(null);
    };

    const clickHandler = (i: number) => {
        if (!isStart) {
            setStart(true)
            startTimer()
        }
        if (hasOpen(i) || isPause) return
        turn(i, true)
        if (clickedCardIndex == -1) {
            setClickedCardIndex(i)
        } else {
            if (compareCards(i)) {
                correct(i)
            } else {
                wrong(i)
            }
            setTimeout(()=>reset(), 500)
        }
    }

    const pause = () => {
        setPause(true)
        stopTimer()
    }

    const restart = () => {
        setPause(false)
        startTimer()
    }

    const giveUp = () => {
        setGiveUp(confirm("諦めてよろしいですか？"))
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

    const isEnd = () => correctNum == 26 || isGiveUp

    const end = (isEnd: boolean) => {
        if (!isEnd) return null
        stopTimer()
        return <GameEnd>{isGiveUp ? <p>またチェレンジしてくださいね！</p> : (
            <div>
                <p>クリアです。おめでとうございます！</p>
                <p>クリアタイム{time}秒</p>
                <br/>
                <p>間違えた回数は{wrongNum}回です</p>
                <p>{wrongNum < 30 ? "素晴らしい！" : "次は頑張りましょう！"}</p>
            </div>
        )}
            <br/>
            <a href='/'>もう一度やる！</a>
        </GameEnd>
    }


    return (
        <Container>
            {end(isEnd())}
            <GameContainer style={{opacity: isPause ? "0.5" : "1"}}>
                {allCard.map((card, i) => (
                    <Image
                        src={card.isTurned ? `/images/${card.imgPath}.png` : '/images/card_back.png'}
                        alt={""}
                        width={100}
                        height={100}
                        style={card.isMatched ? { visibility: 'hidden' } : { visibility: 'visible' }}
                        key={card.imgPath}
                        onClick={() => clickHandler(i)}
                    />
                ))}
            </GameContainer>
            <GameController>
                <PauseButton onClick={() => isPause ? restart() : pause()}>{isPause ? "再開" : "一時停止"}</PauseButton>
                <RetireButton onClick={() => giveUp()}>諦める</RetireButton>
                <div>{Result(result)}</div>
                <div>{GameTime(time)}</div>
            </GameController>
        </Container>
    );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
`

const GameContainer = styled.div`
  > * {
    width: 7.5%;
    height: auto;
  }
`

const GameController = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  > * {
    width: 25%;
    padding: 15px;
    text-align: center;
    font-size: 25px;
  }
`

const PauseButton = styled.button`
  background-color: black;
  color: white;
  border: none;
`

const RetireButton = styled.button`
  background-color: #dcdcdc;
  color: black;
  border: none;
`

const Result = (result: null | boolean) => {
    if (result == null) return
    return result ? <CorrectResult>あたり</CorrectResult> : <WrongResult>はずれ</WrongResult>
}

const CorrectResult = styled.div`
  color: red;
`

const WrongResult = styled.div`
  color: blue;
`

const GameTime = (time: number) => {
    return time ? <div>{time}秒経過</div> : null
}

const GameEnd = styled.div`
  position: absolute;
  width: 30%;
  background-color: #33ccff;
  padding: 20px;
  left: 50%;
  transform: translate(-50%, 100%);
`