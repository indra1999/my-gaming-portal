// Shared Firebase config + helpers (used by index.html, admin.html and games/ludolive).
// Note: a Firebase web apiKey is NOT a secret. Real protection comes from firestore.rules.
export const firebaseConfig = {
  apiKey: "AIzaSyBOyPRF0djlFD_rXI1vKilJP3ATk-WEIak",
  authDomain: "indrogames-web.firebaseapp.com",
  projectId: "indrogames-web",
  storageBucket: "indrogames-web.firebasestorage.app",
  messagingSenderId: "947379986211",
  appId: "1:947379986211:web:9233d08748015337f63696",
  measurementId: "G-JF8ND67X5Z"
};

export const ADMIN_EMAIL = "indromondol2@gmail.com";

// Escape any text before putting it inside innerHTML / attributes.
export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// Only allow http(s), data:image, or same-site relative URLs (blocks javascript: etc).
export function safeUrl(value) {
  const u = String(value ?? "").trim();
  if (!u) return "";
  if (/^(https?:\/\/|data:image\/)/i.test(u)) return u;
  if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return "";   // any other scheme => blocked
  if (u.startsWith("//")) return "";
  return u;                                          // relative path like games/chess.html
}
