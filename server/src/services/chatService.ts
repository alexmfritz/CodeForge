import { ChatMessage } from '../models/ChatMessage.js';
import { ChatLog } from '../models/ChatLog.js';
import type { EmojiReaction } from '@codeforge/shared';

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export async function saveMessage(data: {
  cohortId: string;
  userId: string;
  username: string;
  displayName: string;
  role: string;
  messageType: string;
  content: string;
  exerciseLink?: { exerciseId: string; title: string; tier: number; type: string };
  codeSnippet?: { code: string; language: string };
  mentions?: string[];
}) {
  const date = getTodayDateString();
  const message = await ChatMessage.create({
    ...data,
    date,
    mentions: data.mentions ?? [],
    reactions: [],
    isPinned: false,
  });
  return message.toJSON();
}

export async function getTodayMessages(cohortId: string) {
  const date = getTodayDateString();
  const messages = await ChatMessage.find({ cohortId, date }).sort({ createdAt: 1 });
  return messages.map((m) => m.toJSON());
}

export async function getPinnedMessage(cohortId: string) {
  const date = getTodayDateString();
  const pinned = await ChatMessage.findOne({ cohortId, date, isPinned: true });
  return pinned ? pinned.toJSON() : null;
}

export async function pinMessage(cohortId: string, messageId: string) {
  const date = getTodayDateString();
  await ChatMessage.updateMany({ cohortId, date, isPinned: true }, { isPinned: false });
  const message = await ChatMessage.findByIdAndUpdate(messageId, { isPinned: true }, { new: true });
  return message ? message.toJSON() : null;
}

export async function unpinMessages(cohortId: string) {
  const date = getTodayDateString();
  await ChatMessage.updateMany({ cohortId, date, isPinned: true }, { isPinned: false });
}

export async function toggleReaction(messageId: string, userId: string, emoji: EmojiReaction) {
  const message = await ChatMessage.findById(messageId);
  if (!message) return null;

  const existing = message.reactions.find((r) => r.emoji === emoji);
  if (existing) {
    const idx = existing.userIds.findIndex((id) => String(id) === userId);
    if (idx >= 0) {
      existing.userIds.splice(idx, 1);
      if (existing.userIds.length === 0) {
        message.reactions = message.reactions.filter((r) => r.emoji !== emoji) as typeof message.reactions;
      }
    } else {
      existing.userIds.push(userId as unknown as typeof existing.userIds[0]);
    }
  } else {
    message.reactions.push({
      emoji,
      userIds: [userId as unknown as typeof message.reactions[0]['userIds'][0]],
    });
  }

  await message.save();
  return message.toJSON();
}

export async function archivePreviousDayLogs(): Promise<void> {
  const today = getTodayDateString();

  const distinctDays = await ChatMessage.aggregate([
    { $match: { date: { $lt: today } } },
    { $group: { _id: { cohortId: '$cohortId', date: '$date' } } },
  ]);

  for (const entry of distinctDays) {
    const { cohortId, date } = entry._id;

    const existing = await ChatLog.findOne({ cohortId, date });
    if (existing) continue;

    const messages = await ChatMessage.find({ cohortId, date }).sort({ createdAt: 1 });
    if (messages.length === 0) continue;

    const jsonMessages = messages.map((m) => m.toJSON());
    const participants = [...new Set(jsonMessages.map((m) => m.userId))];

    await ChatLog.create({
      cohortId,
      date,
      messages: jsonMessages,
      messageCount: jsonMessages.length,
      participants,
      archivedAt: new Date(),
    });

    await ChatMessage.deleteMany({ cohortId, date });

    console.log(`Archived ${jsonMessages.length} chat messages for cohort ${cohortId} on ${date}`);
  }
}

export async function getArchivedLogs(cohortId: string) {
  const logs = await ChatLog.find({ cohortId })
    .sort({ date: -1 })
    .select({ messages: 0 });
  return logs.map((l) => l.toJSON());
}

export async function getArchivedLog(logId: string) {
  const log = await ChatLog.findById(logId);
  return log ? log.toJSON() : null;
}

export async function deleteArchivedLog(logId: string) {
  return ChatLog.findByIdAndDelete(logId);
}

export async function deleteCohortChatData(cohortId: string) {
  await Promise.all([ChatMessage.deleteMany({ cohortId }), ChatLog.deleteMany({ cohortId })]);
}
