// src/app/api/chat/route.ts

import { NextResponse } from "next/server";
import { chattogemini } from "@/utils/chattogemini";
import { ChatHistory, ChatSettings } from "@/types";

export async function POST(request: Request) {
  try {
    const { userMessage, history, settings } = (await request.json()) as {
      userMessage: string;
      history: ChatHistory;
      settings: ChatSettings;
    };

    const aiResponse = await chattogemini(userMessage, history, settings);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error obtaining the AI model's response." },
      { status: 500 }
    );
  }
}