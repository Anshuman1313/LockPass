"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Pencil, Trash2, Copy, Divide } from "lucide-react"

import { useUser } from "@clerk/nextjs";
import { toast } from 'react-hot-toast';

interface CardProps{
  cardNo: string,
  expiryMonth: string,
  expiryYear: string,
  cvv: string,
  
  cardholderName:string,
 
}

// Sample data - in a real app this would come from your database
const sampleCards = [
  {
    id: 1,
    cardNo: "4111 1111 1111 1111",
    cardholderName: "John Doe",
    expiry: "05/25",
    type: "Visa",
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    id: 2,
    cardNo: "5555 5555 5555 4444",
    cardholderName: "Jane Smith",
    expiry: "12/24",
    type: "MasterCard",
    color: "bg-gradient-to-r from-red-500 to-orange-500",
  },
  {
    id: 3,
    cardNo: "3782 822463 10005",
    cardholderName: "Alex Johnson",
    expiry: "09/26",
    type: "American Express",
    color: "bg-gradient-to-r from-green-500 to-teal-500",
  },
]
// {arrayofcards}:{arrayofcards:CardProps[]}
export function Yourcards({arrayofcards}:{arrayofcards:CardProps[]}) {
  const [cards, setCards] = useState(arrayofcards)
  const [searchTerm, setSearchTerm] = useState("")

  // const deleteCard = (cardNo: string) => {
  //   setCards((prev) => prev.filter((card) => card.cardNo !== cardNo))
  // }
  const { user } = useUser(); // Get user info
  const userId = user?.id;
  const deleteCard = async (cardNo: string) => {
    try {
      toast.success('Card Deleted!')
      const response = await fetch("/api/delete-card", {
        method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId , cardNo }), // Make sure userId is passed
        });
        
        const result = await response.json();
        if (result.success) {
            setCards((prev) => prev.filter((card) => card.cardNo !== cardNo));
          }
    } catch (error) {
        console.error("Error deleting card:", error);
    }
};

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const maskcardNo = (number: string) => {
    const parts = number.split(" ")
    return parts
      .map((part, index) => {
        return index === parts.length - 1 ? part : "••••"
      })
      .join(" ")
  }

  const filteredCards = cards.filter(
    (card) =>
      card.cardholderName.toLowerCase().includes(searchTerm.toLowerCase()) 
      
      // card.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cards..."
          className="pl-8 dark:border -1 dark: border-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCards.length > 0 ? (
        <div className="grid gap-4 overscroll-y-auto">
          {filteredCards.map((card) => (
            <div key={card.cardNo} className={`bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-4 text-white shadow-md relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-2 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:bg-white/20 hover:cursor-pointer"
                  onClick={() => copyToClipboard(card.cardNo.replace(/\s/g, ""))}
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span className="sr-only">Copy card number</span>
                </Button>
                {/* <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/20">
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="sr-only">Edit card</span>
                </Button> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:bg-white/20 hover:cursor-pointer"
                  onClick={() => deleteCard(card.cardNo)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="sr-only">Delete card</span>
                </Button>
              </div>

              <div className="mb-6 opacity-80">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.2" />
                  <path d="M13 20H27M13 24H27" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="text-lg font-mono mb-4">{maskcardNo(card.cardNo)}</div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-80">CARD HOLDER</div>
                  <div className="font-medium">{card.cardholderName}</div>
                </div>
                <div>
                  <div className="text-xs opacity-80">EXPIRES</div>
                  <div className="font-medium">{card.expiryMonth +"/" + card.expiryYear}</div>
                  {/* card.expiryMonth +"/" + card.expiryYear */}
                </div>
                <div className="text-right">
                <div className="text-xs opacity-80">CVV</div>
                  <div className="font-medium">{card.cvv}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm ? "No cards match your search" : "No cards saved yet"}
        </div>
      )}
    </div>
  )
}

