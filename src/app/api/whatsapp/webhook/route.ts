import { NextResponse } from "next/server";
import { MontageDataStore } from "@/lib/dataStore";

// Meta WhatsApp Webhook Verification (GET)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "montage_islamabad_webhook_secret_2026";

  if (mode === "subscribe" && token === verifyToken) {
    console.log("Meta WhatsApp Webhook successfully verified.");
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "Verification token mismatch or invalid mode" }, { status: 403 });
}

// Meta WhatsApp Inbound Events & Status Receipts (POST)
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Check for Meta WhatsApp Cloud API status updates or messages
    const entry = payload?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (value) {
      // 1. Delivery Receipts (sent, delivered, read, failed)
      if (value.statuses && value.statuses.length > 0) {
        const statusItem = value.statuses[0];
        const messageId = statusItem.id;
        const status = statusItem.status; // 'sent' | 'delivered' | 'read' | 'failed'

        MontageDataStore.logAudit(
          "WHATSAPP_STATUS_UPDATE",
          "Meta Webhook Receiver",
          "WHATSAPP_MESSAGE",
          messageId,
          `Message status changed to: ${status.toUpperCase()} for recipient ${statusItem.recipient_id}`
        );
      }

      // 2. Incoming Messages from Customer
      if (value.messages && value.messages.length > 0) {
        const messageItem = value.messages[0];
        const from = messageItem.from;
        const text = messageItem.text?.body || "[Media / Interactive Response]";

        MontageDataStore.logAudit(
          "WHATSAPP_INBOUND_MESSAGE",
          `Customer (${from})`,
          "WHATSAPP_INBOUND",
          messageItem.id,
          `Customer received response: "${text}"`
        );
      }
    }

    return NextResponse.json({ status: "EVENT_RECEIVED", received: true });
  } catch (error) {
    console.error("Meta Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failure: " + String(error) }, { status: 500 });
  }
}
