let accessToken = "";
if (typeof window !== "undefined") {
  let storage = window.localStorage.getItem("accessToken");
  if (storage !== null) {
    accessToken = storage;
  }
}

export const configApi = {
  headers: {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  },
};
