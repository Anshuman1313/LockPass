import { NextResponse } from "next/server";
import { deletePassword } from "@/actions/actions"; // Import the function

export async function POST(req: Request) {
    try {
        const { userId, unique_id } = await req.json();

        if (!userId || !unique_id) {
            return NextResponse.json({ success: false, error: "Missing userId or unique_id" });
        }

        await deletePassword(userId, unique_id);
        return NextResponse.json({ success: true });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, error: errorMessage });
    }
}