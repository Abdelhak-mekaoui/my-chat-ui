"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginButton() {
  return (
    <>
      <button
        onClick={async () => {
          await signIn();
        }}
        className="btn"
      >
        Sign in
        <FaGoogle className="h-5 w-5" />
      </button>
    </>
  );
}
