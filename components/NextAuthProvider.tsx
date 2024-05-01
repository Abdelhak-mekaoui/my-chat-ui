"use client";
import React from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type NextAuthProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

const NextAuthProvider: React.FC<NextAuthProviderProps> = ({
  session,
  children,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
