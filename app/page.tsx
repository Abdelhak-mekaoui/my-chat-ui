
import LoginButton from '@/components/LoginButton'
import { authOption } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOption)
  if (session) {
    return(
      <div className="hero min-h-screen bg-base-200 my-2 rounded-lg">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello <span className="text-bold text-blue-500">{session?.user?.name}</span></h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn bg-blue-500" >Start chatting</button>
    </div>
  </div>
</div>
      
    )
  }
  return (
    <div className="hero min-h-screen bg-base-200 my-2 rounded-lg">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">Welcom to our Chat platform.</p>
      <button className="btn btn-primary">Get Started</button>
      <LoginButton/>
    </div>
  </div>
</div>
  )
}
