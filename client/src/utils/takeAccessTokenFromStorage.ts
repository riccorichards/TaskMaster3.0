const takeTokensFromStorage = (): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken") || "null");
  const refreshToken = JSON.parse(
    localStorage.getItem("refreshToken") || "null"
  );

  return { accessToken, refreshToken };
};

export default takeTokensFromStorage;
