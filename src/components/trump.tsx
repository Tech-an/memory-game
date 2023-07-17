"use client";
import styled from "styled-components";
import Image from "next/image";
import React, { useState } from "react";

export default function Trump() {
  const [imageSrc, setImageSrc] = useState("/images/card_back.png");
  // 1. useStateフックを使って状態変数imageSrcを定義し、初期値を"/img/card_back.png"に設定する
  // 3. 画像がクリックされたときに実行される関数handleClickを定義する
  const handleClick = () => {
    // 3.1 setImageSrc関数を呼び出してimageSrcの値を"/img/another_image.png"に変更する
    setImageSrc("/images/joker_1.png");
  };

  return (
    <TrumpContainer>
      <Image
        src={imageSrc}
        alt="ジョーカー"
        width={409}
        height={600}
        onClick={handleClick} // 4.2. クリックイベントを処理する関数handleClickを指定する
        style={{ cursor: "pointer" }} // 4.3. カーソルのスタイルを変更する
      />
    </TrumpContainer>
  );
}

const TrumpContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
