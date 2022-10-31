import Head from "next/head";
import Image from "next/image";
import { signIn } from "next-auth/react";

function Hero() {
  return (
    <section className="relative ">
      <Head>
        <title>Log in | Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)] mx-auto overflow-y-hidden">
        <img
          src="/images/hero-background.jpg"
          layout="fill"
          className="object-cover"  
          alt="/"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            className="object-contain"
            alt="/"
          />
          <button
            onClick={signIn}
            className="bg-blue-600 uppercase text-xl tracking-wide font-extrabold py-4 px-6 w-full rounded hover:bg-[#0485ee]"
          >
            Get all there
          </button>
          <p className="text-xs text-center ">
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 10/30/22, the price of Disney+
            and The Disney Bundle will increase by $5
          </p>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            className="object-contain"
            alt="/"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
