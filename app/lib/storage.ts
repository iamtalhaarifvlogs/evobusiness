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

export type Settings = {
  theme: "light" | "dark";
  notifications: boolean;
  autoSave: boolean;

  // optional future-safe fields (prevents overwrite issues)
  botType?: string;
  openaiKey?: string;
  grokKey?: string;
  phoneId?: string;
  accessToken?: string;
  autoReply?: boolean;
  delay?: number;
};

// ================= KEYS =================
const CONTACT_KEY = "contacts";
const CAMPAIGN_KEY = "campaigns";
const SETTINGS_KEY = "settings";

// ================= SAFE CHECK =================
const isClient = () => typeof window !== "undefined";

// ================= SAFE GET =================
const safeGet = <T>(key: string, fallback: T): T => {
  if (!isClient()) return fallback;

  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;

    const parsed = JSON.parse(data);

    // prevent invalid object overwrite
    if (parsed === null || parsed === undefined) return fallback;

    return parsed as T;
  } catch (err) {
    console.warn(`safeGet failed for key: ${key}`, err);
    return fallback;
  }
};

// ================= SAFE SET =================
const safeSet = (key: string, value: any) => {
  if (!isClient()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));

    // DEBUG (remove later if you want)
    console.log(`✅ Saved [${key}]`, value);
  } catch (err) {
    console.error(`❌ Storage write failed for key: ${key}`, err);
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

// ================= SETTINGS =================
export const getSettings = (): Settings => {
  return safeGet<Settings>(SETTINGS_KEY, {
    theme: "light",
    notifications: true,
    autoSave: true,
  });
};

// 🔥 IMPORTANT FIX: merge instead of overwrite
export const saveSettings = (settings: Settings) => {
  const existing = getSettings();

  const merged = {
    ...existing,
    ...settings,
  };

  safeSet(SETTINGS_KEY, merged);
};