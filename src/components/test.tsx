"use client";
import Image from "next/image";
import styled from "styled-components";
import React, { useState } from "react";
import Home_text from "./hometext";

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

export default function Test() {
  // const [imageSrc, setImageSrc] = useState("/images/card_back.png");
  // // 1. useStateフックを使って状態変数imageSrcを定義し、初期値を"/img/card_back.png"に設定する
  // // 3. 画像がクリックされたときに実行される関数handleClickを定義する
  // const handleClick = () => {
  //   // 3.1 setImageSrc関数を呼び出してimageSrcの値を"/img/another_image.png"に変更する
  //   setImageSrc("/images/joker_1.png");
  // };

  return (
    <TrumpContainer>
      {suits.map((suit) => (
        <div key={suit}>
          {values.map((value) => (
            <Image
              key={`${value}_of_${suit}`}
              src={`/images/${value}_of_${suit}.png`}
              alt={`${value}_of_${suit}`}
              width={114}
              height={178}
              style={{ cursor: "pointer" }}
              // onClick={handleClick} // 4.2. クリックイベントを処理する関数handleClickを指定する
            />
          ))}
        </div>
      ))}
      <div>
        {/* <TextContainer> */}
        <Home_text />
        {/* </TextContainer> */}
      </div>
    </TrumpContainer>
  );
}

// const TextContainer = styled.div`
//   display: flex;
// `;

const TrumpContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1200;
`;
