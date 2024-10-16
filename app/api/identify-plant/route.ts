import { NextResponse } from "next/server";
import Together from "together-ai";
import { pool } from "../../utils/db";

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

interface PlantInfo {
  name: string;
  scientificName: string;
  family: string;
  type: string;
  careLevel: string;
  description: string;
}

interface MessageContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const userId = formData.get("userId") as string | null;

    if (!image || !userId) {
      return NextResponse.json(
        { error: "Missing image or user ID" },
        { status: 400 }
      );
    }

    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const messageContent: MessageContent[] = [
      {
        type: "text",
        text: "Please identify this plant and provide the following information: name, scientific name, family, type, care level, and a brief description. Format the response as a simple text with each piece of information on a new line.",
      },
      {
        type: "image_url",
        image_url: { url: `data:image/jpeg;base64,${base64Image}` },
      },
    ];

    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
    } as any);

    const content = response.choices[0]?.message?.content;
    if (typeof content !== "string") {
      throw new Error("Unexpected response format from API");
    }

    const lines = content.split("\n").filter((line) => line.trim() !== "");
    const plantInfo: PlantInfo = {
      name:
        lines
          .find((line) => line.toLowerCase().includes("name:"))
          ?.split(":")[1]
          ?.trim()
          .replace(/\*/g, "") || "Unknown",
      scientificName:
        lines
          .find((line) => line.toLowerCase().includes("scientific name:"))
          ?.split(":")[1]
          ?.trim()
          .replace(/\*/g, "") || "Unknown",
      family:
        lines
          .find((line) => line.toLowerCase().includes("family:"))
          ?.split(":")[1]
          ?.trim()
          .replace(/\*/g, "") || "Unknown",
      type:
        lines
          .find((line) => line.toLowerCase().includes("type:"))
          ?.split(":")[1]
          ?.trim()
          .replace(/\*/g, "") || "Unknown",
      careLevel:
        lines
          .find((line) => line.toLowerCase().includes("care level:"))
          ?.split(":")[1]
          ?.trim()
          .replace(/\*/g, "") || "Unknown",
      description:
        lines
          .find((line) => line.toLowerCase().includes("description:"))
          ?.split(":")
          .slice(1)
          .join(":")
          .trim()
          .replace(/\*/g, "") || "No description available",
    };

    const query = `
      INSERT INTO plant_identifications (user_id, plant_name, scientific_name, family, care_level, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const values = [
      userId,
      plantInfo.name,
      plantInfo.scientificName,
      plantInfo.family,
      plantInfo.careLevel,
      plantInfo.description,
    ];
    const result = await pool.query(query, values);
    const identificationId = result.rows[0].id;

    return NextResponse.json({ ...plantInfo, id: identificationId });
  } catch (error) {
    console.error("Error identifying plant:", error);
    return NextResponse.json(
      { error: "Failed to identify plant" },
      { status: 500 }
    );
  }
}
