import Image from 'next/image';
import {useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import {clickedCardsState} from "@/components/sato/CardState";

type CardProps = {
    number: number;
    mark: string;
};

export default function Card({ number, mark}: CardProps) {
    const [turned, setTurned] = useState(false);
    const [isMatch, setIsMatch] = useState(false);
    const [clickedCards, setClickedCards] = useRecoilState(clickedCardsState);

    const uniquePath = `${number}_of_${mark}`;
    const imgPath = turned ? `/images/${uniquePath}.png` : '/images/card_back.png';
    const visibleStyle = isMatch ? 'visible' : 'hidden';

    const clickCard = () => {
        setTurned(true);
        // setClickedCards(prev => [...prev, {number, mark}])
        // console.log(clickedCards)
    };

    useEffect(() => {
        
    }, [turned, isMatch])

    return (
        <Image
            src={imgPath}
            alt={mark}
            width={100}
            height={100}
            style={{ visibility: visibleStyle }}
            // key={uniquePath}
            onClick={clickCard}
        />
    );
};
