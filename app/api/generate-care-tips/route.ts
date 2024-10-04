import { NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function POST(request: Request) {
  try {
    const { plantName, careLevel, plantType } = await request.json();

    const prompt = `Generate care tips for a ${plantName} (${plantType}) with a ${careLevel} care level. Include information about watering, light requirements, soil type, and any special care instructions. No more than 100 words`;

    const response = await together.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful plant care assistant." },
        { role: "user", content: prompt },
      ],
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
      max_tokens: 150,
      temperature: 0.7,
    });

    const careTips =
      response.choices[0]?.message?.content ||
      "Sorry, I couldn't generate care tips at this time.";

    return NextResponse.json({ careTips });
  } catch (error) {
    console.error("Error generating care tips:", error);
    return NextResponse.json(
      { error: "Failed to generate care tips" },
      { status: 500 }
    );
  }
}
