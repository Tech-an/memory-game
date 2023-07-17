"use client";
import styled from "styled-components";

export default function Home_text() {
  return (
    <>
      <Btn>
        <button>一時停止</button>
        <button>諦める</button>
      </Btn>
    </>
  );
}

const Btn = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: end;
`;
