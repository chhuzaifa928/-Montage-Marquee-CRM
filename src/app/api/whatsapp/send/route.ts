import { NextResponse } from "next/server";
import { sendWhatsAppMessage, WhatsAppTemplatePayload } from "@/lib/whatsapp";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WhatsAppTemplatePayload;

    if (!body.to || !body.templateName || !body.recipientName) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields (to, recipientName, templateName)",
        },
        { status: 400 }
      );
    }

    const result = await sendWhatsAppMessage(body);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("WhatsApp Send Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to dispatch WhatsApp message: " + String(error) },
      { status: 500 }
    );
  }
}
