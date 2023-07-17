import {memo} from "react";
import styled from "styled-components";
import Image from 'next/image';

import {CardProps} from "@/types/cardType";

type Props = {
    allCard: CardProps[];
    // TODO 以下9-16行目は8行目と一緒
    // allCard: [{
    //     number: number;
    //     mark: string;
    //     imgPath: string;
    //     isTurned: boolean;
    //     isMatched: boolean;
    // }];
    isPause: boolean;
    cardClickHandler: (index: number) => void;
}

// eslint-disable-next-line react/display-name
export const GameContainer = memo<Props>(({ allCard, isPause, cardClickHandler }) => {
    // TODO 31行目の三項演算子と一緒
    // let opacityyyyy = ""
    // if (isPause) {
    //     opacityyyyy = "1"
    // } else {
    //     opacityyyyy = "0.5"
    // }

    // TODO (参考)疑問文の変数名について
    // you are mitsugu.
    // are you mitsugu ? > yes(1), no(0) (boolean)
    //
    // is turned trump ?
    // > isTurned

    return (
        <Container style={{ opacity: isPause ? "0.5" : "1.0" }}>
        {/*<Container style={{ opacity: opacityyyyy }}>*/}
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
