export const widgetScript = document.getElementById("squarecraft-script");

export const token = widgetScript?.dataset?.token;
if (token) {
  console.log("🔑 Token received:", token);
  localStorage.setItem("squareCraft_auth_token", token);
  document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
}