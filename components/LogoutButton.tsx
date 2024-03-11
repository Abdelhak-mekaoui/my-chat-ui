'use client'
import { signOut } from "next-auth/react"


export default function LoginButton() {
  return (
    <>
        <button onClick={ async () => {
            await signOut();
        }}
        >
            Logout
        </button>
    </>
  )
}
