// import { useState, useEffect } from "react";

// export default function IndexPage() {
//   const [cards, setCards] = useState([]); // カードの状態を管理する配列
//   const [firstCard, setFirstCard] = useState(null); // 最初にめくられたカード
//   const [count, setCount] = useState(0); // 経過秒数
//   const [mistakes, setMistakes] = useState(0); // 間違えた回数
//   const [paused, setPaused] = useState(true); // カウントが一時停止中かどうか

//   useEffect(() => {
//     // ゲームの初期化
//     initializeGame();
//   }, []);

//   useEffect(() => {
//     // カウントの更新
//     let timer;

//     if (!paused) {
//       timer = setInterval(() => {
//         setCount((prevCount) => prevCount + 1);
//       }, 1000);
//     }

//     return () => clearInterval(timer);
//   }, [paused]);

//   const initializeGame = () => {
//     // カードの初期化
//     const newCards = [];

//     for (let i = 1; i <= 52; i++) {
//       newCards.push({
//         id: i,
//         value: i,
//         matched: false,
//         opened: false,
//       });
//     }

//     shuffleCards(newCards);

//     setCards(newCards);
//   };

//   const shuffleCards = (cards) => {
//     // カードのシャッフル
//     for (let i = cards.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [cards[i], cards[j]] = [cards[j], cards[i]];
//     }
//   };

//   const openCard = (card) => {
//     // カードをめくる
//     if (paused || card.opened || card.matched) {
//       return;
//     }

//     if (firstCard === null) {
//       setFirstCard(card);
//     } else {
//       checkMatch(card);
//     }

//     const updatedCards = cards.map((c) => {
//       if (c.id === card.id) {
//         return { ...c, opened: true };
//       }
//       return c;
//     });

//     setCards(updatedCards);
//   };

//   const checkMatch = (secondCard) => {
//     // カードの一致をチェックする
//     if (firstCard.value === secondCard.value) {
//       // 一致した場合
//       const updatedCards = cards.map((c) => {
//         if (c.id === firstCard.id || c.id === secondCard.id) {
//           return { ...c, matched: true };
//         }
//         return c;
//       });

//       setCards(updatedCards);
//     } else {
//       // 一致しなかった場合
//       const updatedCards = cards.map((c) => {
//         if (c.id === firstCard.id || c.id === secondCard.id) {
//           return { ...c, opened: false };
//         }
//         return c;
//       });

//       setCards(updatedCards);
//       setMistakes((prevMistakes) => prevMistakes + 1);
//     }

//     setFirstCard(null);
//   };

//   const pauseCount = () => {
//     // カウントを一時停止する
//     if (!paused && firstCard === null) {
//       setPaused(true);
//     }
//   };

//   const resumeCount = () => {
//     // カウントを再開する
//     if (paused && firstCard === null) {
//       setPaused(false);
//     }
//   };

//   const restartGame = () => {
//     // ゲームを再スタートする
//     setCount(0);
//     setMistakes(0);
//     setPaused(true);
//     setFirstCard(null);
//     initializeGame();
//   };

//   const giveUp = () => {
//     // ゲームを諦める
//     if (window.confirm("ゲームを諦めてもよろしいですか？")) {
//       const updatedCards = cards.map((c) => ({ ...c, opened: true }));
//       setCards(updatedCards);
//     }
//   };

//   const renderCards = () => {
//     // カードの描画
//     return cards.map((card) => (
//       <div
//         key={card.id}
//         className={`card ${card.opened ? "opened" : ""} ${
//           card.matched ? "matched" : ""
//         }`}
//         onClick={() => openCard(card)}
//       >
//         <img src={`/images/card_${card.value}.png`} alt={`${card.value}`} />
//       </div>
//     ));
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <h1>神経衰弱</h1>
//         <div className="stats">
//           <p>経過秒数: {count}</p>
//           <p>間違えた回数: {mistakes}</p>
//         </div>
//       </div>
//       <div className="game-board">{renderCards()}</div>
//       <div className="controls">
//         <button onClick={pauseCount} disabled={paused || firstCard !== null}>
//           一時停止
//         </button>
//         <button onClick={resumeCount} disabled={!paused || firstCard !== null}>
//           再開
//         </button>
//         <button onClick={restartGame}>もう一度やる！</button>
//         <button onClick={giveUp}>諦める</button>
//       </div>
//     </div>
//   );
// }
