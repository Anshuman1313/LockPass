"use client";
import React from "react";
import { Github, Linkedin } from 'lucide-react';

const page = () => {
  return (
    <div className="flex items-center justify-center dark:bg-gray-900 h-screen p-6  ">
    <div className="md:grid md:grid-cols-1 md:lg:grid-cols-3 md:gap-4 max-w-7xl mx-auto w-full max-sm:mt-[5vh] max-md:mt-[15vh]">
    {/* dark:bg-gray-900 h-screen p-6 */}
      
      {/* Box 1: Deep Navy Blue */}
      <div className="bg-blue-900 rounded-2xl p-6 flex flex-col items-center max-md:mt-[30vh] hover:border-2 ">
        <h2 className="text-center text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-tight text-white">
          About LockPass
        </h2>
        <div className="mt-4 text-center text-base/6 text-neutral-200 md:text-lg">
          LockPass is a secure and user-friendly password manager designed to help you store, manage, and protect your passwords effortlessly. With encryption and an intuitive interface, you can access your credentials anytime, anywhere—without compromising security.
        </div>
      </div>

      {/* Box 2: Forest Green */}
      <div className="bg-green-800 rounded-2xl p-6 flex flex-col items-center max-md:mt-[2vh] hover:border-2"> 
        <h2 className="text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-tight text-white">
          📩 Get in Touch
        </h2>
        <div className="mt-4 flex flex-col gap-3 items-center justify-center text-left text-base md:text-lg text-neutral-200">
          <div className="flex items-center gap-2">
            <Github size={24} color="white" />
            <a href="https://github.com/Anshuman1313" target="_blank" className="hover:font-bold hover:cursor-pointer hover:underline">Anshuman1313</a>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin size={24} color="white" />
            <a href="https://www.linkedin.com/in/anshuman-rana-965863272" target="_blank" className="hover:font-bold hover:cursor-pointer hover:underline">Anshuman1313</a>
          </div>
        </div>
      </div>
      
      {/* Box 3: Burgundy */}
      <div className="bg-pink-900 rounded-2xl p-6 flex flex-col items-center max-md:mt-[2vh] hover:border-2">
        <h2 className="text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-tight text-white">
          🔐 Why Choose LockPass?
        </h2>
        <div className="mt-4 text-neutral-200 flex flex-col gap-2 md:text-lg">
          <div>• End-to-End Encryption – Your data remains private and secure.</div>
          <div>• User-Friendly UI – A clean and modern interface for hassle-free navigation.</div>
          <div>• Seamless Management – Store, search, and retrieve passwords with ease.</div>
          <div>• Strong Password Generator – Generate and save secure passwords instantly.</div>
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default page
