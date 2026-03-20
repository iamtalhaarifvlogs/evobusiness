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

// ================= HELPERS =================
const CONTACT_KEY = "contacts";
const CAMPAIGN_KEY = "campaigns";

// -------- CONTACTS --------
export const getContacts = (): Contact[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CONTACT_KEY) || "[]");
};

export const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
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

// -------- CAMPAIGNS --------
export const getCampaigns = (): Campaign[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CAMPAIGN_KEY) || "[]");
};

export const saveCampaigns = (campaigns: Campaign[]) => {
  localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(campaigns));
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