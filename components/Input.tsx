'use client'

export default function Input() {
  return (
    <div className="py-4 flex flex-row items-center justify-around gap-2 ">
        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
        <button className="btn btn-info">Send</button>

    </div>
  )
}
