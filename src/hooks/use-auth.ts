"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function useAuth(requiredRole?: 'admin') {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated" && 
               requiredRole === 'admin' && 
               session.user.role !== 'admin') {
      router.push("/unauthorized");
    }
  }, [status, router, requiredRole, session]);

  return {
    isAuthenticated: status === "authenticated",
    isAdmin: session?.user.role === 'admin',
    isLoading: status === "loading",
    session
  };
}