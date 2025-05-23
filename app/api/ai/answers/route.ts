import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
export async function POST(req: Request) {
  const { question, content, userAnswer } = await req.json();

  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Generate a markdown-formatted response to the following question: "${question}".

Consider the provided context:
**Context:** ${content}

Also, prioritize and incorporate the user's answer when formulating your response:
**User's Answer:** ${userAnswer}

Prioritize the user's answer only if it's correct. If it's incomplete or incorrect, improve or correct it while keeping the response concise and to the point.
Provide the final answer in markdown format.`,
      system:
        "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, and emphasis where necessary. Do not  use code block or code examples.just plain.",
    });
    return NextResponse.json({ success: true, data: text }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
