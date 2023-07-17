import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import Home_text from "./hometext";
import cardBackImage from "../../public/images/card_back.png";

const suits = ["hearts", "diamonds", "spades", "clubs"];
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
];

const Test_shuffle = () => {
  const [cardPositions, setCardPositions] = useState<
    { suit: string; value: string; isFlipped: boolean }[]
  >([]);

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const shuffledPositions = generateShuffledPositions();
    setCardPositions(shuffledPositions);
  }, []);

  const generateShuffledPositions = () => {
    const positions = [];

    for (let i = 0; i < suits.length * values.length; i++) {
      const randomIndex = Math.floor(
        Math.random() * (suits.length * values.length)
      );
      const cardPosition = {
        suit: suits[Math.floor(randomIndex / values.length)],
        value: values[randomIndex % values.length],
        isFlipped: true,
      };
      positions.push(cardPosition);
    }

    return positions;
  };

  const handleClick = (index: number) => {
    const clickedCard = cardPositions[index];

    if (clickedCard.isFlipped) {
      if (selectedCardIndex === null) {
        setSelectedCardIndex(index);
      } else {
        const firstCard = cardPositions[selectedCardIndex];

        if (firstCard.value === clickedCard.value) {
          const updatedCardPositions = cardPositions.map((card, i) =>
            i === selectedCardIndex || i === index ? { ...card, isFlipped: false } : card
          );

          setCardPositions(updatedCardPositions);
        } else {
          const updatedCardPositions = cardPositions.map((card, i) =>
            i === selectedCardIndex || i === index ? { ...card, isFlipped: true } : card
          );

          setCardPositions(updatedCardPositions);
        }

        setSelectedCardIndex(null);
      }
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
  ));

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

export default Test_shuffle;
