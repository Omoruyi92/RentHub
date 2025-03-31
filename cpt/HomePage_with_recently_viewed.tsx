
"use client";
import React, { useState, useEffect } from "react";
import {
  FaDollarSign,
  FaLock,
  FaBoxOpen,
  FaAngleDoubleDown,
} from "react-icons/fa";
import Testimonials from "./components/Testimonials";
import RecentlyViewed from "@/app/components/RecentlyViewed";

const HomePage = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="relative flex flex-col items-center text-center py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg overflow-hidden h-screen">
        <div className="absolute inset-0 z-[-1]">
          <img
            src="https://placeholder.co/600x400/EEE/31343C?font=roboto&text=Roboto"
            alt="Gadget rental background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <h1 className="text-5xl font-extrabold text-white drop-shadow-xl mb-4">
          Welcome to RentHub
        </h1>
        <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8">
          Rent high-end gadgets like cameras, gaming consoles, laptops, and
          more, without the hefty price tag. Your next adventure starts here.
        </p>

        <blockquote className="text-xl italic text-gray-300 max-w-3xl mx-auto mb-6">
          &quot;RentHub made it so easy to access top-tier gadgets for my work and
          leisure. Affordable, reliable, and hassle-free.&quot;
          <footer className="mt-2 text-lg font-semibold">
            - John Doe, Freelancer
          </footer>
        </blockquote>

        <div className="flex space-x-6 justify-center mt-6">
          <button className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-xl transform hover:scale-105 hover:bg-blue-700 transition duration-300 ease-in-out">
            Get Started
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg shadow-xl transform hover:scale-105 hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>

        {showScrollIndicator && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white">
            <div className="text-center animate-bounce">
              <span className="text-md font-bold">Scroll Down</span>
              <FaAngleDoubleDown className="w-8 h-8 mx-auto" />
            </div>
          </div>
        )}
      </header>

      {/* Recently Viewed Section */}
      <section className="bg-gray-50 px-6 pt-10">
        <RecentlyViewed />
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-10">
          Why Choose Us?
        </h2>
        <div className="flex justify-center space-x-20">
          <div className="bg-gray-100 p-8 rounded-lg w-64 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <FaDollarSign size={50} className="text-gray-600 mb-6 mx-auto" />
            <h3 className="text-black font-bold text-lg">Affordable</h3>
            <p className="text-gray-600 pt-4 font-semibold">
              Rent at the best prices without breaking the bank.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg w-64 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <FaLock size={50} className="text-gray-600 mb-6 mx-auto" />
            <h3 className="text-black font-bold text-lg">Secure</h3>
            <p className="text-gray-600 pt-4 font-semibold">
              Verified users ensure safe transactions.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg w-64 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <FaBoxOpen size={50} className="text-gray-600 mb-6 mx-auto" />
            <h3 className="text-black font-bold text-lg">Wide Selection</h3>
            <p className="text-gray-600 pt-4 font-semibold">
              Choose from a range of high-tech gadgets.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-10">
          About RentHub
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          RentHub was founded with the goal of providing people with easy access
          to the latest technology at an affordable cost...
        </p>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-8">
          Affordable Pricing
        </h2>
        {/* Pricing content remains the same */}
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-100 py-16 px-6 text-center">
        <Testimonials />
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Rent Your Gadget?</h2>
        <p className="text-lg mb-8">
          Choose the best plan that suits your needs, and get started today!
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-100 transform hover:scale-105 transition duration-300 ease-in-out">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default HomePage;
