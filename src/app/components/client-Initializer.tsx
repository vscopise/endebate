"use client";

import { useEffect } from "react";
import { useAppStore } from "../store";

interface ClientInitializerProps {
  children: React.ReactNode;
}

export const ClientInitializer = ({ children }: ClientInitializerProps) => {
  const { loading, error, fetchData } = useAppStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;

  return <>{children}</>;
};
