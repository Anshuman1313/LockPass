import { NextResponse } from "next/server";
import { deleteCard } from "@/actions/actions"; // Import the function

export async function POST(req: Request) {
    try {
        const { userId, cardNo } = await req.json();

        if (!userId || !cardNo) {
            return NextResponse.json({ success: false, error: "Missing userId or cardNo" });
        }

        await deleteCard(userId, cardNo);
        return NextResponse.json({ success: true });
    } catch (error) {
         const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, error: errorMessage });
    }
}