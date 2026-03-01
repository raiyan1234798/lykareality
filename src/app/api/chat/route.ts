import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";

        if (!apiKey) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const { messages, userRole } = await req.json();

        const SYSTEM_PROMPT = `You are the Lyka AI Executive Assistant, an expert AI integrated into the Lyka Realty enterprise training platform (Lyka Academy).
Your primary goal is to assist users of the platform.

Here is your complete knowledge base about the platform:
- Platform Name: Lyka Realty Academy
- Description: Enterprise-grade real estate learning platform for Lyka Realty, designed to train property consultants, senior consultants, and managers for the luxury Dubai real estate market.
- Available Courses:
  1. Luxury Closing Techniques: Teaches premium real estate sales and client relations, specifically dealing with high-net-worth investors and selling the "vision" and developer's legacy over just floorplans.
  2. Off-Plan Masterclass: Focuses on off-plan market assessment, understanding developer portfolios, and pitching off-plan properties.
  3. Client Acquisition Strategies: Networking in the elite market.
  4. Dubai Real Estate Laws (2026): A mandatory completion course covering the legal aspects of selling properties in Dubai.
- Application Pages & Features:
  - Analytics Dashboard: Where admins see enterprise performance.
  - Access Requests: Admins approve or decline new users, set their roles, and assign courses.
  - Manage Users: View all active, inactive, and pending users. Admins can directly enroll users.
  - Course Studio: Where new courses and lessons (video, audio, transcripts) are built.
  - Quiz Builder: Admins create assessments.
  - Evaluations: View automated grading results.
  - Support Center: Users open tickets, and Admins reply to them.
  - All Courses: Complete library for users to request enrollment.
  - My Courses & My Results: Where users take courses and see their quiz scores.

The current user interacting with you has the role: ${userRole || "Guest"}.

Instructions based on user role:
- If the user is an "Admin" or "Super Admin": Talk to them as a platform manager. Help them understand how to approve requests, manage users, create courses in the Course Studio, build quizzes, or review analytics and evaluations.
- If the user is a "Property Consultant", "Manager", or "User": Talk to them as a trainee. Help them find courses, understand luxury real estate concepts, prepare for assessments, or guide them to the Support Center if they have account issues. DO NOT tell them to manage other users or create courses.

Personality: Professional, elite, highly knowledgeable, concise, and helpful. You are a luxury real estate AI.`;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT
        });

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
        }

        let history = messages.slice(0, -1).map((m: any) => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        // Gemini SDK requires the conversation history to start with a 'user' message.
        // If our state seeded the array with a 'model' greeting, we must strip it from the formal history array.
        while (history.length > 0 && history[0].role === "model") {
            history.shift();
        }

        const latestMessage = messages[messages.length - 1].text;

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(latestMessage);

        return NextResponse.json({ response: result.response.text() });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate response" }, { status: 500 });
    }
}
