"use client";

import { useEffect } from "react";
import { useAppStore } from "@/app/store";

interface ClientInitializerProps {
  children: React.ReactNode;
}

export const ClientInitializer = ({ children }: ClientInitializerProps) => {
  const { loading, error, fetchData } = useAppStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center">Cargando...</p>{" "}
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center">Error: {error}</p>
      </div>
    );

  return <>{children}</>;
};
