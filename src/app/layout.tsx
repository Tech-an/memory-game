"use client";
import { RecoilRoot } from "recoil";
import './globals.css'
import { Inter } from 'next/font/google'
import React from "react";
import StyledComponentsRegistry from "@/libs/registry";
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <html lang="en">
          <StyledComponentsRegistry>
              <body className={inter.className}>{children}</body>
          </StyledComponentsRegistry>
      </html>
    </RecoilRoot>
  )
}
