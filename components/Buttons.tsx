"use client";
import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push("/chat")}
        className="btn bg-blue-500 border rounded-lg text-white font-bold"
      >
        Start chatting
      </button>
    </>
  );
}
