export const getItem = (namespace?: string | null) => (
  key: string
): any | null => {
  const prefix = namespace ? `${namespace}:` : "";
  const rawData = localStorage.getItem(prefix + key);
  if (rawData) return JSON.parse(rawData);
};

export const setItem = (namespace?: string | null) => (
  key: string,
  value: any
): void => {
  const prefix = namespace ? `${namespace}:` : "";
  return localStorage.setItem(prefix + key, JSON.stringify(value));
};
