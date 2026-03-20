export const getStorage = (key: string) => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(value));
};
