import { NextRequest, NextResponse } from 'next/server';

const RAG_URL = 'https://rivalcoder-legal-assistant.hf.space/query';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userQuery: string | undefined = body?.query;
    const chatId: string | undefined = body?.chatId;
    const history: unknown = body?.history;

    if (!userQuery || typeof userQuery !== 'string') {
      return NextResponse.json(
        { error: 'Field "query" (string) is required' },
        { status: 400 }
      );
    }

    // Validate optional chat history
    type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
    let validatedHistory: ChatMessage[] | undefined;
    if (typeof history !== 'undefined') {
      if (!Array.isArray(history)) {
        return NextResponse.json(
          { error: 'Field "history" must be an array of { role, content }' },
          { status: 400 }
        );
      }
      const isValidMessage = (m: unknown): m is ChatMessage => {
        if (typeof m !== 'object' || m === null) return false;
        const maybe = m as Record<string, unknown>;
        const role = maybe.role;
        const content = maybe.content;
        const isValidRole = role === 'user' || role === 'assistant' || role === 'system';
        return isValidRole && typeof content === 'string';
      };
      if (!history.every(isValidMessage)) {
        return NextResponse.json(
          { error: 'Each history item must have role (user|assistant|system) and content (string)' },
          { status: 400 }
        );
      }
      validatedHistory = history as ChatMessage[];
    }

    const upstreamPayload: Record<string, unknown> = { query: userQuery };
    if (validatedHistory && validatedHistory.length > 0) upstreamPayload.history = validatedHistory;
    if (chatId) upstreamPayload.chatId = chatId;
    // console.log('Upstream payload:', upstreamPayload);
    const upstreamResponse = await fetch(RAG_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upstreamPayload),
    });

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text();
      return NextResponse.json(
        { error: `Upstream error: ${upstreamResponse.status} ${errorText}` },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const isConnErr = message.includes('fetch') || message.includes('Failed to fetch') || message.includes('ECONNREFUSED');
    const friendly = isConnErr
      ? 'Connection failed: Unable to reach the assistant service. Please check your internet connection.'
      : 'Internal server error';
    console.error('Error in assistant API:', error);
    return NextResponse.json(
      { error: friendly },
      { status: 500 }
    );
  }
}


