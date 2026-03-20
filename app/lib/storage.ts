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
  tag: string;
  message: string;
  status: "Draft" | "Running" | "Completed";
};

// ================= SETTINGS TYPE (NEW) =================
export type Settings = {
  theme: "light" | "dark";
  notifications: boolean;
  autoSave: boolean;
};

// ================= KEYS =================
const CONTACT_KEY = "contacts";
const CAMPAIGN_KEY = "campaigns";
const SETTINGS_KEY = "settings";

// ================= SAFE STORAGE CORE =================
const isClient = () => typeof window !== "undefined";

const safeGet = <T>(key: string, fallback: T): T => {
  if (!isClient()) return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : fallback;
  } catch {
    return fallback;
  }
};

const safeSet = (key: string, value: any) => {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Storage write failed:", err);
  }
};

// ================= CONTACTS =================
export const getContacts = (): Contact[] => {
  return safeGet<Contact[]>(CONTACT_KEY, []);
};

export const saveContacts = (contacts: Contact[]) => {
  safeSet(CONTACT_KEY, contacts);
};

export const addContact = (contact: Contact) => {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
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

// ================= CAMPAIGNS =================
export const getCampaigns = (): Campaign[] => {
  return safeGet<Campaign[]>(CAMPAIGN_KEY, []);
};

export const saveCampaigns = (campaigns: Campaign[]) => {
  safeSet(CAMPAIGN_KEY, campaigns);
};

export const addCampaign = (campaign: Campaign) => {
  const campaigns = getCampaigns();
  campaigns.push(campaign);
  saveCampaigns(campaigns);
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

// ================= SETTINGS (NEW FIX) =================
export const getSettings = (): Settings => {
  return safeGet<Settings>(SETTINGS_KEY, {
    theme: "light",
    notifications: true,
    autoSave: true,
  });
};

export const saveSettings = (settings: Settings) => {
  safeSet(SETTINGS_KEY, settings);
};