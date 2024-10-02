import { NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert image to base64
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please identify this plant and provide the following information: name, scientific name, family, type, care level, and a brief description. Format the response as a simple text with each piece of information on a new line.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ] as any, // Temporary type assertion
        },
      ],
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
    });

    // Add type assertion and null check
    const content = response.choices?.[0]?.message?.content;

    if (typeof content !== "string") {
      throw new Error("Unexpected response format from API");
    }

    // Parse the content into a structured object
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    const plantInfo = {
      name:
        lines
          .find((line) => line.toLowerCase().includes("name:"))
          ?.split(":")[1]
          ?.trim() || "Unknown",
      scientificName:
        lines
          .find((line) => line.toLowerCase().includes("scientific name:"))
          ?.split(":")[1]
          ?.trim() || "Unknown",
      family:
        lines
          .find((line) => line.toLowerCase().includes("family:"))
          ?.split(":")[1]
          ?.trim() || "Unknown",
      type:
        lines
          .find((line) => line.toLowerCase().includes("type:"))
          ?.split(":")[1]
          ?.trim() || "Unknown",
      careLevel:
        lines
          .find((line) => line.toLowerCase().includes("care level:"))
          ?.split(":")[1]
          ?.trim() || "Unknown",
      description:
        lines
          .find((line) => line.toLowerCase().includes("description:"))
          ?.split(":")
          .slice(1)
          .join(":")
          .trim() || "No description available",
    };

    return NextResponse.json(plantInfo);
  } catch (error) {
    console.error("Error identifying plant:", error);
    return NextResponse.json(
      { error: "Failed to identify plant" },
      { status: 500 }
    );
  }
}
