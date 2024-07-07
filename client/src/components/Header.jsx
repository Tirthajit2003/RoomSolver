import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleIconClick = () => {
    const form = document.getElementById('searchForm');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md f">
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-500">Room</span>
            <span className="text-blue-950">Solver</span>
          </h1>
        </Link>
        
        <form id="searchForm" onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64" />
          <FaSearch className='text-slate-500 cursor-pointer' onClick={handleIconClick} />
        </form>
        <ul className='flex gap-6'>
          <Link to="/">
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to="/about">
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link> 
          <Link to="/profile">
            {currentUser ? (
              <img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='' />
            ) : (
              <li className='sm:inline text-slate-700 hover:underline'>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}
