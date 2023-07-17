import {memo} from "react";
import styled from "styled-components";

type Props = {
    isPause: boolean;
    resume: () => void;
    pause: () => void;
    giveUp: () => void;
    result: boolean | null;
    time: number;
}

export function GameController({ isPause, resume, pause, giveUp, result, time }: Props) {
    // if (mario || ruizi) {
    //     console.log("任天堂かも？")
    // }

    return (
        <Container>
            <PauseButton onClick={() => (isPause ? resume() : pause())}>
                {isPause ? "再開" : "一時停止"}
            </PauseButton>
            <RetireButton onClick={giveUp}>
                諦める
            </RetireButton>
            <div>
                {result !== null && (result ? <Correct>あたり</Correct> : <Wrong>はずれ</Wrong>)}
            </div>
            <div>
                {time > 0 && `${time}秒経過`}
            </div>
        </Container>
    );
}

// TODO memo化しているだけ、上記13-34行目とほぼ一緒
// eslint-disable-next-line react/display-name
// export const GameController = memo<Props>(({ isPause, resume, pause, giveUp, result, time }) => {
//     return (
//         <Container>
//             <PauseButton onClick={() => (isPause ? resume() : pause())}>{isPause ? "再開" : "一時停止"}</PauseButton>
//             <RetireButton onClick={giveUp}>諦める</RetireButton>
//             <div>{result !== null && (result ? <Correct>あたり</Correct> : <Wrong>はずれ</Wrong>)}</div>
//             <div>{time > 0 && `${time}秒経過`}</div>
//         </Container>
//     );
// })

const Container = styled.div`
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
`;

const PauseButton = styled.button`
  background-color: black;
  color: white;
  border: none;
`;

const RetireButton = styled.button`
  background-color: #dcdcdc;
  color: black;
  border: none;
`;

const Correct = styled.div`
  color: red;
`;

const Wrong = styled.div`
  color: blue;
`;
