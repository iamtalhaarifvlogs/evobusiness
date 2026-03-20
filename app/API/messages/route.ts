let messages: any[] = [];

export async function GET() {
  return Response.json(messages);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newMessage = {
    id: Date.now(),
    sender: body.sender,
    text: body.text,
    chatId: body.chatId,
    createdAt: new Date(),
  };

  messages.push(newMessage);

  return Response.json(newMessage);
}
