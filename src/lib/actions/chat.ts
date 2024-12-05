"use server";

import { type Chat } from "@/lib/types";
import { redis } from "../kv";

export async function saveChat(chat: Chat) {
  try {
    const chatToSave = {
      ...chat,
      messages: JSON.stringify(chat.messages),
    };

    console.log(chatToSave);

    redis.hset(`chat:${chat.id}`, chatToSave);
  } catch (error) {
    throw error;
  }
}

export async function getChat(id: string) {
  const chat = await redis.hgetall<Chat>(`chat:${id}`);

  if (!chat) {
    return null;
  }

  if (typeof chat.messages === "string") {
    try {
      chat.messages = JSON.parse(chat.messages);
    } catch {
      chat.messages = [];
    }
  }

  if (!Array.isArray(chat.messages)) {
    chat.messages = [];
  }

  return chat as Chat;
}
