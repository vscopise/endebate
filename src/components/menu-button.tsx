"use client";
import { useAppStore } from "@/app/store";

import { IoMenuOutline } from "react-icons/io5";

export const MenuButton = () => {
  const openSideMenu = useAppStore((s) => s.openSideMenu);
  return (
    <button
      className="fixed right-0 text-4xl m-2  rounded-md transition-all hover:bg-gray-100 cursor-pointer"
      onClick={() => openSideMenu()}
    >
      <IoMenuOutline />
    </button>
  );
};
