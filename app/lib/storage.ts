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

// -------- CONTACTS --------
export const getContacts = (): Contact[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("contacts") || "[]");
};

export const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

export const addContact = (contact: Contact) => {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

// -------- CAMPAIGNS --------
export const getCampaigns = (): Campaign[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("campaigns") || "[]");
};

export const saveCampaigns = (campaigns: Campaign[]) => {
  localStorage.setItem("campaigns", JSON.stringify(campaigns));
};

export const addCampaign = (campaign: Campaign) => {
  const campaigns = getCampaigns();
  campaigns.push(campaign);
  saveCampaigns(campaigns);
};
