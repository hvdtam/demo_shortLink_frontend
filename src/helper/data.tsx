export const trimValue = (value: string) => {
  return value.replace(/\s/g, "");
};
export const validateAliasUrl = (value: string) => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
};
export const toLowerCase = (value: string) => {
  return value.replace(/\s/g, "").toLowerCase();
};
