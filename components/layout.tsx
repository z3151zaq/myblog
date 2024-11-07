import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const name = "熊熊熊熊熊🐻";
export const siteTitle = "熊熊熊熊熊🐻";

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  return (
    <div className="ml-auto mr-auto max-w-2xl">
      <Head>
        <link rel='icon' href='/images/avatar.png' />
        <meta name='description' content="XNY's personal website using Next.js" />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <header>
        {home ? (
          <>
            <Image priority src='/images/avatar.png' height={144} width={144} alt={name} className="m-auto"/>
            <h1 className="text-3xl font-bold text-center">{name}</h1>
          </>
        ) : (
          <>
            <Link href='/'>
              <Image priority src='/images/avatar.png' height={108} width={108} alt={name} />
            </Link>
            <h2>
              <Link href='/'>{name}</Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href='/'>← Back to home</Link>
        </div>
      )}
    </div>
  );
}
