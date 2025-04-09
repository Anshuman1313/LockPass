"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, EyeOff, Copy, Pencil, Trash2, Search } from "lucide-react"
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast"

// Sample data - in a real app this would come from your database
const samplePasswords = [
  { id: 1, website: "google.com", username: "user@example.com", password: "p@ssw0rd123" },
  { id: 2, website: "github.com", username: "devuser", password: "c0d3r2023!" },
  { id: 3, website: "netflix.com", username: "moviefan", password: "str3@ming!" },
]
interface PasswordProps {
  website: string, username: string, password: string, unique_id: string

}


export function Yourpassword({ arrayofpasswords }: { arrayofpasswords: PasswordProps[] }) {
  const [passwords, setPasswords] = useState(arrayofpasswords)
  const [searchTerm, setSearchTerm] = useState("")
  const [visiblePasswords, setVisiblePasswords] = useState<string[]>([])

  const togglePasswordVisibility = (unique_id: string) => {
    setVisiblePasswords((prev) => (prev.includes(unique_id) ? prev.filter((passId) => passId !== unique_id) : [...prev, unique_id]))
  }

  const copyToClipboard = (text: string) => {
    toast.success("Copied to clipboard!")
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  // const deletePassword = (id: string) => {
  //   setPasswords((prev) => prev.filter((password) => password.unique_id !== id))
  // }
  const { user } = useUser(); // Get user info
  const userId = user?.id;
  const deletePassword = async (unique_id: string) => {
    toast.success("Deleting Password!")
    if (!userId) {
        console.error("User not logged in");
        return;
    }

    try {
        const response = await fetch("/api/delete-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, unique_id }), // Pass userId
        });

        const result = await response.json();
        if (result.success) {
            setPasswords((prev) => prev.filter((password) => password.unique_id !== unique_id)); // Update UI
        } else {
            console.error("Failed to delete password:", result.error);
        }
    } catch (error) {
        console.error("Error deleting password:", error);
    }
};

  const filteredPasswords = passwords.filter(
    (password) =>
      password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 dark:text-black">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search passwords..."
          className="pl-8 dark:border -1 dark: border-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      {filteredPasswords.length > 0 ? (
        <div className="border rounded-md overflow-hidden dark:text-black">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-black">Website</TableHead>
                <TableHead className="dark:text-black">Username</TableHead>
                <TableHead className="dark:text-black">Password</TableHead>
                <TableHead className="w-[100px] dark:text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overscroll-y-auto">
              {filteredPasswords?.map((item) => (

                <TableRow key={item.unique_id} className="overscroll-y-auto">
                  <TableCell className="font-medium">{item.website}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {visiblePasswords.includes(item.unique_id) ? item.password : "••••••••"}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => togglePasswordVisibility(item.unique_id)}
                      >
                        {visiblePasswords.includes(item.unique_id) ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                        <span className="sr-only">
                          {visiblePasswords.includes(item.unique_id) ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyToClipboard(item.password)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span className="sr-only">Copy password</span>
                      </Button>
                      {/* <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit password</span>
                      </Button> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deletePassword(item.unique_id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete password</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm ? "No passwords match your search" : "No passwords saved yet"}
        </div>
      )}
    </div>
  )
}

