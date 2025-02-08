export async function setToken() {
  const widgetScript = document.getElementById("squareCraft-script");

  if (!widgetScript) {
      console.warn("⚠️ squarecraft-script not found.");
      return;
  }

  const token = widgetScript.dataset?.token;

  if (token) {
      console.log("🔑 Token received:", token);
      localStorage.setItem("squareCraft_auth_token", token);
      document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
  }
}
