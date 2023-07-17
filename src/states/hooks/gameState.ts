import {useState} from "react";

type GameState = {
    correctNum: number;
    wrongNum: number;
    result: boolean | null;
    isGiveUp: boolean;
    isPause: boolean;
    isStart: boolean;
};

const initialGameState: GameState = {
    correctNum: 0,
    wrongNum: 0,
    result: null,
    isGiveUp: false,
    isPause: false,
    isStart: false,
};

export const useGameState = (): [GameState, (newState: Partial<GameState>) => void] => {
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const updateGameState = (newState: Partial<GameState>) => {
        setGameState((prevState) => ({ ...prevState, ...newState }));
    };
    return [gameState, updateGameState];
};


