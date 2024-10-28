
import { Link,useNavigate} from 'react-router-dom'
 import { useState } from 'react'

export default function SignIn() {

const [formData,setFormData] =  useState({})
const [loding,setLoding] = useState(false)
const [error,setError]=useState(null)
const navigate = useNavigate();


 const handleChange =(e)=>{


    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
    
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoding(true)
   const res = await fetch('/api/auth/signin',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData), 
   })

   const data = await res.json();
   
   if (res.ok === false) {
    setLoding(false);
    setError(data);
    return;
  }
  setLoding(false);
  setError(null);
  navigate('/');


   
    } catch (error) {
      setLoding(false);
      setError(error.message);
      
    }
  }

  
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-center text-3xl font-semibold">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        
        <input
          id="email"
          className="border p-3 rounded-lg "
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          id="password"
          className="border p-3 rounded-lg "
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          disabled={loding}
          className="bg-slate-700 text-white p-3 
     rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
        {loding ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>dont Have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}