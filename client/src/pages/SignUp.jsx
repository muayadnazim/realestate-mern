import { Link,useNavigate} from 'react-router-dom'
 import { useState } from 'react'

export default function SignUp() {

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
   const res = await fetch('/api/user/signup',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData), 
   })

   const data = await res.json();
   console.log(data);
   if (data.success === false) {
    setLoding(false);
    setError(data.message);
    return;
  }
  setLoding(false);
  setError(null);
  navigate('/sign-in');


   
    } catch (error) {
      setLoding(false);
      setError(error.message);
      
    }
  }

  
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-center text-3xl font-semibold">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          id="username"
          className="border p-3 rounded-lg "
          placeholder="Username"
          onChange={handleChange}
        />
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
        {loding ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
