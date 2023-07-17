"use client";
import { RecoilRoot } from "recoil";
import './globals.css'
import React from "react";
import StyledComponentsRegistry from "@/libs/registry";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <html lang="ja">
          <head>
              <meta name="robots" content="noindex"/>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <title>神経衰弱</title>
          </head>
          <StyledComponentsRegistry>
              <body>{children}</body>
          </StyledComponentsRegistry>
      </html>
    </RecoilRoot>
  )
}
