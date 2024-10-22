import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className=" p-3 max-w-lg mx-auto">
     <h1 className="my-7 text-center text-3xl font-semibold">Sign Up</h1>

     <form className="flex flex-col gap-4 ">

     <input className="border p-3 rounded-lg " placeholder="Username"/>
     <input className="border p-3 rounded-lg " placeholder="Email"/>
     <input className="border p-3 rounded-lg " placeholder="Password"/>

     <button className="bg-slate-700 text-white p-3 
     rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
      Sign Up
     </button>
     </form>

     <div className='flex gap-2 mt-5'>
<p>Have an account?</p>
<Link to={'/sign-in'}>
<span className='text-blue-700'>Sign in</span>
</Link>
     </div>
    </div>
  )
}
