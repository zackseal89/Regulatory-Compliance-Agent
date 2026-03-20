// lib/api-client.ts

export interface MessagePart {
  text?: string;
  inline_data?: {
    mime_type: string;
    data: string;
  };
}

export interface MessageContent {
  role: 'user' | 'model';
  parts: MessagePart[];
}

export interface RunEvent {
  author: string;
  content?: MessageContent;
  is_final_response?: boolean;
}

const ADK_API_URL = process.env.NEXT_PUBLIC_ADK_API_URL || 'http://localhost:8000';

export async function* runAgent(prompt: string, sessionId: string = 'default-session') {
  const response = await fetch(`${ADK_API_URL}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 'local-user',
      session_id: sessionId,
      new_message: {
        role: 'user',
        parts: [{ text: prompt }],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to run agent: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.trim()) {
        try {
          const event: RunEvent = JSON.parse(line);
          yield event;
        } catch (e) {
          console.error('Failed to parse event:', line, e);
        }
      }
    }
  }
}
