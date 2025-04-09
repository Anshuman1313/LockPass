import { type Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import {
  ClerkProvider,

} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from "react-hot-toast";



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lock Pass',
  description: 'This app is a password manager app for everyone.This helps user to save passwords in one place and to use them he just have to copy it from the tabs'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
     


        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/*
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
              */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            <Navbar />

            <Toaster position="top-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}