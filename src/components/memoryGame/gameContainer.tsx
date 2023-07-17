import {memo} from "react";
import styled from "styled-components";
import Image from 'next/image';

import {CardProps} from "@/types/cardType";

type Props = {
    allCard: CardProps[];
    isPause: boolean;
    cardClickHandler: (index: number) => void;
}

// eslint-disable-next-line react/display-name
export const GameContainer = memo<Props>(({ allCard, isPause, cardClickHandler }) => {
    return (
        <Container style={{ opacity: isPause ? "0.5" : "1" }}>
            {allCard.map((card, i) => (
                <Image
                    src={card.isTurned ? `/images/${card.imgPath}.png` : '/images/card_back.png'}
                    alt={""}
                    width={100}
                    height={100}
                    style={card.isMatched ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    key={card.imgPath}
                    onClick={() => cardClickHandler(i)}
                />
            ))}
        </Container>
    );
})

const Container = styled.div`
  > * {
    width: 7.5%;
    height: auto;
  }
`;
