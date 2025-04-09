"use client"
import React from 'react'

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
const Navbar = () => {
    const { setTheme } = useTheme()
  return (
    <div className='flex justify-around items-center bg-primary shadow-lg shadow-gray-800/50 min-h-[8vh] w-full  font-semibold dark:shadow-lg dark:shadow-gray-800/50 '>
      <Link href="/">
        <div className="homeicon text-2xl">
          <span className='text-primary-foreground font-bold text-xl'>&lt;</span>
            Lock
          <span className='text-primary-foreground font-bold text-2xl'>Pass</span>

          <span className='text-primary-foreground text-xl font-bold'>&gt;</span>
        </div>
      </Link>

      <ul className='flex justify-center items-center gap-[20px]'>
      <Link href="/">
      <li className='text-primary-foreground hover:text-primary-foreground/80 transition-colors cursor-pointer font-medium'>Home</li>
      </Link>
      <Link href="/about">
      <li className='text-primary-foreground hover:text-primary-foreground/80 transition-colors cursor-pointer font-medium'>About</li>
      </Link>
      {/* <Link href="/contact">
      <li className='text-primary-foreground hover:text-primary-foreground/80 transition-colors cursor-pointer font-medium'>Contact</li>
      </Link> */}
      </ul>
      <div className='flex justify-center items-center gap-[20px]'>
        
        
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      
      </DropdownMenuContent>
    </DropdownMenu>
    <div className='flex md:gap-1 text-primary-foreground '>

    <SignedOut>
    

              <SignInButton />
   
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </div>
      </div>
    </div>
  )
}

export default Navbar
