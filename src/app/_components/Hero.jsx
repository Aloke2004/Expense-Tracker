"use client";
import React from "react";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";
import Image from "next/image";

export function Hero() {
  return (
    (<div className="bg-gray-50 flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Manage your expenses with <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-blue-900">
                Expense Tracker
              </span>
            </h1>
          </>
        }>
        <Image
          src={`/dashboard.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>)
  );
}
