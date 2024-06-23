import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semicbold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required />
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' maxLength='62' minLength='10' required />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sell' className='w5' />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w5' />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-6 flex-wrap'>
                    <div className="flex items-center gap-2">
                        <input type="number" id='bedrooms' min='1' max='10' className='p-1
                         border-blue-700 rounded-lg' required />
                        <span>Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='bathrooms' min='1' max='10' className='p-1
                         border-blue-700 rounded-lg' required />
                        <span>Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='regularPrice' min='1' max='10' className='p-1
                         border-blue-700 rounded-lg' required />
                         <div className='flex flex-col items-center'>
                            <span>Regular Price</span>
                            <span className='text-xs'>($/month)</span>
                         </div>
                        
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='discountedPrice' min='1' max='10' className='p-1
                         border-blue-700 rounded-lg' required />
                         <div className='flex flex-col items-center'>
                            <span>Discounted Price</span>
                            <span className='text-xs'>($/month)</span>

                         </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-500 ml-2'>The first image will be the cover (max 6)</span></p>
                <div className='flex gap-4 p-3'>
                    <input type='file' className='border border-blue-700 p-3 rounded-lg' id='images' accept='image/*' multiple/>
                    <button className='p-3 font-semibold text-white bg-green-500 rounded  hover:shadow-lg disabled:opacity-80'>Upload</button>

                </div>
                <button className='p-3 bg-blue-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                
            </div>
            

        </form>
        
    </main>
  )
}
