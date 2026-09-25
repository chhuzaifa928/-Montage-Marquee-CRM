import { NextResponse } from "next/server";
import { parseBankReceiptWithGemini } from "@/lib/geminiOcr";

export const maxDuration = 60; // Allow sufficient time for multimodal AI vision analysis

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let base64Data = "";
    let mimeType = "image/png";

    if (contentType.includes("application/json")) {
      const json = await request.json();
      base64Data = json.imageBase64 || json.image || "";
      mimeType = json.mimeType || "image/png";
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (file) {
        mimeType = file.type || "image/png";
        const buffer = await file.arrayBuffer();
        base64Data = Buffer.from(buffer).toString("base64");
      }
    }

    if (!base64Data) {
      return NextResponse.json(
        { success: false, error: "No image provided. Please supply imageBase64 in JSON or file in multipart form." },
        { status: 400 }
      );
    }

    const ocrResult = await parseBankReceiptWithGemini(base64Data, mimeType);

    return NextResponse.json({
      success: true,
      ocrResult,
    });
  } catch (error) {
    console.error("OCR API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process receipt with Gemini OCR: " + String(error),
      },
      { status: 500 }
    );
  }
}
