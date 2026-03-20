export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  tag: string;
};

export type Campaign = {
  id: number;
  name: string;
  audience: string;
  tag: string;
  message: string;
  status: "Draft" | "Running" | "Completed";
};

export type Settings = {
  theme: "light" | "dark";
  notifications: boolean;
  autoSave: boolean;

  botType?: string;
  openaiKey?: string;
  grokKey?: string;
  phoneId?: string;
  accessToken?: string;
  autoReply?: boolean;
  delay?: number;
};

// ================= CHAT TYPES =================
export type Chat = {
  id: number;
  contactId?: number;
  name: string;
  lastMessage: string;
  updatedAt?: number;
};

export type Message = {
  id: string;
  sender: "user" | "agent" | "bot";
  text: string;
  timestamp: number;
};

export type MessagesMap = {
  [chatId: number]: Message[];
};

// ================= KEYS =================
const CONTACT_KEY = "contacts";
const CAMPAIGN_KEY = "campaigns";
const SETTINGS_KEY = "settings";
const CHAT_KEY = "chats";
const MESSAGE_KEY = "messagesMap";

// ================= CLIENT CHECK =================
const isClient = () => typeof window !== "undefined";

// ================= SAFE GET =================
const safeGet = <T>(key: string, fallback: T): T => {
  if (!isClient()) return fallback;

  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;

    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed !== "object") return fallback;

    return parsed as T;
  } catch (err) {
    console.warn(`safeGet failed for ${key}`, err);
    return fallback;
  }
};

// ================= SAFE SET =================
const safeSet = (key: string, value: any) => {
  if (!isClient()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`safeSet failed for ${key}`, err);
  }
};

//
// ======================================================
// CONTACTS
// ======================================================
//
export const getContacts = (): Contact[] =>
  safeGet<Contact[]>(CONTACT_KEY, []);

export const saveContacts = (contacts: Contact[]) =>
  safeSet(CONTACT_KEY, contacts);

export const addContact = (contact: Contact) => {
  const contacts = getContacts();
  saveContacts([...contacts, contact]);
};

export const updateContact = (updated: Contact) => {
  const contacts = getContacts().map((c) =>
    c.id === updated.id ? updated : c
  );
  saveContacts(contacts);
};

export const deleteContact = (id: number) => {
  const contacts = getContacts().filter((c) => c.id !== id);
  saveContacts(contacts);
};

//
// ======================================================
// CAMPAIGNS
// ======================================================
//
export const getCampaigns = (): Campaign[] =>
  safeGet<Campaign[]>(CAMPAIGN_KEY, []);

export const saveCampaigns = (campaigns: Campaign[]) =>
  safeSet(CAMPAIGN_KEY, campaigns);

export const addCampaign = (campaign: Campaign) => {
  const campaigns = getCampaigns();
  saveCampaigns([...campaigns, campaign]);
};

export const updateCampaign = (updated: Campaign) => {
  const campaigns = getCampaigns().map((c) =>
    c.id === updated.id ? updated : c
  );
  saveCampaigns(campaigns);
};

export const deleteCampaign = (id: number) => {
  const campaigns = getCampaigns().filter((c) => c.id !== id);
  saveCampaigns(campaigns);
};

//
// ======================================================
// SETTINGS
// ======================================================
//
export const getSettings = (): Settings =>
  safeGet<Settings>(SETTINGS_KEY, {
    theme: "light",
    notifications: true,
    autoSave: true,
    autoReply: false,
    delay: 0,
  });

export const saveSettings = (settings: Settings) => {
  const existing = getSettings();

  safeSet(SETTINGS_KEY, {
    ...existing,
    ...settings,
  });
};

//
// ======================================================
// CHATS
// ======================================================
//
export const getChats = (): Chat[] =>
  safeGet<Chat[]>(CHAT_KEY, []);

export const saveChats = (chats: Chat[]) =>
  safeSet(CHAT_KEY, chats);

export const addChat = (chat: Chat) => {
  const chats = getChats();
  saveChats([...chats, chat]);
};

export const updateChat = (updated: Chat) => {
  const chats = getChats().map((c) =>
    c.id === updated.id ? updated : c
  );
  saveChats(chats);
};

export const deleteChat = (id: number) => {
  const chats = getChats().filter((c) => c.id !== id);
  saveChats(chats);
};

//
// ======================================================
// MESSAGES (PER CHAT)
// ======================================================
//
export const getMessagesMap = (): MessagesMap =>
  safeGet<MessagesMap>(MESSAGE_KEY, {});

export const saveMessagesMap = (map: MessagesMap) =>
  safeSet(MESSAGE_KEY, map);

export const getMessages = (chatId: number): Message[] => {
  const map = getMessagesMap();
  return map[chatId] || [];
};

export const addMessage = (chatId: number, message: Message) => {
  const map = getMessagesMap();

  const existing = map[chatId] || [];

  const updated = {
    ...map,
    [chatId]: [...existing, message],
  };

  saveMessagesMap(updated);
};

export const setMessages = (chatId: number, messages: Message[]) => {
  const map = getMessagesMap();

  saveMessagesMap({
    ...map,
    [chatId]: messages,
  });
};