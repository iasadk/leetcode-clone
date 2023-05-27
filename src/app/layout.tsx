"use client"
import "./globals.css";
import { RecoilRoot } from "recoil";
export const metadata = {
  title: "Leetcode | Clone",
  description:
    "LeetCode is the world's leading online programming learning platform to help millions of developers enhance their skills, expand their knowledge and land their dream job",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        </head>
        <body>{children}</body>
      </html>
    </RecoilRoot>
  );
}
