import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-8 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">RoomSolver</h2>
            <p>
              Helping you find the perfect room with ease<br /> and confidence. Discover your ideal living <br/>space today.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/" className="hover:underline">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="hover:underline">About</Link></li>
              <li className="mb-2"><Link to="/search" className="hover:underline">Search</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="hover:text-gray-300"><FaFacebook size={24} /></a>
              <a href="https://www.twitter.com" className="hover:text-gray-300"><FaTwitter size={24} /></a>
              <a href="https://www.instagram.com" className="hover:text-gray-300"><FaInstagram size={24} /></a>
              <a href="https://www.linkedin.com" className="hover:text-gray-300"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; 2024 RoomSolver. All rights reserved.
          </p>
          <p className="text-sm">
            1 Outer Ring Road, Bangalore, Karnataka, 567891
          </p>
        </div>
      </div>
    </footer>
  );
}
