"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, User, Calendar } from "lucide-react"
import { addCardServer } from "@/actions/actions"
import { useUser } from "@clerk/nextjs"


export function Addacard() {
  const [cardNumber, setCardNumber] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardType, setCardType] = useState("")

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)

    // Simple card type detection
    if (formattedValue.startsWith("4")) {
      setCardType("Visa")
    } else if (formattedValue.startsWith("5")) {
      setCardType("MasterCard")
    } else if (formattedValue.startsWith("3")) {
      setCardType("American Express")
    } else if (formattedValue.startsWith("6")) {
      setCardType("Discover")
    } else {
      setCardType("")
    }
  }
  const user = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the card to your state or database
    if(user.user){

      addCardServer(cardNumber, expiryMonth, expiryYear, cvv, user?.user?.id,cardholderName )
      
      
    }
    console.log("Saving card:", { cardNumber, cardholderName, expiry: `${expiryMonth}/${expiryYear}`, cvv })

    // Reset form
    setCardNumber("")
    setCardholderName("")
    setExpiryMonth("")
    setExpiryYear("")
    setCvv("")
  }

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    return month < 10 ? `0${month}` : `${month}`
  })

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => `${currentYear + i}`)

  return (
    <form onSubmit={handleSubmit} className="space-y-4 dark:text-black">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <CreditCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="pl-8 dark:border -1 dark: border-black"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            required
          />
          {cardType && (
            <div className="absolute right-2 top-2.5 text-sm font-medium text-muted-foreground">{cardType}</div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardholderName">Cardholder Name</Label>
        <div className="relative">
          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="cardholderName"
            placeholder="John Doe"
            className="pl-8 dark:border -1 dark: border-black"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col gap-2">
        <div className="space-y-2">
          <Label>Expiry Date</Label>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1 dark:">
              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground " />
              <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
                <SelectTrigger className="pl-8">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span className="text-muted-foreground">/</span>
            <div className="flex-1">
              <Select value={expiryYear} onValueChange={setExpiryYear} required>
                <SelectTrigger>
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.slice(-2)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            className="dark:border -1 dark: border-black"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Card
      </Button>
    </form>
  )
}

