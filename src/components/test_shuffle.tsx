import {useEffect, useState} from "react";
import Image from "next/image";
import styled from "styled-components";
import Home_text from "./hometext";
import cardBackImage from "../../public/images/card_back.png";
const suits = ["hearts", "diamonds", "spades", "clubs"]; // カードのスートを配列で定義
const values = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
]; // カードの数字を配列で定義

type positions_type = { suit: string; value: string; isFlipped: boolean }[]
type position_type = { suit: string; value: string; isFlipped: boolean }

const Test_shuffle = () => {
  const [cardPositions, setCardPositions] = useState<
    { suit: string; value: string; isFlipped: boolean }[]
  >([]); // カードの位置情報を管理するステート変数を定義

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  ); // 選択されたカードのインデックスを管理するステート変数を定義

  useEffect(() => {
    setCardPositions(generateShuffledPositions(generateDefaultPositions()));
  }, []);

  const generateDefaultPositions = () => {
    /**
     * TODO 定数 suits と 定数 values の総組み合わせの配列を作成するだけの関数
     */
    const positions:positions_type = []
    suits.forEach(suit => values.forEach(value => {
      positions.push(
          {
            suit: suit,
            value: value,
            isFlipped: true
          })
      })
    )
    return positions
  }

  const generateShuffledPositions = (positions: positions_type) => positions.sort(() => Math.random() - 0.5)


  const [firstCardIndex, setFirstCardIndex] = useState<number | null>(null)

  const hasFirstCard = () => {
    return firstCardIndex !== null
  }

  const flipCard = (cardIndex: number | null)=> {
    if (cardIndex == null) return
    cardPositions[cardIndex].isFlipped = !cardPositions[cardIndex].isFlipped
    setCardPositions(cardPositions)
  }

  const compareCards = (index: number) => {
    if (firstCardIndex == null || index == null) return
    return cardPositions[firstCardIndex].value === cardPositions[index].value
  }

  const matchCards = () => {

  }

  const unMatchCards = () => {

  }

  const resetCards = () => {
      setFirstCardIndex(null)
  }

  const handleClick = (index: number) => {
    flipCard(index)
    if (hasFirstCard()) {
      console.log(compareCards(index))
      if (compareCards(index)) {
      //   一致した時の処理
        //   非表示にする
        //   正解した回数を覚える
      } else {
        setTimeout(() => {
          //   間違えた回数を覚える
          flipCard(firstCardIndex)
          flipCard(index)
        }, 100)
      }
      resetCards()
    } else {
      setFirstCardIndex(index)
    }
  };

  const cards = cardPositions.map((card, index) => (
    <Image
      key={`${card.value}_of_${card.suit}`}
      src={
        card.isFlipped
          ? cardBackImage
          : `/images/${card.value}_of_${card.suit}.png`
      }
      alt={`${card.value}_of_${card.suit}`}
      width={90}
      height={140}
      style={{
        cursor: "pointer",
        position: "absolute",
        top: `${Math.floor(index / 13) * 178}px`,
        left: `${(index % 13) * 114}px`,
      }}
      onClick={() => handleClick(index)}
    />
  )); // カードの要素を生成

  return (
    <Container>
      {cards}
      <div>
        <Home_text />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
`;

export default Test_shuffle; // Test_shuffleコンポーネントをエクスポート
