"use server"
import { nanoid } from 'nanoid'

import { clerkClient } from "@clerk/nextjs/server"

interface Card {
    cardNo: string, expiryMonth: string, expiryYear: string, cvv: string, cardholderName: string
}

export async function addCardServer(cardNo: string, expiryMonth: string, expiryYear: string, cvv: string, userId: string, cardholderName: string) {

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    let cards: Card[] = []
    //check for an array
    if (Array.isArray(user.privateMetadata.cards)) {
        cards = user.privateMetadata.cards || []
        cards.push({ cardNo, expiryMonth, expiryYear, cvv, cardholderName })
    }


    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            cards: cards,
        },
    })




    return Response.json({ success: true })
}

interface Password {
    website: string, username: string, password: string ,unique_id: string
}

//  website: "google.com", username: "user@example.com", password: "p@ssw0rd123"
export async function addPasswords(website: string, username: string, password: string, userId:string, unique_id:string) {

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    let passwords: Password[] = []
    if (Array.isArray(user.privateMetadata.passwords)) {
        passwords = JSON.parse(JSON.stringify(user.privateMetadata.passwords))
        passwords.push({ website, username, password ,unique_id})
    }
    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            passwords: passwords,
        },

    })
    
    // return Response.json({ success: true })
    return passwords;
}
export async function deleteCard(userId: string, cardNo: string) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    let cards = user.privateMetadata.cards;

    if (Array.isArray(cards)) {
        cards = cards.filter((card) => card.cardNo !== cardNo); // Remove the card
    }

    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            cards: cards,
        },
    });

    // return { success: true };
    return cards
}
export async function deletePassword(userId: string, unique_id: string) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    let passwords = user.privateMetadata.passwords;

    if (Array.isArray(passwords)) {
        passwords = passwords.filter((password) => password.unique_id !== unique_id); // Remove the password
    }

    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            passwords: passwords,
        },
    });

    return { success: true };
}