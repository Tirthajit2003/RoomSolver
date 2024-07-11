import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from "../components/ListingItem";
import Footer from '../components/Footer';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation, Autoplay]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex-grow p-6">
        {/* Top-level */}
        <div className="text-center my-10">
          <h1 className="text-blue-800 font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Discover Your Ideal Room with <span className="text-green-700">Ease and Confidence</span> - Your
            <br /> Perfect Space Awaits!
          </h1>
          <div className="text-gray-700 mt-4 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto">
            We make finding your next home simple. Get personalized recommendations and detailed listings to match your needs.
            <br />
            <br /> Start your search today and find your dream space.
          </div>
          <Link to="/search">
            <button className="mt-8 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>

        {/* swiper */}
        <div className="mt-12">
          <Swiper
            navigation
            autoplay={{ delay: 3000 }} // Change slide every 3 seconds
          >
            {offerListings && offerListings.length > 0 &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center center / cover no-repeat`,
                      height: '500px',
                      imageRendering: 'auto'
                    }}
                    className="h-[500px]"
                  ></div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        {/* Showing listing results having offer, sale or rent */}
        <div className="mt-12">
          <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
            {offerListings && offerListings.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
            {rentListings && rentListings.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
            {saleListings && saleListings.length > 0 && (
              <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add the Footer component */}
      <Footer />
    </div>
  );
}
