import { NextRequest, NextResponse } from "next/server";

// ✅ VERIFY WEBHOOK (GET)
export async function GET(req: NextRequest) {
  const VERIFY_TOKEN = "your_verify_token";

  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Verification failed", { status: 403 });
}

// ✅ RECEIVE MESSAGES (POST)
export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Incoming WhatsApp:", JSON.stringify(body, null, 2));

  // 👉 later: save message + trigger AI

  return NextResponse.json({ success: true });
}
