"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Globe, RefreshCw } from "lucide-react"
import { addPasswords } from "@/actions/actions"
import { useUser } from "@clerk/nextjs"
import { unique } from "next/dist/build/utils"
import { nanoid } from 'nanoid'
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
export function Addpassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [website, setWebsite] = useState("")
  const [username, setUsername] = useState("")
  const router = useRouter()

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let generatedPassword = ""
    for (let i = 0; i < 16; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(generatedPassword)
  }
  const user = useUser()
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Give a refresh if password is not added")
    if(user.user){
          const unique_id: string = nanoid()
          await addPasswords(website,username,password,   user?.user?.id ,unique_id ) /// Ensure it's awaited
          
         router.refresh()
        }
    // Here you would typically save the password to your state or database
    console.log("Saving password for:", website, username)

    // Reset form
    setWebsite("")
    setUsername("")
    setPassword("")
    
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 dark:text-black">
      <div className="space-y-2 dark:text-black">
        <Label htmlFor="website">Website</Label>
        <div className="relative">
          <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            
            id="website"
            placeholder="example.com"
            className="pl-8 dark:border -1 dark: border-black"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username or Email</Label>
        <Input
          
          id="username"
          className="dark:border -1 dark: border-black"
          placeholder="johndoe@example.com"
          value={username }
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            
            id="password"
            type={showPassword ? "text" : "password"}
            className="pl-8 pr-20 dark:border -1 dark: border-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute right-2 top-2 flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={generatePassword}>
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Generate password</span>
            </Button>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Password
      </Button>
    </form>
  )
}

