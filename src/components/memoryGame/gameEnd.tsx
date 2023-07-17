import {memo} from "react";
import styled from "styled-components";

type Props = {
    isEnd: boolean,
    isGiveUp: boolean,
    time: number,
    wrongNum: number
    stopTimer: ()=>void
}

// eslint-disable-next-line react/display-name
export const GameEnd = memo<Props>(({ isEnd, isGiveUp, time, wrongNum, stopTimer }) => {
    if (!isEnd) return null;
    stopTimer()
    return (
        <Container>
            {isGiveUp ? (
                <p>またチェレンジしてくださいね！</p>
            ) : (
                <div>
                    <p>クリアです。おめでとうございます！</p>
                    <p>クリアタイム{time}秒</p>
                    <br />
                    <p>間違えた回数は{wrongNum}回です</p>
                    <p>{wrongNum < 30 ? "素晴らしい！" : "次は頑張りましょう！"}</p>
                </div>
            )}
            <br />
            <a href='/'>もう一度やる！</a>
        </Container>
    );
})

const Container = styled.div`
  position: absolute;
  width: 30%;
  background-color: #33ccff;
  padding: 20px;
  left: 50%;
  transform: translate(-50%, 100%);
`
