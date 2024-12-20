import React, {useEffect} from "react";
import Image from "next/image";
import {
    LayoutGrid,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const {user} = useUser(); 
    const menuList = [
      {
        id: 1,
        name: "Dashboard",
        icon: LayoutGrid,
        path: "/dashboard",
      },
      {
        id: 2,
        name: "Budgets",
        icon: PiggyBank,
        path: "/dashboard/budgets",
      },
      {
        id: 3,
        name: "Expenses",
        icon: ReceiptText,
        path: "/dashboard/expenses",
      },
      // {
      //   id: 4,
      //   name: "Upgrade",
      //   icon: ShieldCheck,
      //   path: "/dashboard/upgrade",
      // },
    ];
    const path = usePathname();
  
    useEffect(() => {
      console.log(path);
    }, [path]);

    return (
        <div className="h-screen p-5 border shadow-sm">
            <div className="flex flex-row items-center">
                <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
                <span className="text-blue-800 font-bold text-xl">ExpenseTracker</span>
            </div>
            <div className="mt-5">
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                        <h2
                            className={`flex gap-2 items-center
                                text-gray-500 font-medium
                                mb-2
                                p-4 cursor-pointer rounded-full
                                hover:text-primary hover:bg-blue-100
                                ${path == menu.path && "text-primary bg-blue-100"}
                            `}
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className="fixed bottom-10 p-5 flex gap-2 items-center">
                <UserButton />
                {user?.fullName}
            </div>
        </div>
    );
}

export default SideNav;