import { supabase } from '../../supabase.js'
import { useState } from "react"

export default function CreateListing() {

   
const [imageUploadError,setImageUploadError]=useState(false)
const [files,setFiles]=useState([])
const [formData,setFormData]=useState({ imageUrls:[]})

const [uploading, setUploading] = useState(false);
    
    


const handleImagesSubmit = async ()=>{
if (files.length> 0 && files.length + formData.imageUrls.length < 7 ){
    setUploading(true)
    setImageUploadError(false)
const promises = [];


for(let i=0;i<files.length;i++){
    
    
    promises.push(storeImage(files[i]))
  }
await Promise.all(promises).then((urls)=>{
setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
setImageUploadError(false)
setUploading(false);
}).catch(()=>{
    setImageUploadError('Image upload failed (2 MB per image)')

})
}else{
    setImageUploadError('you can only upload 6 image per listing')
    setUploading(false);
}
}

const storeImage =   (file) => {
    return new Promise ( (resolve,reject) => {
    
        const storeImage =async ()=>{
            const { data, error } = await supabase.storage.
        from('profileImage').upload(`${Date.now()+file.name}_image.png`,
           file); 
    if (error)  { 
        reject(error)
     console.error('Error uploading image:', error); return null;
    } 
     const urls =  supabase.storage.from('profileImage').getPublicUrl(data?.path)
    resolve(urls) }
    storeImage()
            })}

const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center p-3">Create a Listing</h1>

        <form className="flex flex-col sm:flex-row gap-4">

<div className="flex flex-col gap-4 flex-1">

<input className="border p-3 rounded-lg" 
id="nmae"
type="text" 
placeholder="Name"
maxLength='62'
minLength='10'
required
/>

<textarea className="border p-3 rounded-lg" 
type="text" 
id="description"
placeholder="Description"
maxLength='62'
minLength='10'
required
/>

<input className="border p-3 rounded-lg" 
id="address"
type="text" 
placeholder="Address"
maxLength='62'
minLength='10'
required
/>

<div className="flex gap-6 flex-wrap">

<div>
<input className='w-5' id="sell" type="checkbox"  />
<label  htmlFor="sell"> Sell</label>
</div>

<div>
<input  className='w-5' id="rent" type="checkbox"  />
<label  htmlFor="rent"> Rent</label>
</div>

<div>
<input  className='w-5' id="parking-spot" type="checkbox"  />
<label  htmlFor="parking-spot"> Parking spot</label>
</div>

<div>
<input  className='w-5' id="furnished" type="checkbox"  />
<label  htmlFor="furnished"> Furnished</label>
</div>

<div>
<input  className='w-5' id="offer" type="checkbox"  />
<label  htmlFor="offer"> Offer</label>
</div>


</div>




<div className="flex flex-wrap gap-6">
    <div className="flex items-center gap-2">
        <input type="number"  
        id="bedrooms" min='1' max='10'
        required
        className="p-3 rounded-lg border-gray-300"
        />
        <label htmlFor="bedrooms">Beds</label>
    </div>  

    <div className="flex items-center gap-2">
        <input type="number"  
        id="baths" min='1' max='10'
        required
        className="p-3 rounded-lg border-gray-300"
         />
        <label htmlFor="baths">Baths</label>
    </div>  

    <div className="flex items-center gap-2">
        <input type="number"  
        id="regular-price" min='1' max='10'
        required
        className="p-3 rounded-lg border-gray-300"
         />

         <div className="flex flex-col items-center">
         <label htmlFor="regular-price">Regular Price</label>
         <span className="text-xs">($ / month)</span>
         </div>
       
    </div>  

    <div className="flex items-center gap-2">
        <input type="number"  
        id="discounted-price" min='1' max='10'
        required
        className="p-3 rounded-lg border-gray-300"
         />

         <div className="flex flex-col items-center">
         <label htmlFor="discounted-price">Discounted Price</label>
         <span className="text-xs">($ / month)</span>
         </div>
        
    </div>   
</div>



</div>






<div className="flex flex-col flex-1 gap-4">
<p  className="font-semibold">Images:
    <span className="font-normal text-gray-600 ml-2">The first image will be the cover</span>
</p>


<div className="flex gap-4">
<input onChange={(e)=>setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id='images' accept="image/*" multiple />
<button onClick={ ()=>handleImagesSubmit()} type="button" className="p-3 text-green-700 border border-green-700 
rounded uppercase hover:shadow-lg disabled:opacity-80">{uploading ? 'Uploading...' : 'Upload'}</button>
</div>
<p className='text-red-700'>{imageUploadError&&imageUploadError}</p>
{
    formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>  (
       
        
<div key={url.data.publicUrl} className='flex justify-between p-3 border items-center'>
    <img   className='w-20 h-20 object-contain rounded-lg' src={url.data.publicUrl} alt="listing image" />

<button
type='button'
onClick={() => handleRemoveImage(index)}
className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
> Delete </button>

</div>
    ))
}
<button  className="p-3 bg-slate-700 text-white 
rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing </button>
</div>



        </form>
    </main>
  )
}
