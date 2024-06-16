import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserFailure,updateUserStart,updateUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const fileRef=useRef(null);
  const {currentUser,loading,error} = useSelector((state) => state.user);
  const [file,setFile] = useState(undefined);
  const [filePercent,setFilePercent] = useState(0);
  const [fileUpdateError,setFileUpdateError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch=useDispatch();

  //firebase storage
  // allow read;
  //     allow write : if 
  //     request.resource.size<2*1024*1024 &&
  //     request.resource.contentType.matches('image/.*')
  useEffect(()=>{
    if (file){
      handleFileUpload(file);
    }
  },[file]);
  
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      if (data.success==false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      
    } catch (error) {
        dispatch(updateUserFailure(error.message));
    }
  }

  const handleFileUpload =(file) => {
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);
    uploadTask.on('state_changed',(snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePercent(Math.round(progress));
      console.log(progress);
  },
  (error)=>{
    setFileUpdateError(true);
    console.log(error);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setFormData({...formData,avatar:downloadURL});
    });
  });
}
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file'  onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden />
        <img onClick={()=>fileRef.current.click()}  className="rounded-full self-center h-24 w-24 object-cover cursor-pointer mt-2 " src={formData.avatar || currentUser.avatar} alt="profile" accept="image/*" />
        <p className='text-sm self-center'>
          {fileUpdateError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type='text' id='username' defaultValue={currentUser.username} placeholder='username' className='border p-3 rounded-lg' onChange={handleChange} />

        <input type='text' id='email' defaultValue={currentUser.email} placeholder='email' className='border p-3 rounded-lg' onChange={handleChange} />

        <input type='password' id='password' placeholder='password' className='border p-3 rounded-lg' onChange={handleChange} />

        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{loading? 'Loading..':'Update'}</button>
        <button className='bg-green-500 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Create Listing</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error? error:''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess? 'User updated successfully':''}</p>
    </div>
  )
}
