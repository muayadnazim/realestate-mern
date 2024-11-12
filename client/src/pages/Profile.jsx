import {useSelector} from 'react-redux'
import { useRef ,useState,useEffect} from 'react'
import { supabase } from '../../supabase.js'

export default function Profile() {
  const {currentUser } = useSelector(state=>state.user)
  const [file,setFile]=useState(null)
  const [formData,setFormData]=useState({})
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null)




  
  
  useEffect(()=>{
if(file){
  handleFileUpload(file)
  
  
}

  },[file])

  const handleFileUpload =async (file) => {
    const { data, error } = await supabase.storage.from('profileImage').upload(`${Date.now()}_image.png`,
       file); 
     
  
       
      if (error) 
        { 
          setFileUploadError(true)
          console.error('Error uploading image:', error); return null; } 

      
      const url = await supabase.storage.from('profileImage').getPublicUrl(data.path)
    setFormData({...formData,avatar:url.data.publicUrl})
    

  }
  
  
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <input onChange={(e)=>setFile(e.target.files[0])} type="file" accept='image/*'  hidden ref={fileRef} />
      <img onClick={()=>fileRef.current.click()} src={formData.avatar?formData.avatar:currentUser.rest.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
      

      <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>): (
            ''
          )
          // ) : filePerc > 0 && filePerc < 100 ? (
          //   <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          // ) : filePerc === 100 ? (
          //   <span className='text-green-700'>Image successfully uploaded!</span>
          // ) : 
         }
        </p>

      <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg'  />
      <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg'  />
      <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg'  />
      <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
    </form>
    <div className="flex justify-between mt-5">
      <span className='text-red-700 cursor-pointer'>Delete account</span>
      <span className='text-red-700 cursor-pointer'>Sign out</span>
    </div>
  </div>
  )
}
