import { NextRequest, NextResponse } from "next/server";

// ================= ENV =================
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID!;

// ================= TYPES =================
type IncomingMessage = {
  from: string;
  text?: { body: string };
};

// ================= VERIFY WEBHOOK =================
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Verification failed", { status: 403 });
}

// ================= HANDLE INCOMING =================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message =
      body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return NextResponse.json({ status: "no message" });
    }

    const from = message.from;
    const text = message.text?.body || "";

    console.log("📩 Incoming:", from, text);

    // ================= STEP 1: SAVE MESSAGE =================
    // 👉 Replace this with DB later
    await saveMessage(from, text);

    // ================= STEP 2: CHECK MANUAL MODE =================
    const manualMode = await isManualMode(from);

    if (manualMode) {
      console.log("⛔ Manual mode ON — no bot reply");
      return NextResponse.json({ status: "manual mode" });
    }

    // ================= STEP 3: GENERATE AI RESPONSE =================
    const reply = await generateAIResponse(text);

    // ================= STEP 4: SEND REPLY =================
    await sendWhatsAppMessage(from, reply);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// ================= SEND MESSAGE =================
async function sendWhatsAppMessage(to: string, message: string) {
  const url = `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`;

  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        body: message,
      },
    }),
  });

  console.log("📤 Sent reply:", message);
}

// ================= AI RESPONSE =================
async function generateAIResponse(message: string): Promise<string> {
  // 🔥 Replace with OpenAI / Grok later

  if (message.toLowerCase().includes("price")) {
    return "Our pricing starts from $99/month. Would you like details?";
  }

  return "Thanks for your message! We'll get back to you shortly.";
}

// ================= MANUAL MODE =================
async function isManualMode(phone: string): Promise<boolean> {
  // 🔥 Later: check DB conversation.manualMode
  return false;
}

// ================= SAVE MESSAGE =================
async function saveMessage(phone: string, text: string) {
  // 🔥 Later: save to DB

  console.log("💾 Saving message:", phone, text);
}