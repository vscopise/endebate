"use client";

import { IoCloseOutline, IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { useAppStore } from "@/app/store";
import clsx from "clsx";
import Link from "next/link";

export const Sidebar = () => {
  const isSideMenuOpen = useAppStore((s) => s.isSideMenuOpen);
  const closeSideMenu = useAppStore((s) => s.closeSideMenu);

  return (
    <div>
      {isSideMenuOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
            onClick={() => closeSideMenu()}
          />
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z10 backdrop-filter backdrop-blur-sm" />
        </>
      )}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          { "translate-x-full": !isSideMenuOpen },
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => closeSideMenu()}
        />
        <div className="relative mt-4">
          <Link
            href="/"
            onClick={() => closeSideMenu()}
            className="flex items-center px-1 py-5 hover:bg-gray-100 rounded transition-all"
          >
            <IoHomeOutline size={30} />
            <span className="ml-3">Inicio</span>
          </Link>
          <Link
            href="/ajustes"
            onClick={() => closeSideMenu()}
            className="flex items-center px-1 py-5 hover:bg-gray-100 rounded transition-all"
          >
            <IoSettingsOutline size={30} />
            <span className="ml-3">Ajustes</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
