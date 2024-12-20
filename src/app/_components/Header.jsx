'use client';

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-8 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="pl-2 text-blue-900 font-bold text-2xl">ExpenseTracker</span>
      </div>

      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline" className="rounded-full font-bold text-lg">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
            <Link href={"/dashboard"}>
                <Button variant="outline" className="rounded-full font-bold text-lg">Dashboard</Button>
            </Link>
            <Link href={"/sign-in"}>
                <Button className="rounded-full font-bold text-lg">Get Started</Button>
            </Link>
        </div>
      )}
    </div>
  )
}

export default Header;

