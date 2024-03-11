'use client'
import { signIn } from "next-auth/react"


export default function LoginButton() {
  return (
    <>
        <button onClick={ async () => {
            await signIn();
        }}
            className="btn"
        >
            Login
        </button>
    </>
  )
}
