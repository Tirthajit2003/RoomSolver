import { getDownloadURL, getStorage,ref,uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function CreateListing() {
    const navigate=useNavigate();
    const {currentUser} = useSelector(state=>state.user);
    const [files,setFiles]=useState([]);
    const [formData,setFormData]=useState({
        imageUrls:[],
        name: '',
        description:'',
        address:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
    });
    const [uploading,setUploading] = useState(false);
    const [imageUploadError,setImageUploadError]=useState(false);
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    console.log(formData);
    
    const handleImageSubmit=()=>{
        if (files.length>0 && files.length+formData.imageUrls.length<7) {
            const promises = [];
            setUploading(true);
            for(let i=0; i<files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false);
                setUploading(false);
            }).catch((error) => {
                setImageUploadError('Image upload error: ' + error.message);
                setUploading(false);
            });

        }
        else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    }
    const storeImage=async (file)=>{
        return new Promise((resolve, reject)=>{
            const storage=getStorage(app);
            const fileName=new Date().getTime()+file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on('state_changed',(snapshot)=>{
                const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress}% done`)
            },
                 (error) => {
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    resolve(downloadURL);
                })
            }
            )
        });
    }

    const handleRemoveImage=(index)=>{
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_,i)=>i!==index),
        })
    }
    const handleChange=(e)=>{
        if(e.target.id ==='sale' || e.target.id === 'rent'){
            setFormData(
                {...formData, 
                    type: e.target.id });
        }  
        
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData(
                {...formData, 
                    [e.target.id]:e.target.checked });
    
        }
        if (e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea')
            {
              setFormData({
                ...formData, 
                [e.target.id]:e.target.value
              })  
            }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            if (formData.imageUrls.length<1)
            {
                return setError('Please upload at least one image');
                
            }
            if(+formData.regularPrice<+formData.discountPrice)
            {
               return setError('Discount price must be lower than regular price'); 
            }
            setLoading(true);
            setError(false);
            const res= await fetch('/api/listing/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    ...formData,
                    userRef:currentUser._id,
                }),
            });
            const data=await res.json();
            if(data.success==false){
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);

        }catch(error){
            setError(true);
            setLoading(false);
        };
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semicbold text-center my-7'>Create a Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' onChange={handleChange} value={formData.name} required />
                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' onChange={handleChange} value={formData.description} required />
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength='62' minLength='10' onChange={handleChange} value={formData.address} required />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w5' onChange={handleChange}
                        checked={formData.type ==='sale'} />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w5'
                        onChange={handleChange}
                        checked={formData.type ==='rent'} />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w5'
                        onChange={handleChange}
                        checked={formData.parking ===true} />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w5' onChange={handleChange}
                        checked={formData.furnished===true} />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w5'
                        onChange={handleChange}
                        checked={formData.offer===true} />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-6 flex-wrap'>
                    <div className="flex items-center gap-2">
                        <input type="number" id='bedrooms' min='1' max='10' className='p-1
                         border-blue-700 rounded-lg' required
                         onChange={handleChange}
                        value={formData.bedrooms} />
                        <span>Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='bathrooms' min='1' max='10' className='p-1
                         border-blue-700 rounded-lg' required
                         onChange={handleChange}
                        value={formData.bathrooms} />
                        <span>Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='regularPrice' min='1' max='1000000' className='p-1
                         border-blue-700 rounded-lg' required
                         onChange={handleChange}
                        value={formData.regularPrice} />
                         <div className='flex flex-col items-center'>
                            <span>Regular Price</span>
                            <span className='text-xs'>(Rs/month)</span>
                         </div>
                        
                    </div>
                    {formData.offer && 
                        <div className="flex items-center gap-2">
                        <input type="number" id='discountPrice' min='1' max='1000000' className='p-1
                         border-blue-700 rounded-lg' required 
                         onChange={handleChange}
                        value={formData.discountPrice} />
                         <div className='flex flex-col items-center'>
                            <span>Discounted Price</span>
                            <span className='text-xs'>(Rs/month)</span>

                         </div>
                    </div>
                    
                    }
                    
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-500 ml-2'>The first image will be the cover (max 6)</span></p>
                <div className='flex gap-4 p-3'>
                    <input type='file' onChange={(e)=>setFiles(e.target.files)}className='border border-blue-700 p-3 rounded-lg' id='images' accept='image/*' multiple/>
                    <button disabled={uploading} type='button' onClick={handleImageSubmit} className={uploading?'p-3 font-semibold text-white bg-blue-500 rounded  hover:shadow-lg disabled:opacity-80':'p-3 font-semibold text-white bg-green-500 rounded  hover:shadow-lg disabled:opacity-80'} >{uploading? 'Uploading..':'Upload'}</button>

                </div>
                <p className='text-red-600 text-sm mb-3'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>
                     (<div key={url}   className='flex justify-between p-3 border items-center'>
                            <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' className='p-3 rounded-lg text-red-700 hover:opacity-75' onClick={()=>{handleRemoveImage(index)}}>Delete</button>
                        </div>)
                    )}
                <button disabled={uploading || loading}className='p-3 bg-blue-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>{loading? 'Creating...':'Create Listing'}</button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
                
            </div>
           
        </form>
        
    </main>
    )
    }
