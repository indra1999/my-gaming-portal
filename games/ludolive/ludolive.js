import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOyPRF0djlFD_rXI1vKilJP3ATk-WEIak",
  authDomain: "indrogames-web.firebaseapp.com",
  projectId: "indrogames-web",
  storageBucket: "indrogames-web.firebasestorage.app",
  messagingSenderId: "947379986211",
  appId: "1:947379986211:web:9233d08748015337f63696",
  measurementId: "G-JF8ND67X5Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================================================================
// 26 CUSTOM CHARACTER AVATARS
// =========================================================================
const CHARACTERS = [
  { id: "arjun",    name: "Arjun",    cat: "male",       tag: "Laid-back gamer",     bg: "#2d3561", skin: "#d99b66", hair: "#1e1b24", shirt: "#6366f1", glasses: true,  beard: true },
  { id: "kabir",    name: "Kabir",    cat: "male",       tag: "Calculated strategist",bg: "#3d2c5e", skin: "#c98552", hair: "#18151c", shirt: "#8b5cf6", glasses: true,  beard: true },
  { id: "rohan",    name: "Rohan",    cat: "male",       tag: "Fast-paced attacker",  bg: "#522546", skin: "#e5a97a", hair: "#2b1d16", shirt: "#ec4899" },
  { id: "leo",      name: "Leo",      cat: "male",       tag: "Lucky roller",         bg: "#1e3a5f", skin: "#f1c29b", hair: "#4a2e1b", shirt: "#0ea5e9", glasses: true },
  { id: "aarav",    name: "Aarav",    cat: "male",       tag: "Calm finisher",        bg: "#1b4332", skin: "#dba06f", hair: "#16161d", shirt: "#10b981" },
  { id: "kai",      name: "Kai",      cat: "male",       tag: "Night owl player",     bg: "#283149", skin: "#eab68a", hair: "#1f2430", shirt: "#3b82f6" },
  { id: "vikram",   name: "Vikram",   cat: "male",       tag: "Veteran tactician",    bg: "#4a2c2a", skin: "#c6824e", hair: "#141414", shirt: "#f59e0b", glasses: true, beard: true },
  { id: "gurpreet", name: "Gurpreet", cat: "male",       tag: "Bold risk-taker",      bg: "#1e3f66", skin: "#d69663", hair: "#141414", shirt: "#2563eb", turban: "#2563eb", beard: true },
  { id: "zayn",     name: "Zayn",     cat: "male",       tag: "Chill competitor",     bg: "#233142", skin: "#d2925e", hair: "#1c1c21", shirt: "#38bdf8", headphones: true },
  { id: "neil",     name: "Neil",     cat: "male",       tag: "Endgame specialist",   bg: "#3b2854", skin: "#e8b48a", hair: "#2a1d17", shirt: "#a855f7", glasses: true },
  { id: "ananya",   name: "Ananya",   cat: "female",     tag: "Sharp defender",       bg: "#4a2545", skin: "#e2a679", hair: "#1d161b", shirt: "#f43f5e", longHair: true },
  { id: "meera",    name: "Meera",    cat: "female",     tag: "Safe-zone queen",      bg: "#2b2d5c", skin: "#d89868", hair: "#18141c", shirt: "#8b5cf6", longHair: true },
  { id: "sophie",   name: "Sophie",   cat: "female",     tag: "Aggressive chaser",    bg: "#542e32", skin: "#f4c7a3", hair: "#5c3317", shirt: "#fb7185", longHair: true },
  { id: "riya",     name: "Riya",     cat: "female",     tag: "Puzzle thinker",       bg: "#1e3d59", skin: "#dfa173", hair: "#1f191e", shirt: "#06b6d4", glasses: true, longHair: true },
  { id: "tara",     name: "Tara",     cat: "female",     tag: "Six-rolling pro",      bg: "#3d2c5e", skin: "#e6ae82", hair: "#2c1b18", shirt: "#c084fc", glasses: true, longHair: true },
  { id: "amira",    name: "Amira",    cat: "female",     tag: "Patient planner",      bg: "#4c1d4b", skin: "#dfa276", hair: "#a855f7", shirt: "#7e22ce", hijab: "#9333ea" },
  { id: "noor",     name: "Noor",     cat: "female",     tag: "Steady racer",         bg: "#1b3b5a", skin: "#e3a87c", hair: "#2563eb", shirt: "#1d4ed8", hijab: "#2563eb" },
  { id: "priya",    name: "Priya",    cat: "female",     tag: "Quick thinker",        bg: "#1e463a", skin: "#d59464", hair: "#18151a", shirt: "#10b981", glasses: true, longHair: true },
  { id: "sana",     name: "Sana",     cat: "female",     tag: "Board controller",     bg: "#522546", skin: "#e7b085", hair: "#22181c", shirt: "#ec4899", longHair: true },
  { id: "kiara",    name: "Kiara",    cat: "female",     tag: "All-round champ",      bg: "#263859", skin: "#e0a375", hair: "#1c171d", shirt: "#3b82f6", longHair: true },
  { id: "boo",      name: "Boo",      cat: "characters", tag: "Bamboo muncher",       bg: "#1e3a52", species: "panda" },
  { id: "rusty",    name: "Rusty",    cat: "characters", tag: "Sly board fox",        bg: "#4a2c18", species: "fox" },
  { id: "rory",     name: "Rory",     cat: "characters", tag: "King of the dice",     bg: "#523614", species: "lion" },
  { id: "pip",      name: "Pip",      cat: "characters", tag: "Cool customer",        bg: "#1b3654", species: "penguin" },
  { id: "bolt",     name: "Bolt",     cat: "characters", tag: "Probability engine",   bg: "#1e324a", species: "robot" },
  { id: "zix",      name: "Zix",      cat: "characters", tag: "Cosmic dice traveler", bg: "#163d36", species: "alien" }
];

function getAvatarSVG(charOrId) {
  const c = typeof charOrId === "string"
    ? (CHARACTERS.find(x => x.id === charOrId) || CHARACTERS[0])
    : (charOrId || CHARACTERS[0]);

  if (c.species === "panda") {
    return `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="${c.bg}"/>
      <circle cx="28" cy="30" r="13" fill="#18181b"/><circle cx="72" cy="30" r="13" fill="#18181b"/>
      <ellipse cx="50" cy="56" rx="30" ry="27" fill="#f8fafc"/>
      <ellipse cx="38" cy="52" rx="8" ry="10" transform="rotate(-15 38 52)" fill="#18181b"/>
      <ellipse cx="62" cy="52" rx="8" ry="10" transform="rotate(15 62 52)" fill="#18181b"/>
      <circle cx="39" cy="51" r="3" fill="#fff"/><circle cx="61" cy="51" r="3" fill="#fff"/>
      <ellipse cx="50" cy="64" rx="5" ry="3.5" fill="#18181b"/>
      <path d="M44 70 Q50 75 56 70" stroke="#18181b" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
  }
  if (c.species === "fox") {
    return `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="${c.bg}"/>
      <polygon points="22,45 26,16 44,34" fill="#ea580c"/><polygon points="78,45 74,16 56,34" fill="#ea580c"/>
      <ellipse cx="50" cy="56" rx="29" ry="25" fill="#f97316"/>
      <path d="M22 56 Q36 62 50 78 Q64 62 78 56 Q72 80 50 81 Q28 80 22 56Z" fill="#fff7ed"/>
      <circle cx="39" cy="51" r="3.5" fill="#18181b"/><circle cx="61" cy="51" r="3.5" fill="#18181b"/>
      <circle cx="50" cy="64" r="4" fill="#18181b"/></svg>`;
  }
  if (c.species === "lion") {
    return `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="${c.bg}"/>
      <circle cx="50" cy="54" r="36" fill="#b45309"/>
      <circle cx="50" cy="55" r="24" fill="#fbbf24"/>
      <circle cx="41" cy="51" r="3.5" fill="#18181b"/><circle cx="59" cy="51" r="3.5" fill="#18181b"/>
      <polygon points="45,60 55,60 50,66" fill="#78350f"/>
      <path d="M43 69 Q50 74 57 69" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
  }
  if (c.species === "penguin") {
    return `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="${c.bg}"/>
      <ellipse cx="50" cy="58" rx="28" ry="32" fill="#0f172a"/>
      <ellipse cx="50" cy="62" rx="20" ry="24" fill="#f8fafc"/>
      <circle cx="41" cy="48" r="3.5" fill="#0f172a"/><circle cx="59" cy="48" r="3.5" fill="#0f172a"/>
      <polygon points="43,55 57,55 50,64" fill="#f59e0b"/></svg>`;
  }
  if (c.species === "robot") {
    return `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="${c.bg}"/>
      <line x1="50" y1="14" x2="50" y2="26" stroke="#94a3b8" stroke-width="4"/>
      <circle cx="50" cy="13" r="5" fill="#38bdf8"/>
      <rect x="24" y="26" width="52" height="46" rx="14" fill="#cbd5e1"/>
      <rect x="31" y="36" width="38" height="20" rx="8" fill="#0f172a"/>
      <circle cx="41" cy="46" r="4.5" fill="#38bdf8"/><circle cx="59" cy="46" r="4.5" fill="#38bdf8"/>
      <rect x="38" y="61" width="24" height="4" rx="2" fill="#475569"/>
      <rect x="32" y="76" width="36" height="24" rx="8" fill="#94a3b8"/></svg>`;
  }
  if (c.species === "alien") {
    return `<svg viewBox="0 0 100 100" class="w-full h-full"><rect width="100" height="100" fill="${c.bg}"/>
      <path d="M50 20 C72 20 78 44 68 64 C61 76 55 80 50 80 C45 80 39 76 32 64 C22 44 28 20 50 20Z" fill="#4ade80"/>
      <ellipse cx="39" cy="49" rx="7" ry="10" transform="rotate(-18 39 49)" fill="#064e3b"/>
      <ellipse cx="61" cy="49" rx="7" ry="10" transform="rotate(18 61 49)" fill="#064e3b"/>
      <circle cx="37" cy="46" r="2" fill="#bbf7d0"/><circle cx="59" cy="46" r="2" fill="#bbf7d0"/>
      <path d="M45 66 Q50 70 55 66" stroke="#064e3b" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
  }

  return `<svg viewBox="0 0 100 100" class="w-full h-full">
    <rect width="100" height="100" fill="${c.bg}"/>
    ${c.longHair ? `<path d="M24 44 C24 22 76 22 76 44 L80 86 L20 86 Z" fill="${c.hair}"/>` : ""}
    ${c.hijab ? `<path d="M22 46 C22 20 78 20 78 46 L82 95 L18 95 Z" fill="${c.hijab}"/>` : ""}
    <path d="M22 96 C24 76 76 76 78 96 Z" fill="${c.shirt}"/>
    <rect x="43" y="64" width="14" height="14" rx="6" fill="${c.skin}"/>
    <ellipse cx="50" cy="48" rx="20" ry="23" fill="${c.skin}"/>
    ${!c.hijab && !c.turban ? `<path d="M29 44 C29 22 71 22 71 44 C68 32 58 30 50 30 C42 30 32 32 29 44Z" fill="${c.hair}"/>` : ""}
    ${c.turban ? `<path d="M26 42 C26 18 74 18 74 42 Q50 33 26 42Z" fill="${c.turban}"/>` : ""}
    ${c.headphones ? `<path d="M26 48 C26 20 74 20 74 48" stroke="#38bdf8" stroke-width="5" fill="none"/><rect x="21" y="42" width="7" height="15" rx="3" fill="#0ea5e9"/><rect x="72" y="42" width="7" height="15" rx="3" fill="#0ea5e9"/>` : ""}
    <circle cx="42" cy="48" r="2.7" fill="#18181b"/><circle cx="58" cy="48" r="2.7" fill="#18181b"/>
    ${c.glasses ? `<rect x="34" y="42" width="14" height="11" rx="3" fill="none" stroke="#18181b" stroke-width="2.2"/><rect x="52" y="42" width="14" height="11" rx="3" fill="none" stroke="#18181b" stroke-width="2.2"/><line x1="48" y1="47" x2="52" y2="47" stroke="#18181b" stroke-width="2.2"/>` : ""}
    ${c.beard ? `<path d="M32 53 C33 68 67 68 68 53 C64 60 57 62 50 62 C43 62 36 60 32 53Z" fill="${c.hair}" opacity="0.88"/>` : ""}
    <path d="M44 58 Q50 63 56 58" stroke="#7c2d12" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

// =========================================================================
// PALETTE, THEMES, DICE SKINS & PERSISTENT PROFILE STATE
// =========================================================================
const COLOR_PALETTE = [
  { id: "ruby",     name: "Ruby",     hex: "#e54854", light: "#ff8c94", dark: "#991b27", glow: "rgba(229, 72, 84, 0.36)" },
  { id: "amber",    name: "Amber",    hex: "#f0a52b", light: "#ffd278", dark: "#9c6008", glow: "rgba(240, 165, 43, 0.36)" },
  { id: "emerald",  name: "Emerald",  hex: "#19b26b", light: "#6ee7b7", dark: "#065f38", glow: "rgba(25, 178, 107, 0.36)" },
  { id: "aqua",     name: "Aqua",     hex: "#14b8c4", light: "#67e8f9", dark: "#0e6470", glow: "rgba(20, 184, 196, 0.36)" },
  { id: "sapphire", name: "Sapphire", hex: "#4374e8", light: "#93c5fd", dark: "#1e3a8a", glow: "rgba(67, 116, 232, 0.36)" },
  { id: "amethyst", name: "Amethyst", hex: "#9d50e8", light: "#d8b4fe", dark: "#581c87", glow: "rgba(157, 80, 232, 0.36)" }
];

const lsGet = (k, d) => { try { const v = localStorage.getItem(k); return v !== null ? v : d; } catch (e) { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

const BOARD_THEMES = {
  classic: { name: "Classic", bgA: "#161a36", bgB: "#0a0c18", cellBg: "#fbf7ec", cellStroke: "#d8cdb4", centerBg: "#1e293b", outerRim: "#d4a644" },
  neon:    { name: "Neon",    bgA: "#0d1233", bgB: "#04061a", cellBg: "#1e2238", cellStroke: "#334155", centerBg: "#0f172a", outerRim: "#6366f1" },
  royal:   { name: "Royal",   bgA: "#33230c", bgB: "#120b03", cellBg: "#fef3c7", cellStroke: "#d97706", centerBg: "#451a03", outerRim: "#f5b942" },
  ice:     { name: "Ice",     bgA: "#0c2a40", bgB: "#06131e", cellBg: "#eff8ff", cellStroke: "#bcd9ee", centerBg: "#0c2a42", outerRim: "#38bdf8" },
  shadow:  { name: "Shadow",  bgA: "#1d1d21", bgB: "#050506", cellBg: "#2a2a30", cellStroke: "#3f3f46", centerBg: "#0a0a0c", outerRim: "#f5b942" },
  galaxy:  { name: "Galaxy",  bgA: "#2f1a70", bgB: "#0d0723", cellBg: "#ede9fe", cellStroke: "#c4b5fd", centerBg: "#1e1b4b", outerRim: "#8b5cf6" },
  fire:    { name: "Fire",    bgA: "#471808", bgB: "#150602", cellBg: "#fff1e6", cellStroke: "#fdba74", centerBg: "#431407", outerRim: "#f97316" }
};

const DICE_SKINS = {
  classic: { name: "Classic", f: ["#fffdf7", "#e6d9bd"], edge: "#cdbd97", pips: ["#d9a21b", "#7a4a06"], ring: "#e8c46a", glow: "rgba(232,196,106,.45)" },
  neon:    { name: "Neon",    f: ["#121a2c", "#0a1020"], edge: "#1d3b4d", pips: ["#6ff7f2", "#0e8fb5"], ring: "#22d3ee", glow: "rgba(34,211,238,.45)" },
  royal:   { name: "Royal",   f: ["#f7d874", "#c8922a"], edge: "#f3d27a", pips: ["#6b3f0a", "#2a1805"], ring: "#f5b942", glow: "rgba(245,185,66,.5)" },
  ice:     { name: "Ice",     f: ["#f3faff", "#a9cfee"], edge: "#cfe6f7", pips: ["#2f7fc1", "#123e6b"], ring: "#93c5fd", glow: "rgba(147,197,253,.45)" },
  shadow:  { name: "Shadow",  f: ["#1c1c24", "#0b0b10"], edge: "#2a2a33", pips: ["#e0a21e", "#7a5410"], ring: "#e8b84a", glow: "rgba(245,185,66,.5)" },
  galaxy:  { name: "Galaxy",  f: ["#4f33a0", "#22124f"], edge: "#6d4fd0", pips: ["#eee4ff", "#8b5cf6"], ring: "#a78bfa", glow: "rgba(167,139,250,.5)" },
  fire:    { name: "Fire",    f: ["#7d2c10", "#3a0f05"], edge: "#a8431d", pips: ["#ffd76a", "#f97316"], ring: "#fb923c", glow: "rgba(251,146,60,.5)" }
};

let userProfile = {
  name: lsGet("ludolive_name", "Lucky Tiger"),
  avatarId: lsGet("ludolive_avatar", "arjun"),
  favColor: parseInt(lsGet("ludolive_favcolor", "0"), 10) || 0,
  appTheme: lsGet("ludolive_apptheme", "dark"),
  animSpeed: lsGet("ludolive_animspeed", "normal"),
  sfxOn: lsGet("ludolive_sfx", "1") === "1",
  musicOn: lsGet("ludolive_music", "0") === "1",
  mixMaster: parseInt(lsGet("ludolive_mix_master", "0"), 10),
  mixEffects: parseInt(lsGet("ludolive_mix_effects", "100"), 10),
  mixMusic: parseInt(lsGet("ludolive_mix_music", "60"), 10),
  diceTimer: parseInt(lsGet("ludolive_dicetimer", "30"), 10),
  analyticsOn: lsGet("ludolive_analytics", "0") === "1"
};

let selectedMode = "local";
let aiDifficulty = lsGet("ludolive_aidiff", "medium");
let setupPlayerCount = 4;
let setupConfigs = [];
let boardThemeKey = BOARD_THEMES[lsGet("ludolive_theme", "classic")] ? lsGet("ludolive_theme", "classic") : "classic";
let diceSkinKey = DICE_SKINS[lsGet("ludolive_dice", "royal")] ? lsGet("ludolive_dice", "royal") : "royal";
let soundEnabled = userProfile.sfxOn;

let onlineRoomCode = null;
let onlineMySlot = -1;
let onlineUnsubscribe = null;
let isOnlineHost = false;

let game = null;
let boardGeom = null;
let turnInterval = null;
let isPaused = false;
let gpCubeRotX = -16, gpCubeRotY = 22;
let boardEffects = [];

// =========================================================================
// APPEARANCE THEME & PROFILE SYNC
// =========================================================================
function applyAppThemeClass() {
  const isLight = userProfile.appTheme === "light";
  document.documentElement.classList.toggle("light", isLight);
  document.documentElement.classList.toggle("dark", !isLight);
  const btn = document.getElementById("themeToggleBtn");
  if (btn) btn.innerHTML = isLight ? '<i class="fas fa-moon text-sm"></i>' : '<i class="fas fa-sun text-sm"></i>';
}

window.toggleAppearanceTheme = function () {
  setAppearanceTheme(userProfile.appTheme === "dark" ? "light" : "dark");
};

window.setAppearanceTheme = function (mode) {
  userProfile.appTheme = mode;
  lsSet("ludolive_apptheme", mode);
  applyAppThemeClass();
  syncSettingsUI();
};

function refreshProfileDisplays() {
  const lobbyAv = document.getElementById("lobbyUserAvatar");
  if (lobbyAv) lobbyAv.innerHTML = getAvatarSVG(userProfile.avatarId);
  const onlineInp = document.getElementById("onlinePlayerName");
  if (onlineInp && onlineInp.value === "Lucky Tiger") onlineInp.value = userProfile.name;
}

document.querySelectorAll("[data-av]").forEach(el => {
  el.innerHTML = getAvatarSVG(el.getAttribute("data-av"));
});
applyAppThemeClass();
refreshProfileDisplays();

// =========================================================================
// WEB AUDIO SYNTHESIZER
// =========================================================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq, type = "sine", duration = 0.09, vol = 0.12) {
  if (!soundEnabled || !userProfile.sfxOn) return;
  const scale = (userProfile.mixEffects / 100);
  if (scale <= 0) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol * scale, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function sfxDice() {
  [340, 460, 400, 560, 620].forEach((f, i) => setTimeout(() => playTone(f, "triangle", 0.055, 0.11), i * 65));
}
function sfxStep() { playTone(520, "sine", 0.06, 0.1); }
function sfxCapture() {
  playTone(220, "sawtooth", 0.15, 0.15);
  setTimeout(() => playTone(150, "sawtooth", 0.2, 0.15), 100);
}
function sfxHome() {
  [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => playTone(f, "triangle", 0.14, 0.14), i * 80));
}

// =========================================================================
// LEAVE GAME, PAUSE & IN-GAME CUSTOMIZE MODALS
// =========================================================================
window.openLeaveGameModal = function () {
  document.getElementById("leaveGameModal").classList.add("open");
};
window.closeLeaveGameModal = function () {
  document.getElementById("leaveGameModal").classList.remove("open");
};
window.confirmLeaveGame = function () {
  closeLeaveGameModal();
  returnToLobby();
};
window.toggleGameFullscreen = function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
};

window.togglePauseGame = function () {
  isPaused = !isPaused;
  const pm = document.getElementById("pausedModal");
  if (pm) {
    pm.classList.toggle("hidden", !isPaused);
    pm.classList.toggle("flex", isPaused);
  }
  document.getElementById("pauseBtn").innerHTML = isPaused
    ? '<i class="fas fa-play text-amber-400 text-xs"></i>'
    : '<i class="fas fa-pause text-xs"></i>';
};

window.closePausedAndLeave = function () {
  isPaused = false;
  document.getElementById("pausedModal").classList.add("hidden");
  document.getElementById("pausedModal").classList.remove("flex");
  returnToLobby();
};

window.openInGameCustomize = function () {
  document.getElementById("igDiceGrid").innerHTML = Object.keys(DICE_SKINS).map(k => {
    const s = DICE_SKINS[k];
    return `<button class="cz-item ${k === diceSkinKey ? "sel" : ""}" onclick="setDiceSkin('${k}');openInGameCustomize()">
      <div class="cz-dice-tile" style="background:linear-gradient(145deg, ${s.f[0]}, ${s.f[1]})">${czIconPips(s)}</div>
      <span>${s.name}</span></button>`;
  }).join("");
  document.getElementById("igThemeGrid").innerHTML = Object.keys(BOARD_THEMES).map(k => {
    const t = BOARD_THEMES[k];
    return `<button class="cz-item ${k === boardThemeKey ? "sel" : ""}" onclick="setBoardTheme('${k}');openInGameCustomize()">
      <div class="cz-theme-tile" style="background:linear-gradient(160deg, ${t.bgA}, ${t.bgB})"></div>
      <span>${t.name}</span></button>`;
  }).join("");
  const sh = document.getElementById("inGameCustomizeSheet");
  sh.classList.remove("hidden");
  sh.classList.add("flex");
};

window.closeInGameCustomize = function () {
  const sh = document.getElementById("inGameCustomizeSheet");
  sh.classList.add("hidden");
  sh.classList.remove("flex");
};

// =========================================================================
// STATISTICS PAGE
// =========================================================================
window.openStatsPage = function () {
  document.getElementById("statsPlayerName").textContent = userProfile.name;
  document.getElementById("statsPlayerAvatar").innerHTML = getAvatarSVG(userProfile.avatarId);

  const played = parseInt(lsGet("ludolive_played", "0"), 10);
  const wins = parseInt(lsGet("ludolive_wins", "0"), 10);
  const history = JSON.parse(lsGet("ludolive_history", "[]"));
  const area = document.getElementById("statsContentArea");

  if (played === 0) {
    area.innerHTML = `
      <div class="st-empty">
        <div class="st-bars-icon"><span></span><span></span><span></span></div>
        <h2 class="val-main">No games yet</h2>
        <p>Play your first match and your journey will be recorded here.</p>
        <button type="button" class="gold-cta-btn" onclick="closeStatsPage()">Play a game</button>
      </div>
    `;
  } else {
    const rate = played > 0 ? Math.round((wins / played) * 100) : 0;
    const rows = history.slice(0, 10).map(h => `
      <div class="glass-box flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
        <div>
          <div class="text-sm font-extrabold val-main">${h.mode} · ${h.players} Players</div>
          <div class="text-xs sub-muted text-[#8c93ae]">${h.date}</div>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-black ${h.rank === 1 ? 'bg-amber-400/20 text-amber-400' : 'bg-white/10 text-gray-300'}">
          ${h.rank === 1 ? '🏆 1st Place' : `#${h.rank} Finish`}
        </span>
      </div>
    `).join("");

    area.innerHTML = `
      <div class="grid grid-cols-3 gap-3 mt-2 mb-5">
        <div class="glass-box rounded-2xl p-4 text-center bg-white/5 border border-white/10">
          <div class="text-2xl font-black val-main">${played}</div>
          <div class="text-xs font-bold sub-muted text-[#8c93ae] mt-1">Played</div>
        </div>
        <div class="glass-box rounded-2xl p-4 text-center bg-white/5 border border-white/10">
          <div class="text-2xl font-black text-amber-400">${wins}</div>
          <div class="text-xs font-bold sub-muted text-[#8c93ae] mt-1">Won</div>
        </div>
        <div class="glass-box rounded-2xl p-4 text-center bg-white/5 border border-white/10">
          <div class="text-2xl font-black text-emerald-400">${rate}%</div>
          <div class="text-xs font-bold sub-muted text-[#8c93ae] mt-1">Win rate</div>
        </div>
      </div>
      <div class="set-sec-lbl">RECENT MATCHES</div>
      <div class="space-y-2.5">${rows}</div>
    `;
  }

  document.getElementById("statsView").classList.add("open");
  document.getElementById("statsView").scrollTop = 0;
};

window.closeStatsPage = function () {
  document.getElementById("statsView").classList.remove("open");
};

// =========================================================================
// SETTINGS PAGE
// =========================================================================
let activeAvatarFilter = "all";

window.openSettingsPage = function () {
  syncSettingsUI();
  document.getElementById("settingsView").classList.add("open");
  document.getElementById("settingsView").scrollTop = 0;
};

window.closeSettingsPage = function () {
  document.getElementById("settingsView").classList.remove("open");
  refreshProfileDisplays();
};

function syncSettingsUI() {
  document.getElementById("setDisplayName").value = userProfile.name;
  const selChar = CHARACTERS.find(c => c.id === userProfile.avatarId) || CHARACTERS[0];
  document.getElementById("setSelectedAvIcon").innerHTML = getAvatarSVG(selChar);
  document.getElementById("setSelectedAvName").textContent = selChar.name;
  document.getElementById("setSelectedAvTag").textContent = selChar.tag;

  renderSettingsAvatarGrid();
  renderSettingsFavOrbs();

  document.querySelectorAll("#setThemeSeg button").forEach(b => b.classList.toggle("on", b.dataset.v === userProfile.appTheme));
  document.querySelectorAll("#setAnimSeg button").forEach(b => b.classList.toggle("on", b.dataset.v === userProfile.animSpeed));
  document.querySelectorAll("#setAiDiffSeg button").forEach(b => b.classList.toggle("on", b.dataset.v === aiDifficulty));
  document.querySelectorAll("#setTimerSeg button").forEach(b => b.classList.toggle("on", +b.dataset.v === userProfile.diceTimer));

  document.getElementById("setDiceGrid").innerHTML = Object.keys(DICE_SKINS).map(k => {
    const s = DICE_SKINS[k];
    return `<button type="button" class="cz-item ${k === diceSkinKey ? "sel" : ""}" onclick="setDiceSkin('${k}')">
      <div class="cz-dice-tile" style="background:linear-gradient(145deg, ${s.f[0]}, ${s.f[1]})">${czIconPips(s)}</div>
      <span>${s.name}</span></button>`;
  }).join("");
  document.getElementById("setBgThemeGrid").innerHTML = Object.keys(BOARD_THEMES).map(k => {
    const t = BOARD_THEMES[k];
    return `<button type="button" class="cz-item ${k === boardThemeKey ? "sel" : ""}" onclick="setBoardTheme('${k}')">
      <div class="cz-theme-tile" style="background:linear-gradient(160deg, ${t.bgA}, ${t.bgB})"></div>
      <span>${t.name}</span></button>`;
  }).join("");

  document.getElementById("setSfxSwitch").classList.toggle("on", userProfile.sfxOn);
  document.getElementById("setMusicSwitch").classList.toggle("on", userProfile.musicOn);
  document.getElementById("setAnalyticsSwitch").classList.toggle("on", userProfile.analyticsOn);

  document.getElementById("mixMaster").value = userProfile.mixMaster;
  document.getElementById("mixMasterVal").textContent = userProfile.mixMaster;
  document.getElementById("mixEffects").value = userProfile.mixEffects;
  document.getElementById("mixEffectsVal").textContent = userProfile.mixEffects;
  document.getElementById("mixMusic").value = userProfile.mixMusic;
  document.getElementById("mixMusicVal").textContent = userProfile.mixMusic;
}

window.onProfileNameInput = function (val) {
  const trimmed = val.trim();
  if (trimmed.length >= 3 && trimmed.length <= 20) {
    userProfile.name = trimmed;
    lsSet("ludolive_name", trimmed);
    refreshProfileDisplays();
  }
};

window.filterSettingsAvatars = function (cat) {
  activeAvatarFilter = cat;
  document.querySelectorAll("#setAvTabs .av-tab").forEach(b => b.classList.toggle("on", b.dataset.cat === cat));
  renderSettingsAvatarGrid();
};

function renderSettingsAvatarGrid() {
  const list = activeAvatarFilter === "all" ? CHARACTERS : CHARACTERS.filter(c => c.cat === activeAvatarFilter);
  document.getElementById("setAvGrid").innerHTML = list.map(c => {
    const sel = c.id === userProfile.avatarId;
    return `
      <button type="button" class="av-cell ${sel ? "sel" : ""}" onclick="selectUserAvatar('${c.id}')">
        <div class="av-ring-wrap">
          <div class="av-circle-inner av-slot-bg">${getAvatarSVG(c)}</div>
          ${sel ? '<span class="av-check-badge">✓</span>' : ''}
        </div>
        <span class="av-name-lbl">${c.name}</span>
      </button>
    `;
  }).join("");
}

window.selectUserAvatar = function (id) {
  userProfile.avatarId = id;
  lsSet("ludolive_avatar", id);
  const selChar = CHARACTERS.find(c => c.id === id) || CHARACTERS[0];
  document.getElementById("setSelectedAvIcon").innerHTML = getAvatarSVG(selChar);
  document.getElementById("setSelectedAvName").textContent = selChar.name;
  document.getElementById("setSelectedAvTag").textContent = selChar.tag;
  renderSettingsAvatarGrid();
  refreshProfileDisplays();
};

const AI_ORBS = [
  { l: "#ff9096", m: "#e5505c", d: "#b02a39", ring: "#e8444f" },
  { l: "#ffc766", m: "#e8962f", d: "#b5620f", ring: "#f0a53a" },
  { l: "#76e6a0", m: "#2cb467", d: "#167548", ring: "#34c070" },
  { l: "#86e3f0", m: "#2fa9bf", d: "#17728a", ring: "#38b6cc" },
  { l: "#95adff", m: "#4a6ff0", d: "#2b41b5", ring: "#5b7cf5" },
  { l: "#d6aeff", m: "#9a5cf0", d: "#682fc2", ring: "#a468f2" }
];

function renderSettingsFavOrbs() {
  document.getElementById("setFavOrbs").innerHTML = AI_ORBS.map((o, i) =>
    `<button type="button" class="ai-orb${userProfile.favColor === i ? " sel" : ""}" onclick="pickUserFavColor(${i})"
      aria-label="${COLOR_PALETTE[i].name}"
      style="--ring:${o.ring};background:radial-gradient(circle at 36% 28%, ${o.l} 0%, ${o.m} 58%, ${o.d} 130%)"><span class="ck">✓</span></button>`
  ).join("");
}

window.pickUserFavColor = function (idx) {
  userProfile.favColor = idx;
  aiSetup.color = idx;
  lsSet("ludolive_favcolor", String(idx));
  renderSettingsFavOrbs();
};

window.setAnimationSpeed = function (spd) {
  userProfile.animSpeed = spd;
  lsSet("ludolive_animspeed", spd);
  syncSettingsUI();
};

window.toggleSfxSetting = function () {
  userProfile.sfxOn = !userProfile.sfxOn;
  soundEnabled = userProfile.sfxOn;
  lsSet("ludolive_sfx", userProfile.sfxOn ? "1" : "0");
  syncSettingsUI();
};

window.toggleMusicSetting = function () {
  userProfile.musicOn = !userProfile.musicOn;
  lsSet("ludolive_music", userProfile.musicOn ? "1" : "0");
  syncSettingsUI();
};

window.updateMixer = function (channel, val) {
  const n = parseInt(val, 10);
  if (channel === "master") { userProfile.mixMaster = n; lsSet("ludolive_mix_master", String(n)); document.getElementById("mixMasterVal").textContent = n; }
  if (channel === "effects") { userProfile.mixEffects = n; lsSet("ludolive_mix_effects", String(n)); document.getElementById("mixEffectsVal").textContent = n; }
  if (channel === "music") { userProfile.mixMusic = n; lsSet("ludolive_mix_music", String(n)); document.getElementById("mixMusicVal").textContent = n; }
};

window.setDefaultAiDiff = function (d) {
  aiDifficulty = d;
  aiSetup.diff = d;
  lsSet("ludolive_aidiff", d);
  syncSettingsUI();
};

window.setDiceTimerSec = function (sec) {
  userProfile.diceTimer = sec;
  lsSet("ludolive_dicetimer", String(sec));
  syncSettingsUI();
};

window.toggleAnalyticsSetting = function () {
  userProfile.analyticsOn = !userProfile.analyticsOn;
  lsSet("ludolive_analytics", userProfile.analyticsOn ? "1" : "0");
  syncSettingsUI();
};

window.resetAllUserData = function () {
  if (!confirm("Reset all profile, settings, and match statistics on this device?")) return;
  try { localStorage.clear(); } catch (e) {}
  userProfile = {
    name: "Lucky Tiger", avatarId: "arjun", favColor: 0, appTheme: "dark", animSpeed: "normal",
    sfxOn: true, musicOn: false, mixMaster: 0, mixEffects: 100, mixMusic: 60, diceTimer: 30, analyticsOn: false
  };
  aiDifficulty = "medium";
  boardThemeKey = "classic";
  diceSkinKey = "royal";
  soundEnabled = true;
  applyAppThemeClass();
  applyThemeBg();
  refreshProfileDisplays();
  syncSettingsUI();
  showToast("All local data reset");
};

// =========================================================================
// LOBBY & SETUP NAVIGATION
// =========================================================================
window.switchLobbyTab = function (tab) {
  ["play", "rules", "howto", "guides", "faq"].forEach(t => {
    document.getElementById(`lobby-${t}`).classList.add("hidden");
    document.getElementById(`ltab-${t}`).className = "ltab-inactive px-3.5 py-1.5 rounded-lg text-gray-400 hover:text-white shrink-0";
  });
  document.getElementById(`lobby-${tab}`).classList.remove("hidden");
  document.getElementById(`ltab-${tab}`).className = "ltab-active px-3.5 py-1.5 rounded-lg bg-white/15 text-white shrink-0";
};

window.selectGameMode = function (mode) {
  selectedMode = mode;
  if (mode === "ai") { openAiSetup(); return; }
  const diffBox = document.getElementById("aiDifficultyBox");
  const sub = document.getElementById("countModalSub");
  diffBox.classList.add("hidden");
  sub.innerText = "Everyone plays on this one device, taking it in turns.";
  openPlayerCountModal();
};

window.setAiDifficulty = function (diff) {
  aiDifficulty = diff;
  ["easy", "medium", "hard"].forEach(d => {
    document.getElementById(`diff-${d}`).className = d === diff
      ? "py-2 rounded-xl bg-[#f5b942] text-black"
      : "py-2 rounded-xl text-gray-400";
  });
};

const AI_HINTS = {
  1: "2 players · the classic square board",
  2: "3 players · the classic square board",
  3: "4 players · the classic square board",
  4: "5 players · five seats on a pentagon board",
  5: "6 players · six seats on a hexagon board"
};
const aiSetup = { color: userProfile.favColor, opp: 1, diff: aiDifficulty };

function aiMoveThumb(segId, animate) {
  const seg = document.getElementById(segId);
  const thumb = seg.querySelector(".ai-thumb");
  const btn = seg.querySelector("button.on");
  if (!btn || !seg.offsetWidth) return;
  if (!animate) thumb.classList.add("no-anim");
  thumb.style.width = btn.offsetWidth + "px";
  thumb.style.transform = "translateX(" + (btn.offsetLeft - 4) + "px)";
  if (!animate) { void thumb.offsetWidth; thumb.classList.remove("no-anim"); }
}

function aiRenderAll(animate) {
  document.getElementById("aiOrbs").innerHTML = AI_ORBS.map((o, i) =>
    `<button type="button" class="ai-orb${aiSetup.color === i ? " sel" : ""}" onclick="aiPickColor(${i})"
      aria-label="${COLOR_PALETTE[i].name}"
      style="--ring:${o.ring};background:radial-gradient(circle at 36% 28%, ${o.l} 0%, ${o.m} 58%, ${o.d} 130%)"><span class="ck">✓</span></button>`
  ).join("");
  document.querySelectorAll("#aiOppSeg button").forEach(b => b.classList.toggle("on", +b.dataset.v === aiSetup.opp));
  document.querySelectorAll("#aiDiffSeg button").forEach(b => b.classList.toggle("on", b.dataset.v === aiSetup.diff));
  document.getElementById("aiHint").textContent = AI_HINTS[aiSetup.opp];
  aiMoveThumb("aiOppSeg", animate);
  aiMoveThumb("aiDiffSeg", animate);
}

window.aiPickColor = function (i) {
  aiSetup.color = i;
  document.querySelectorAll("#aiOrbs .ai-orb").forEach((b, k) => b.classList.toggle("sel", k === i));
};
window.aiPickOpp = function (n) {
  aiSetup.opp = n;
  document.querySelectorAll("#aiOppSeg button").forEach(b => b.classList.toggle("on", +b.dataset.v === n));
  document.getElementById("aiHint").textContent = AI_HINTS[n];
  aiMoveThumb("aiOppSeg", true);
};
window.aiPickDiff = function (d) {
  aiSetup.diff = d;
  aiDifficulty = d;
  document.querySelectorAll("#aiDiffSeg button").forEach(b => b.classList.toggle("on", b.dataset.v === d));
  aiMoveThumb("aiDiffSeg", true);
};

window.openAiSetup = function () {
  aiSetup.color = userProfile.favColor;
  aiSetup.diff = aiDifficulty || "medium";
  document.getElementById("lobbyView").classList.add("hidden");
  const v = document.getElementById("aiSetupView");
  v.classList.add("open");
  v.scrollTop = 0;
  aiRenderAll(false);
  requestAnimationFrame(() => aiRenderAll(false));
};

window.closeAiSetup = function (backToLobby) {
  document.getElementById("aiSetupView").classList.remove("open");
  if (backToLobby) document.getElementById("lobbyView").classList.remove("hidden");
};

window.aiStart = function () {
  selectedMode = "ai";
  aiDifficulty = aiSetup.diff;
  const count = aiSetup.opp + 1;
  const others = COLOR_PALETTE.map((_, i) => i).filter(i => i !== aiSetup.color);
  const botPool = CHARACTERS.filter(c => c.id !== userProfile.avatarId);
  setupPlayerCount = count;
  setupConfigs = [];
  for (let i = 0; i < count; i++) {
    setupConfigs.push({
      name: i === 0 ? userProfile.name : `Player ${i + 1}`,
      colorIndex: i === 0 ? aiSetup.color : others[i - 1],
      avatarId: i === 0 ? userProfile.avatarId : botPool[(i - 1) % botPool.length].id,
      isAI: i > 0
    });
  }
  closeAiSetup(false);
  startMatchFromSetup();
};
window.addEventListener("resize", () => {
  if (document.getElementById("aiSetupView").classList.contains("open")) aiRenderAll(false);
});

window.openPlayerCountModal = function () {
  const m = document.getElementById("playerCountModal");
  m.classList.remove("hidden");
  m.classList.add("flex");
};

window.closePlayerCountModal = function () {
  const m = document.getElementById("playerCountModal");
  m.classList.add("hidden");
  m.classList.remove("flex");
};

window.openPlayerSetup = function (count) {
  closePlayerCountModal();
  setupPlayerCount = count;
  setupConfigs = [];
  const others = COLOR_PALETTE.map((_, i) => i).filter(i => i !== userProfile.favColor);
  const otherChars = CHARACTERS.filter(c => c.id !== userProfile.avatarId);

  for (let i = 0; i < count; i++) {
    const isBot = selectedMode === "ai" && i > 0;
    setupConfigs.push({
      name: i === 0 ? userProfile.name : `Player ${i + 1}`,
      colorIndex: i === 0 ? userProfile.favColor : others[i - 1],
      avatarId: i === 0 ? userProfile.avatarId : otherChars[(i - 1) % otherChars.length].id,
      isAI: isBot
    });
  }

  document.getElementById("setupTitle").innerText = selectedMode === "ai" ? "Play with AI" : "Play with Friends";
  document.getElementById("setupSubtitle").innerHTML = `<strong>${count} players</strong> on this device. Names and avatars are ready to go — edit any of them, or just start.`;

  renderSetupCards();
  document.getElementById("lobbyView").classList.add("hidden");
  document.getElementById("setupView").classList.remove("hidden");
};

window.closeSetupView = function () {
  document.getElementById("setupView").classList.add("hidden");
  document.getElementById("lobbyView").classList.remove("hidden");
};

function renderSetupCards() {
  const container = document.getElementById("playerSetupCards");
  container.innerHTML = setupConfigs.map((cfg, idx) => {
    const col = COLOR_PALETTE[cfg.colorIndex];
    const colorDots = COLOR_PALETTE.map((c, cIdx) => {
      const selected = cfg.colorIndex === cIdx;
      return `
        <button type="button" onclick="changeSetupColor(${idx}, ${cIdx})"
          style="background:${c.hex}"
          class="w-7 h-7 rounded-full flex items-center justify-center transition ${selected ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}">
          ${selected ? '<i class="fas fa-check text-[11px] text-white drop-shadow"></i>' : ''}
        </button>
      `;
    }).join("");

    return `
      <div style="border-color:${col.hex}55" class="glass-box bg-[#151828] border rounded-2xl p-3.5 flex items-center gap-3.5">
        <div onclick="cycleSetupAvatar(${idx})" class="relative cursor-pointer shrink-0">
          <div style="border-color:${col.hex}" class="w-14 h-14 rounded-full border-2 overflow-hidden bg-white/5">${getAvatarSVG(cfg.avatarId)}</div>
          <span class="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#f5b942] text-black flex items-center justify-center text-[10px]">
            <i class="fas fa-pen"></i>
          </span>
        </div>
        <div class="flex-1 min-w-0 space-y-2">
          <div class="flex items-center gap-2">
            <span style="color:${col.hex}" class="text-[10px] font-black uppercase tracking-wider">PLAYER ${idx + 1} • ${col.name.toUpperCase()}</span>
            ${cfg.isAI ? '<span class="text-[9px] bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded font-bold">AI</span>' : ''}
          </div>
          <input type="text" value="${cfg.name}" onchange="setupConfigs[${idx}].name = this.value.trim() || 'Player ${idx + 1}'"
            class="set-input w-full bg-[#0e111d] border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#f5b942]" />
          <div class="flex items-center gap-2 pt-0.5">
            <span class="text-[10px] font-bold text-gray-500 uppercase mr-1">COLOUR</span>
            ${colorDots}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

window.cycleSetupAvatar = function (idx) {
  const cur = CHARACTERS.findIndex(c => c.id === setupConfigs[idx].avatarId);
  setupConfigs[idx].avatarId = CHARACTERS[(cur + 1) % CHARACTERS.length].id;
  renderSetupCards();
};

window.changeSetupColor = function (playerIdx, newColorIdx) {
  const otherIdx = setupConfigs.findIndex((p, i) => i !== playerIdx && p.colorIndex === newColorIdx);
  if (otherIdx !== -1) setupConfigs[otherIdx].colorIndex = setupConfigs[playerIdx].colorIndex;
  setupConfigs[playerIdx].colorIndex = newColorIdx;
  renderSetupCards();
};

// =========================================================================
// ONLINE MULTIPLAYER
// =========================================================================
window.openOnlineLobbyModal = function () {
  document.getElementById("onlinePlayerName").value = userProfile.name;
  document.getElementById("onlineCreateJoinBox").classList.remove("hidden");
  document.getElementById("onlineWaitingBox").classList.add("hidden");
  const m = document.getElementById("onlineModal");
  m.classList.remove("hidden");
  m.classList.add("flex");
};

window.closeOnlineModal = function () {
  if (onlineUnsubscribe) { onlineUnsubscribe(); onlineUnsubscribe = null; }
  const m = document.getElementById("onlineModal");
  m.classList.add("hidden");
  m.classList.remove("flex");
};

window.createOnlineRoom = async function () {
  const myName = document.getElementById("onlinePlayerName").value.trim() || userProfile.name;
  const maxPlayers = parseInt(document.getElementById("onlineMaxPlayers").value, 10);
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  onlineRoomCode = code;
  onlineMySlot = 0;
  isOnlineHost = true;

  const roomData = {
    code, maxPlayers, status: "waiting",
    players: [{ name: myName, colorIndex: userProfile.favColor, avatarId: userProfile.avatarId, isAI: false }],
    state: null
  };

  try {
    await setDoc(doc(db, "ludo_rooms", code), roomData);
    listenToOnlineRoom(code);
  } catch (err) {
    showToast("Online error: " + err.message);
  }
};

window.joinOnlineRoom = async function () {
  const myName = document.getElementById("onlinePlayerName").value.trim() || userProfile.name;
  const code = document.getElementById("joinRoomCodeInput").value.trim().toUpperCase();
  if (code.length < 4) { showToast("Enter a valid room code"); return; }

  try {
    const ref = doc(db, "ludo_rooms", code);
    const snap = await getDoc(ref);
    if (!snap.exists()) { showToast("Room not found!"); return; }
    const data = snap.data();
    if (data.status !== "waiting") { showToast("Match already started!"); return; }
    if (data.players.length >= data.maxPlayers) { showToast("Room is full!"); return; }

    onlineRoomCode = code;
    onlineMySlot = data.players.length;
    isOnlineHost = false;

    const usedColors = new Set(data.players.map(p => p.colorIndex));
    const freeColor = [0, 1, 2, 3, 4, 5].find(c => !usedColors.has(c)) ?? onlineMySlot;

    const updatedPlayers = [
      ...data.players,
      { name: myName, colorIndex: freeColor, avatarId: userProfile.avatarId, isAI: false }
    ];
    await updateDoc(ref, { players: updatedPlayers });
    listenToOnlineRoom(code);
  } catch (err) {
    showToast("Error joining: " + err.message);
  }
};

function listenToOnlineRoom(code) {
  document.getElementById("onlineCreateJoinBox").classList.add("hidden");
  document.getElementById("onlineWaitingBox").classList.remove("hidden");
  document.getElementById("displayRoomCode").innerText = code;

  if (onlineUnsubscribe) onlineUnsubscribe();
  onlineUnsubscribe = onSnapshot(doc(db, "ludo_rooms", code), (snap) => {
    if (!snap.exists()) return;
    const data = snap.data();

    const listEl = document.getElementById("onlineRoomPlayersList");
    listEl.innerHTML = data.players.map((p, i) => {
      const c = COLOR_PALETTE[p.colorIndex];
      return `
        <div class="flex items-center justify-between bg-[#111424] px-3 py-2 rounded-xl text-xs font-bold">
          <span class="flex items-center gap-2">
            <span style="background:${c.hex}" class="w-3 h-3 rounded-full"></span>
            ${p.name} ${i === onlineMySlot ? '(You)' : ''}
          </span>
          <span class="text-emerald-400">Ready</span>
        </div>
      `;
    }).join("");

    if (isOnlineHost && data.players.length >= 2 && data.status === "waiting") {
      document.getElementById("startOnlineHostBtn").classList.remove("hidden");
    }

    if (data.status === "playing" && data.state) {
      document.getElementById("onlineModal").classList.add("hidden");
      document.getElementById("onlineModal").classList.remove("flex");
      selectedMode = "online";
      game = data.state;
      if (!boardGeom || boardGeom.arms !== game.arms) {
        boardGeom = buildPolygonBoardGeometry(game.arms);
      }
      document.getElementById("lobbyView").classList.add("hidden");
      document.getElementById("gameView").classList.remove("hidden");
      renderPlayerPods();
      drawBoard();
    }
  });
}

window.startOnlineMatchHost = async function () {
  const ref = doc(db, "ludo_rooms", onlineRoomCode);
  const snap = await getDoc(ref);
  const data = snap.data();
  const initialGame = createMatchObject(data.players, data.players.length <= 4 ? 4 : data.players.length);
  await updateDoc(ref, { status: "playing", state: initialGame });
};

window.copyRoomCode = function () {
  if (!onlineRoomCode) return;
  navigator.clipboard.writeText(onlineRoomCode);
  showToast("Room code copied: " + onlineRoomCode);
};

// =========================================================================
// CUSTOMIZE PAGE & 3D DICE PREVIEW
// =========================================================================
const PIP_POS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
function czPipGrid(n, skin) {
  let h = "";
  for (let i = 1; i <= 9; i++) {
    h += PIP_POS[n].includes(i)
      ? `<i class="pip" style="background:radial-gradient(circle at 35% 30%, ${skin.pips[0]}, ${skin.pips[1]} 85%)"></i>`
      : "<i></i>";
  }
  return h;
}
function czIconPips(skin) {
  const cols = [skin.pips[0], skin.pips[1], skin.pips[0], skin.pips[1], skin.pips[0]];
  const order = [1, 3, 5, 7, 9];
  let h = "", k = 0;
  for (let i = 1; i <= 9; i++) {
    if (order.includes(i)) { h += `<i style="background:${cols[k]}"></i>`; k++; }
    else h += "<i></i>";
  }
  return h;
}

let czAccX = -20, czAccY = 0, czCurrentVal = 6;
const CZ_FACE_ANGLE = { 1: [0, 0], 2: [0, -90], 3: [-90, 0], 4: [90, 0], 5: [0, 90], 6: [0, 180] };

function czBuildCube() {
  const skin = DICE_SKINS[diceSkinKey];
  const cube = document.getElementById("czCube");
  if (!cube) return;
  let h = "";
  for (let n = 1; n <= 6; n++) {
    h += `<div class="cz-face cz-f${n}" style="background:linear-gradient(145deg, ${skin.f[0]}, ${skin.f[1]}); border-color:${skin.edge}">${czPipGrid(n, skin)}</div>`;
  }
  cube.innerHTML = h;
  cube.style.transition = "none";
  const [ax, ay] = CZ_FACE_ANGLE[czCurrentVal];
  czAccX = ax; czAccY = ay;
  cube.style.transform = `rotateX(${czAccX}deg) rotateY(${czAccY}deg)`;
  void cube.offsetWidth;
  cube.style.transition = "";
}

function czNext(cur, target) {
  return target + 360 * Math.ceil((cur + 360 - target) / 360);
}

window.rollPreviewDice = function () {
  let v;
  do { v = 1 + Math.floor(Math.random() * 6); } while (v === czCurrentVal);
  czCurrentVal = v;
  const [tx, ty] = CZ_FACE_ANGLE[v];
  czAccX = czNext(czAccX, tx);
  czAccY = czNext(czAccY, ty);
  document.getElementById("czCube").style.transform = `rotateX(${czAccX}deg) rotateY(${czAccY}deg)`;
  sfxDice();
};

function czUpdateHeader() {
  const skin = DICE_SKINS[diceSkinKey], th = BOARD_THEMES[boardThemeKey];
  document.getElementById("czName").textContent = `${skin.name} dice · ${th.name} theme`;
  const card = document.getElementById("czPreviewCard");
  card.style.setProperty("--cz-ring", skin.ring);
  card.style.setProperty("--cz-glow", skin.glow);
  document.getElementById("czRing").style.borderColor = skin.ring;
}

function czRenderGrids() {
  document.getElementById("czDiceGrid").innerHTML = Object.keys(DICE_SKINS).map(k => {
    const s = DICE_SKINS[k];
    return `<button class="cz-item ${k === diceSkinKey ? "sel" : ""}" onclick="setDiceSkin('${k}')">
      <div class="cz-dice-tile" style="background:linear-gradient(145deg, ${s.f[0]}, ${s.f[1]})">${czIconPips(s)}</div>
      <span>${s.name}</span></button>`;
  }).join("");
  document.getElementById("czThemeGrid").innerHTML = Object.keys(BOARD_THEMES).map(k => {
    const t = BOARD_THEMES[k];
    return `<button class="cz-item ${k === boardThemeKey ? "sel" : ""}" onclick="setBoardTheme('${k}')">
      <div class="cz-theme-tile" style="background:linear-gradient(160deg, ${t.bgA}, ${t.bgB})"></div>
      <span>${t.name}</span></button>`;
  }).join("");
}

function applyThemeBg() {
  const t = BOARD_THEMES[boardThemeKey];
  const gv = document.getElementById("gameView");
  if (gv) gv.style.background = `radial-gradient(circle at 50% 10%, ${t.bgA} 0%, ${t.bgB} 80%)`;
  const pv = document.getElementById("czPreview");
  if (pv) pv.style.background = `radial-gradient(circle at 50% 0%, ${t.bgA} 0%, ${t.bgB} 80%)`;
}

window.openCustomizeModal = function () {
  document.getElementById("customizeView").classList.add("open");
  document.getElementById("customizeView").scrollTop = 0;
  czBuildCube(); czUpdateHeader(); czRenderGrids();
};
window.closeCustomizeModal = function () {
  document.getElementById("customizeView").classList.remove("open");
  closeFullPreview();
};

window.setBoardTheme = function (key) {
  if (!BOARD_THEMES[key]) return;
  boardThemeKey = key;
  lsSet("ludolive_theme", key);
  applyThemeBg(); czUpdateHeader(); czRenderGrids();
  if (document.getElementById("settingsView").classList.contains("open")) syncSettingsUI();
  if (game) drawBoard();
};
window.cycleBoardTheme = function () {
  const keys = Object.keys(BOARD_THEMES);
  const next = keys[(keys.indexOf(boardThemeKey) + 1) % keys.length];
  setBoardTheme(next);
  showToast("Theme: " + BOARD_THEMES[next].name.toUpperCase());
};
window.setDiceSkin = function (key) {
  if (!DICE_SKINS[key]) return;
  diceSkinKey = key;
  lsSet("ludolive_dice", key);
  czBuildCube(); czUpdateHeader(); czRenderGrids();
  if (document.getElementById("settingsView").classList.contains("open")) syncSettingsUI();
  if (game) renderPlayerPods();
};

function czBuildBoardSVG() {
  const c = 40;
  const cream = "#fbf5e6", line = "#ddd2b5";
  const col = {
    red:    { a: "#e0525a", b: "#8f1f27", cell: "#ef6e74" },
    green:  { a: "#34ad66", b: "#14693a", cell: "#34ad66" },
    blue:   { a: "#4a78e6", b: "#1f3f9b", cell: "#4a78e6" },
    yellow: { a: "#f4b83a", b: "#c07a10", cell: "#f4b83a" }
  };
  let s = `<svg class="cz-board" viewBox="-14 -14 628 628" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="czGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7dc8a"/><stop offset=".5" stop-color="#c8922a"/><stop offset="1" stop-color="#f3d27a"/></linearGradient>`;
  Object.keys(col).forEach(k => {
    s += `<linearGradient id="czq-${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${col[k].a}"/><stop offset="1" stop-color="${col[k].b}"/></linearGradient>
          <radialGradient id="czt-${k}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="${col[k].a}"/><stop offset="1" stop-color="${col[k].b}"/></radialGradient>`;
  });
  s += `</defs>
    <rect x="-10" y="-10" width="620" height="620" rx="16" fill="#1a1408" stroke="url(#czGold)" stroke-width="5"/>
    <rect x="-3" y="-3" width="606" height="606" rx="10" fill="none" stroke="url(#czGold)" stroke-width="1.5" opacity=".8"/>`;
  [[-10,-10],[610,-10],[-10,610],[610,610]].forEach(p => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#e8b84a"/>`; });

  const inQuad = (r, q) => (r < 6 || r > 8) && (q < 6 || q > 8);
  for (let r = 0; r < 15; r++) for (let q = 0; q < 15; q++) {
    if (inQuad(r, q)) continue;
    if (r >= 6 && r <= 8 && q >= 6 && q <= 8) continue;
    s += `<rect x="${q*c}" y="${r*c}" width="${c}" height="${c}" fill="${cream}" stroke="${line}" stroke-width="1"/>`;
  }
  const paint = (r, q, fill) => { s += `<rect x="${q*c}" y="${r*c}" width="${c}" height="${c}" fill="${fill}" stroke="${line}" stroke-width="1"/>`; };
  for (let r = 1; r <= 5; r++) paint(r, 7, col.green.cell);
  for (let q = 1; q <= 5; q++) paint(7, q, col.red.cell);
  for (let q = 9; q <= 13; q++) paint(7, q, col.yellow.cell);
  for (let r = 9; r <= 13; r++) paint(r, 7, col.blue.cell);
  paint(1, 8, col.green.cell); paint(6, 1, col.red.cell); paint(8, 13, col.yellow.cell); paint(13, 6, col.blue.cell);

  const star = (r, q, fill, size) => { s += `<text x="${q*c + c/2}" y="${r*c + c/2 + 1}" font-size="${size || 22}" text-anchor="middle" dominant-baseline="central" fill="${fill}">★</text>`; };
  star(1, 8, "#e9fff1"); star(6, 1, "#fff0f0"); star(8, 13, "#fffbe8"); star(13, 6, "#eef3ff");
  star(2, 6, "#d1a63c"); star(8, 2, "#d1a63c"); star(6, 12, "#d1a63c"); star(12, 8, "#d1a63c");

  const quad = (r0, q0, k) => {
    s += `<rect x="${q0*c}" y="${r0*c}" width="${6*c}" height="${6*c}" fill="url(#czq-${k})" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
          <rect x="${q0*c + 8}" y="${r0*c + 8}" width="${6*c - 16}" height="${6*c - 16}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
          <rect x="${(q0+1)*c}" y="${(r0+1)*c}" width="${4*c}" height="${4*c}" rx="12" fill="#f6efdd" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`;
    [[1.9, 1.9], [3.1, 1.9], [1.9, 3.1], [3.1, 3.1]].forEach(p => {
      const cx = (q0 + p[0]) * c, cy = (r0 + p[1]) * c;
      s += `<circle cx="${cx}" cy="${cy}" r="15" fill="url(#czt-${k})" stroke="rgba(0,0,0,.3)" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="7" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>`;
    });
  };
  quad(0, 0, "red"); quad(0, 9, "green"); quad(9, 0, "blue"); quad(9, 9, "yellow");

  const P = (x, y) => `${x*c},${y*c}`;
  s += `<polygon points="${P(6,6)} ${P(9,6)} ${P(7.5,7.5)}" fill="${col.green.a}"/>
        <polygon points="${P(6,6)} ${P(6,9)} ${P(7.5,7.5)}" fill="${col.red.a}"/>
        <polygon points="${P(9,6)} ${P(9,9)} ${P(7.5,7.5)}" fill="#e39a22"/>
        <polygon points="${P(6,9)} ${P(9,9)} ${P(7.5,7.5)}" fill="${col.blue.a}"/>
        <circle cx="${7.5*c}" cy="${7.5*c}" r="13" fill="#fbf5e6" stroke="url(#czGold)" stroke-width="3"/>
        <text x="${7.5*c}" y="${7.5*c + 1}" font-size="16" text-anchor="middle" dominant-baseline="central" fill="#c8922a">★</text>`;

  const tok = (r, q, k) => { s += `<circle cx="${q*c + c/2}" cy="${r*c + c/2}" r="14" fill="url(#czt-${k})" stroke="rgba(0,0,0,.35)" stroke-width="2"/>`; };
  tok(2, 8, "red"); tok(4, 6, "red"); tok(4, 8, "green"); tok(8, 1, "blue"); tok(8, 10, "yellow"); tok(13, 7, "yellow");
  s += `</svg>`;
  return s;
}

function czPod(name, hex, charId, isMe) {
  const dice = isMe ? `<div style="width:42px;height:42px;flex-shrink:0">${build3DDiceHTML(6)}</div>` : "";
  return `<div class="cz-pod ${isMe ? "me" : ""}" style="--pc:${hex}">
    <div style="display:flex;align-items:center;gap:10px;min-width:0">
      <div class="av">${getAvatarSVG(charId)}</div>
      <div><div class="nm">${name}</div><div class="dots"><i></i><i></i><i></i><i></i></div></div>
    </div>${dice}</div>`;
}

window.openFullPreview = function () {
  applyThemeBg();
  document.getElementById("czPvBoard").innerHTML = czBuildBoardSVG();
  document.getElementById("czPvTop").innerHTML = czPod("Aarav", "#ef4444", "aarav") + czPod("Meera", "#10b981", "meera");
  document.getElementById("czPvBottom").innerHTML = czPod("Kabir", "#3b82f6", "kabir") + czPod(userProfile.name, "#f59e0b", userProfile.avatarId, true);
  document.getElementById("czPreview").classList.add("open");
};
window.closeFullPreview = function () {
  document.getElementById("czPreview").classList.remove("open");
};

(function initParticles() {
  const box = document.getElementById("globalDots");
  let h = "";
  for (let i = 0; i < 16; i++) {
    const sz = 2 + Math.random() * 2.5;
    h += `<i style="left:${Math.random()*100}%;top:${10 + Math.random()*88}%;width:${sz}px;height:${sz}px;animation-duration:${6 + Math.random()*8}s;animation-delay:${-Math.random()*10}s"></i>`;
  }
  box.innerHTML = h;
  applyThemeBg();
})();

window.toggleSound = function () {
  soundEnabled = !soundEnabled;
  userProfile.sfxOn = soundEnabled;
  lsSet("ludolive_sfx", soundEnabled ? "1" : "0");
  const icon = soundEnabled ? '<i class="fas fa-volume-high text-xs"></i>' : '<i class="fas fa-volume-xmark text-xs text-rose-400"></i>';
  document.getElementById("lobbySoundBtn").innerHTML = icon;
  document.getElementById("gameSoundBtn").innerHTML = icon;
  showToast(soundEnabled ? "Sound ON" : "Sound OFF");
};

// =========================================================================
// N-ARM POLYGON BOARD GEOMETRY (4 = Straight Square, 5 = Pentagon, 6 = Hexagon)
// =========================================================================
function buildPolygonBoardGeometry(armsCount) {
  const size = 600;
  const cx = size / 2;
  const cy = size / 2;

  const R_in = armsCount === 4 ? 82 : (armsCount === 5 ? 90 : 96);
  const sideLen = 2 * R_in * Math.sin(Math.PI / armsCount);
  const cellW = (sideLen * 0.94) / 3;
  const cellH = cellW * (armsCount === 4 ? 0.95 : 0.90);
  const apothem = R_in * Math.cos(Math.PI / armsCount);

  // Math.PI / 2 makes 4-arm board straight square (Bottom, Left, Top, Right)
  const startAngle = armsCount === 4 ? Math.PI / 2 : (2 * Math.PI) / 3;
  const armAngles = [];
  for (let k = 0; k < armsCount; k++) {
    armAngles.push(startAngle + (k * 2 * Math.PI) / armsCount);
  }

  function armCellCenter(armIdx, col, row) {
    const theta = armAngles[armIdx];
    const ux = Math.cos(theta);
    const uy = Math.sin(theta);
    const vx = -uy;
    const vy = ux;

    const distOut = apothem + (row + 0.5) * cellH;
    const distSide = (col - 1) * cellW;
    return {
      x: cx + ux * distOut + vx * distSide,
      y: cy + uy * distOut + vy * distSide,
      theta,
      col,
      row,
      armIdx
    };
  }

  const outerLoop = [];
  for (let k = 0; k < armsCount; k++) {
    for (let r = 0; r <= 5; r++) outerLoop.push(armCellCenter(k, 0, r));
    outerLoop.push(armCellCenter(k, 1, 5));
    for (let r = 5; r >= 0; r--) outerLoop.push(armCellCenter(k, 2, r));
  }

  const armStartLoopIdx = [];
  const starLoopIndices = new Set();
  for (let k = 0; k < armsCount; k++) {
    const sIdx = k * 13 + 8;
    const starIdx = k * 13 + 3;
    armStartLoopIdx.push(sIdx);
    starLoopIndices.add(sIdx);
    starLoopIndices.add(starIdx);
  }

  const homeStretches = [];
  const homeCenterGoals = [];
  for (let k = 0; k < armsCount; k++) {
    const stretch = [];
    for (let r = 4; r >= 0; r--) {
      stretch.push(armCellCenter(k, 1, r));
    }
    homeStretches.push(stretch);

    const theta = armAngles[k];
    homeCenterGoals.push({
      x: cx + Math.cos(theta) * (apothem * 0.52),
      y: cy + Math.sin(theta) * (apothem * 0.52)
    });
  }

  const yards = [];
  for (let k = 0; k < armsCount; k++) {
    const nextK = (k + 1) % armsCount;
    const t1 = armAngles[k];
    const t2 = armAngles[nextK];
    const midAngle = t1 + Math.PI / armsCount;

    const pInner = {
      x: cx + Math.cos(midAngle) * (R_in + 4),
      y: cy + Math.sin(midAngle) * (R_in + 4)
    };

    const outerDist = apothem + 6 * cellH;
    const halfArmW = 1.5 * cellW + 3;
    const pLeft = {
      x: cx + Math.cos(t1) * outerDist - Math.sin(t1) * halfArmW,
      y: cy + Math.sin(t1) * outerDist + Math.cos(t1) * halfArmW
    };
    const pRight = {
      x: cx + Math.cos(t2) * outerDist + Math.sin(t2) * halfArmW,
      y: cy + Math.sin(t2) * outerDist - Math.cos(t2) * halfArmW
    };

    let poly = [pInner, pLeft, pRight];
    let yardCenter = {
      x: (pInner.x + pLeft.x + pRight.x) / 3,
      y: (pInner.y + pLeft.y + pRight.y) / 3
    };

    if (armsCount === 4) {
      const pCorner = {
        x: cx + Math.cos(midAngle) * (outerDist * Math.SQRT2),
        y: cy + Math.sin(midAngle) * (outerDist * Math.SQRT2)
      };
      poly = [pInner, pLeft, pCorner, pRight];
      yardCenter = {
        x: (pInner.x + pCorner.x) / 2,
        y: (pInner.y + pCorner.y) / 2
      };
    }

    const slotOff = cellW * (armsCount === 4 ? 0.68 : 0.54);
    const cosM = armsCount === 4 ? 1 : Math.cos(midAngle);
    const sinM = armsCount === 4 ? 0 : Math.sin(midAngle);
    const rawOffsets = [
      [-slotOff, -slotOff],
      [ slotOff, -slotOff],
      [-slotOff,  slotOff],
      [ slotOff,  slotOff]
    ];
    const slots = rawOffsets.map(([dx, dy]) => ({
      x: yardCenter.x + dx * cosM - dy * sinM,
      y: yardCenter.y + dx * sinM + dy * cosM
    }));

    yards.push({ poly, center: yardCenter, slots, midAngle });
  }

  const outerDist = apothem + 6 * cellH + 10;
  const halfArmW = 1.5 * cellW + 8;
  const frameVerts = [];
  for (let k = 0; k < armsCount; k++) {
    const t = armAngles[k];
    const ux = Math.cos(t), uy = Math.sin(t);
    const vx = -uy, vy = ux;
    frameVerts.push({
      x: cx + ux * outerDist - vx * halfArmW,
      y: cy + uy * outerDist - vy * halfArmW
    });
    frameVerts.push({
      x: cx + ux * outerDist + vx * halfArmW,
      y: cy + uy * outerDist + vy * halfArmW
    });
    if (armsCount === 4) {
      const midA = t + Math.PI / 4;
      frameVerts.push({
        x: cx + Math.cos(midA) * (outerDist * Math.SQRT2),
        y: cy + Math.sin(midA) * (outerDist * Math.SQRT2)
      });
    }
  }

  return {
    size, cx, cy, R_in, apothem, cellW, cellH,
    arms: armsCount,
    armAngles,
    outerLoop,
    armStartLoopIdx,
    starLoopIndices,
    homeStretches,
    homeCenterGoals,
    yards,
    frameVerts
  };
}

// =========================================================================
// MATCH CREATION & GAME LOGIC
// =========================================================================
window.startMatchFromSetup = function () {
  const arms = setupConfigs.length <= 4 ? 4 : setupConfigs.length;
  game = createMatchObject(setupConfigs, arms);
  boardGeom = buildPolygonBoardGeometry(arms);
  boardEffects = [];

  document.getElementById("setupView").classList.add("hidden");
  document.getElementById("gameView").classList.remove("hidden");

  renderPlayerPods();
  drawBoard();
  startTurnTimer();
  maybeTriggerAITurn();
};

function createMatchObject(configs, arms) {
  const seatMap = configs.length === 2 ? [0, 2] : (configs.length === 3 ? [0, 1, 2] : configs.map((_, i) => i));

  const players = configs.map((cfg, idx) => ({
    id: idx,
    armIdx: seatMap[idx],
    name: cfg.name,
    colorIndex: cfg.colorIndex,
    avatarId: cfg.avatarId || "arjun",
    isAI: !!cfg.isAI,
    tokens: [-1, -1, -1, -1],
    finishedCount: 0,
    rank: null
  }));

  return {
    arms,
    loopLen: arms * 13,
    players,
    turnIdx: 0,
    diceVal: 5,
    diceRolled: false,
    consecutiveSixes: 0,
    movableTokens: [],
    winners: [],
    lastRollByPlayer: {}
  };
}

function getStepsToFinish() {
  return game.loopLen + 4;
}

function getTokenWorldPos(player, tokenIdx) {
  const step = player.tokens[tokenIdx];
  const arm = player.armIdx;
  if (step === -1) return boardGeom.yards[arm].slots[tokenIdx];
  const finishStep = getStepsToFinish();
  if (step >= finishStep) return boardGeom.homeCenterGoals[arm];
  if (step >= game.loopLen - 1) {
    const stretchIdx = step - (game.loopLen - 1);
    return boardGeom.homeStretches[arm][stretchIdx];
  }
  const globalLoopIdx = (boardGeom.armStartLoopIdx[arm] + step) % game.loopLen;
  return boardGeom.outerLoop[globalLoopIdx];
}

// =========================================================================
// 3D DICE ROLL ANIMATION & MOVE VALIDATION
// =========================================================================
window.handleDiceClick = function () {
  if (!game || isPaused || game.diceRolled) return;
  const activePlayer = game.players[game.turnIdx];
  if (activePlayer.isAI) return;
  if (selectedMode === "online" && game.turnIdx !== onlineMySlot) {
    showToast("Wait for your turn!");
    return;
  }
  executeDiceRoll();
};

function executeDiceRoll() {
  game.diceRolled = true;
  sfxDice();

  const statusEl = document.getElementById("activePodStatus");
  if (statusEl) statusEl.textContent = "ROLLING...";

  const roll = Math.floor(Math.random() * 6) + 1;
  const hopEl = document.getElementById("gpDiceHop");
  const cubeEl = document.getElementById("gpDiceCube");

  if (hopEl && cubeEl) {
    hopEl.classList.remove("rolling");
    void hopEl.offsetWidth;
    hopEl.classList.add("rolling");

    const [tx, ty] = CZ_FACE_ANGLE[roll];
    gpCubeRotX = czNext(gpCubeRotX, tx) + 360;
    gpCubeRotY = czNext(gpCubeRotY, ty) + 360;
    cubeEl.style.transform = `rotateX(${gpCubeRotX}deg) rotateY(${gpCubeRotY}deg)`;
  }

  const rollDelay = userProfile.animSpeed === "fast" ? 360 : (userProfile.animSpeed === "relaxed" ? 720 : 560);

  setTimeout(() => {
    if (hopEl) hopEl.classList.remove("rolling");
    game.diceVal = roll;
    game.lastRollByPlayer[game.turnIdx] = roll;

    if (roll === 6) {
      game.consecutiveSixes++;
      if (game.consecutiveSixes >= 3) {
        showToast("Three 6s! Turn forfeited.");
        game.consecutiveSixes = 0;
        renderPlayerPods();
        setTimeout(() => advanceTurn(), 850);
        return;
      }
    } else {
      game.consecutiveSixes = 0;
    }

    const activePlayer = game.players[game.turnIdx];
    const finishStep = getStepsToFinish();
    const movable = [];

    activePlayer.tokens.forEach((step, tIdx) => {
      if (step === -1 && roll === 6) movable.push(tIdx);
      else if (step >= 0 && step + roll <= finishStep) movable.push(tIdx);
    });

    game.movableTokens = movable;
    renderPlayerPods();
    drawBoard();

    if (movable.length === 0) {
      document.getElementById("gameStatusHint").innerText = "No valid moves";
      setTimeout(() => advanceTurn(), 800);
    } else if (movable.length === 1) {
      document.getElementById("gameStatusHint").innerText = "Moving token...";
      setTimeout(() => moveToken(movable[0]), 320);
    } else {
      document.getElementById("gameStatusHint").innerText = "Tap a highlighted token to move";
      if (activePlayer.isAI) {
        setTimeout(() => chooseBestAIMove(activePlayer, movable, roll), 460);
      }
    }
    syncOnlineState();
  }, rollDelay);
}

function chooseBestAIMove(player, movable, roll) {
  let bestToken = movable[0];
  let bestScore = -999;
  const finishStep = getStepsToFinish();

  movable.forEach(tIdx => {
    let score = 0;
    const curr = player.tokens[tIdx];
    const next = curr === -1 ? 0 : curr + roll;

    if (curr === -1) score += 60;
    if (next === finishStep) score += 120;
    if (next >= game.loopLen - 1) score += 45;

    if (next < game.loopLen - 1) {
      const targetGlobal = (boardGeom.armStartLoopIdx[player.armIdx] + next) % game.loopLen;
      if (!boardGeom.starLoopIndices.has(targetGlobal)) {
        game.players.forEach(opp => {
          if (opp.id === player.id) return;
          opp.tokens.forEach(oStep => {
            if (oStep >= 0 && oStep < game.loopLen - 1) {
              const oGlobal = (boardGeom.armStartLoopIdx[opp.armIdx] + oStep) % game.loopLen;
              if (oGlobal === targetGlobal) score += 100;
            }
          });
        });
      }
    }

    if (aiDifficulty === "easy") score = Math.random() * 100;
    if (score > bestScore) { bestScore = score; bestToken = tIdx; }
  });

  moveToken(bestToken);
}

function animateBoardEffects() {
  if (!boardEffects.length) return;
  boardEffects.forEach(ef => {
    ef.r += 2.4;
    ef.alpha -= 0.032;
  });
  boardEffects = boardEffects.filter(ef => ef.alpha > 0);
  drawBoard();
  if (boardEffects.length) requestAnimationFrame(animateBoardEffects);
}

function triggerRippleAt(x, y, hexColor) {
  boardEffects.push({ x, y, color: hexColor, r: 8, alpha: 1 });
  boardEffects.push({ x, y, color: "#ffffff", r: 4, alpha: 0.85 });
  requestAnimationFrame(animateBoardEffects);
}

function moveToken(tokenIdx) {
  const player = game.players[game.turnIdx];
  if (!game.movableTokens.includes(tokenIdx)) return;

  game.movableTokens = [];
  const currStep = player.tokens[tokenIdx];
  const targetStep = currStep === -1 ? 0 : currStep + game.diceVal;
  const finishStep = getStepsToFinish();
  const pCol = COLOR_PALETTE[player.colorIndex].hex;

  let bonusTurn = game.diceVal === 6;
  const hopMs = userProfile.animSpeed === "fast" ? 65 : (userProfile.animSpeed === "relaxed" ? 165 : 115);

  let stepCursor = currStep === -1 ? 0 : currStep + 1;
  const hopTimer = setInterval(() => {
    player.tokens[tokenIdx] = stepCursor;
    sfxStep();

    if (currStep === -1 && stepCursor === 0) {
      const sp = getTokenWorldPos(player, tokenIdx);
      triggerRippleAt(sp.x, sp.y, pCol);
    }

    drawBoard();

    if (stepCursor >= targetStep) {
      clearInterval(hopTimer);

      if (targetStep === finishStep) {
        player.finishedCount++;
        bonusTurn = true;
        sfxHome();
        const hp = getTokenWorldPos(player, tokenIdx);
        triggerRippleAt(hp.x, hp.y, pCol);
        showToast(`${player.name} scored a token home!`);

        if (player.finishedCount === 4 && !game.winners.includes(player.id)) {
          game.winners.push(player.id);
          player.rank = game.winners.length;
        }
      } else if (targetStep < game.loopLen - 1) {
        const myGlobal = (boardGeom.armStartLoopIdx[player.armIdx] + targetStep) % game.loopLen;
        if (!boardGeom.starLoopIndices.has(myGlobal)) {
          game.players.forEach(opp => {
            if (opp.id === player.id) return;
            opp.tokens.forEach((oStep, oIdx) => {
              if (oStep >= 0 && oStep < game.loopLen - 1) {
                const oppGlobal = (boardGeom.armStartLoopIdx[opp.armIdx] + oStep) % game.loopLen;
                if (oppGlobal === myGlobal) {
                  const cp = getTokenWorldPos(opp, oIdx);
                  triggerRippleAt(cp.x, cp.y, COLOR_PALETTE[opp.colorIndex].hex);
                  opp.tokens[oIdx] = -1;
                  bonusTurn = true;
                  sfxCapture();
                  showToast(`${player.name} captured ${opp.name}!`);
                }
              }
            });
          });
        }
      }

      drawBoard();
      renderPlayerPods();

      if (game.winners.length >= game.players.length - 1) {
        endMatch();
        return;
      }

      if (bonusTurn && player.finishedCount < 4) {
        game.diceRolled = false;
        document.getElementById("gameStatusHint").innerText = "Bonus roll! Tap dice again";
        renderPlayerPods();
        syncOnlineState();
        maybeTriggerAITurn();
      } else {
        advanceTurn();
      }
    } else {
      stepCursor++;
    }
  }, hopMs);
}

function advanceTurn() {
  game.diceRolled = false;
  game.movableTokens = [];
  game.consecutiveSixes = 0;

  let loops = 0;
  do {
    game.turnIdx = (game.turnIdx + 1) % game.players.length;
    loops++;
  } while (game.players[game.turnIdx].finishedCount === 4 && loops <= game.players.length);

  renderPlayerPods();
  drawBoard();
  startTurnTimer();
  syncOnlineState();
  maybeTriggerAITurn();
}

function maybeTriggerAITurn() {
  const p = game.players[game.turnIdx];
  if (p && p.isAI && !isPaused) {
    document.getElementById("gameStatusHint").innerText = `${p.name} is thinking...`;
    setTimeout(() => {
      if (game && game.players[game.turnIdx].isAI && !game.diceRolled) {
        executeDiceRoll();
      }
    }, 620);
  } else if (p) {
    document.getElementById("gameStatusHint").innerText = "Tap the dice to roll";
  }
}

function startTurnTimer() {
  clearInterval(turnInterval);
  if (!userProfile.diceTimer) return;
  let timeLeft = userProfile.diceTimer;
  turnInterval = setInterval(() => {
    if (isPaused || !game) return;
    timeLeft--;
    const badge = document.getElementById("turnTimerBadge");
    if (badge) {
      badge.innerText = timeLeft;
      badge.classList.toggle("urgent", timeLeft <= 9);
    }
    if (timeLeft <= 0) {
      clearInterval(turnInterval);
      if (!game.diceRolled) executeDiceRoll();
      else if (game.movableTokens.length > 0) moveToken(game.movableTokens[0]);
      else advanceTurn();
    }
  }, 1000);
}

async function syncOnlineState() {
  if (selectedMode === "online" && onlineRoomCode) {
    try {
      await updateDoc(doc(db, "ludo_rooms", onlineRoomCode), { state: game });
    } catch (e) {}
  }
}

// =========================================================================
// CANVAS BOARD RENDERING
// =========================================================================
const canvas = document.getElementById("ludoCanvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("click", (e) => {
  if (!game || !game.diceRolled || game.movableTokens.length === 0) return;
  const activePlayer = game.players[game.turnIdx];
  if (activePlayer.isAI) return;
  if (selectedMode === "online" && game.turnIdx !== onlineMySlot) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = boardGeom.size / rect.width;
  const scaleY = boardGeom.size / rect.height;
  const clickX = (e.clientX - rect.left) * scaleX;
  const clickY = (e.clientY - rect.top) * scaleY;

  let closestToken = -1;
  let minDist = boardGeom.cellW * 1.4;

  game.movableTokens.forEach(tIdx => {
    const pos = getTokenWorldPos(activePlayer, tIdx);
    const d = Math.hypot(clickX - pos.x, clickY - pos.y);
    if (d < minDist) { minDist = d; closestToken = tIdx; }
  });

  if (closestToken !== -1) moveToken(closestToken);
});

function drawStar(cx, cy, r, color) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a1 = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const a2 = a1 + Math.PI / 5;
    ctx.lineTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r);
    ctx.lineTo(cx + Math.cos(a2) * (r * 0.44), cy + Math.sin(a2) * (r * 0.44));
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawRotatedCell(cell, fillColor, strokeColor) {
  ctx.save();
  ctx.translate(cell.x, cell.y);
  ctx.rotate(cell.theta);
  const w = boardGeom.cellH;
  const h = boardGeom.cellW;
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, 2.5);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.lineWidth = 1.1;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
  ctx.restore();
}

function drawBoard() {
  if (!boardGeom || !game) return;
  const dpr = window.devicePixelRatio || 1;
  const logicalSize = boardGeom.size;
  if (canvas.width !== logicalSize * dpr) {
    canvas.width = logicalSize * dpr;
    canvas.height = logicalSize * dpr;
  }
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, logicalSize, logicalSize);

  const theme = BOARD_THEMES[boardThemeKey];
  const { cx, cy, R_in, arms, armAngles, frameVerts } = boardGeom;

  const armColors = {};
  for (let k = 0; k < arms; k++) {
    const p = game.players.find(pl => pl.armIdx === k);
    armColors[k] = p ? COLOR_PALETTE[p.colorIndex] : COLOR_PALETTE[k % COLOR_PALETTE.length];
  }

  // 0. Outer Golden Bevel Frame
  if (frameVerts && frameVerts.length) {
    ctx.save();
    ctx.beginPath();
    frameVerts.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fillStyle = "#1c1508";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 18;
    ctx.fill();

    const goldGrad = ctx.createLinearGradient(0, 0, logicalSize, logicalSize);
    goldGrad.addColorStop(0, "#f7dc8a");
    goldGrad.addColorStop(0.5, "#c8922a");
    goldGrad.addColorStop(1, "#f3d27a");
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.strokeStyle = goldGrad;
    ctx.stroke();

    ctx.shadowBlur = 0;
    frameVerts.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#f7dc8a";
      ctx.fill();
    });
    ctx.restore();
  }

  // 1. Draw Wedge / Square Yards with White Cream Inner Panel
  boardGeom.yards.forEach((yard, k) => {
    const col = armColors[k];
    ctx.save();
    ctx.beginPath();
    yard.poly.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();

    const yGrad = ctx.createLinearGradient(
      yard.poly[0].x, yard.poly[0].y,
      yard.center.x, yard.center.y
    );
    yGrad.addColorStop(0, col.dark);
    yGrad.addColorStop(1, col.hex);
    ctx.fillStyle = yGrad;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.stroke();

    ctx.beginPath();
    yard.poly.forEach((pt, idx) => {
      const ix = yard.center.x + (pt.x - yard.center.x) * 0.72;
      const iy = yard.center.y + (pt.y - yard.center.y) * 0.72;
      if (idx === 0) ctx.moveTo(ix, iy);
      else ctx.lineTo(ix, iy);
    });
    ctx.closePath();
    ctx.fillStyle = "#f7f1e1";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.stroke();

    yard.slots.forEach(slot => {
      ctx.beginPath();
      ctx.arc(slot.x, slot.y, boardGeom.cellW * 0.36, 0, Math.PI * 2);
      ctx.fillStyle = "#e6dec8";
      ctx.fill();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.stroke();
    });
    ctx.restore();
  });

  // 2. Outer Perimeter Track Cells
  boardGeom.outerLoop.forEach((cell, idx) => {
    let fill = theme.cellBg;
    const startArm = boardGeom.armStartLoopIdx.indexOf(idx);
    if (startArm !== -1) fill = armColors[startArm].hex;
    drawRotatedCell(cell, fill, theme.cellStroke);

    if (boardGeom.starLoopIndices.has(idx)) {
      drawStar(cell.x, cell.y, boardGeom.cellW * 0.28, startArm !== -1 ? "#ffffff" : "#c79e3b");
    }
  });

  // 3. Colored Home Stretches
  boardGeom.homeStretches.forEach((stretch, k) => {
    const col = armColors[k];
    stretch.forEach(cell => drawRotatedCell(cell, col.hex, "rgba(255,255,255,0.45)"));
  });

  // 4. Center N-gon Divided into Colored Goal Triangles + Golden Star Hub
  for (let k = 0; k < arms; k++) {
    const col = armColors[k];
    const a1 = armAngles[k] - Math.PI / arms;
    const a2 = armAngles[k] + Math.PI / arms;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a1) * R_in, cy + Math.sin(a1) * R_in);
    ctx.lineTo(cx + Math.cos(a2) * R_in, cy + Math.sin(a2) * R_in);
    ctx.closePath();
    ctx.fillStyle = col.hex;
    ctx.fill();
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(cx, cy, 13, 0, Math.PI * 2);
  ctx.fillStyle = "#fbf5e6";
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "#d4a644";
  ctx.stroke();
  drawStar(cx, cy, 7.5, "#c8922a");

  // 5. Draw 3D Glossy Tokens
  const activePlayer = game.players[game.turnIdx];
  game.players.forEach(p => {
    const col = COLOR_PALETTE[p.colorIndex];
    p.tokens.forEach((step, tIdx) => {
      const pos = getTokenWorldPos(p, tIdx);
      const sameSpotOffset = (tIdx - 1.5) * (step === -1 ? 0 : 2.2);
      const tx = pos.x + sameSpotOffset;
      const ty = pos.y + sameSpotOffset;
      const radius = boardGeom.cellW * 0.35;

      const isMovable = p.id === activePlayer.id && game.movableTokens.includes(tIdx);

      if (isMovable) {
        ctx.beginPath();
        ctx.arc(tx, ty, radius + 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(tx, ty + 2.2, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.fill();

      const tGrad = ctx.createRadialGradient(
        tx - radius * 0.35, ty - radius * 0.35, radius * 0.1,
        tx, ty, radius
      );
      tGrad.addColorStop(0, "#ffffff");
      tGrad.addColorStop(0.28, col.light);
      tGrad.addColorStop(0.65, col.hex);
      tGrad.addColorStop(1, col.dark);

      ctx.beginPath();
      ctx.arc(tx, ty, radius, 0, Math.PI * 2);
      ctx.fillStyle = tGrad;
      ctx.fill();
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tx, ty, radius * 0.52, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.stroke();
    });
  });

  // 6. Circular Spawn / Home / Capture Ripple Animations
  boardEffects.forEach(ef => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(ef.x, ef.y, ef.r, 0, Math.PI * 2);
    ctx.strokeStyle = ef.color;
    ctx.globalAlpha = Math.max(0, ef.alpha);
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();
  });

  ctx.restore();
}

// =========================================================================
// RENDER PLAYER PODS & 3D CUBE DICE
// =========================================================================
function build3DDiceHTML(val, isActivePod) {
  const skin = DICE_SKINS[diceSkinKey];
  const [rx, ry] = CZ_FACE_ANGLE[val] || [0, 0];
  if (isActivePod) {
    gpCubeRotX = rx;
    gpCubeRotY = ry;
  }
  let faces = "";
  for (let n = 1; n <= 6; n++) {
    faces += `<div class="gp-face gp-f${n}" style="background:linear-gradient(145deg, ${skin.f[0]}, ${skin.f[1]}); border-color:${skin.edge}">${czPipGrid(n, skin)}</div>`;
  }
  return `
    <div ${isActivePod ? 'id="gpDiceHop"' : ''} class="gp-dice-hop">
      <div class="gp-dice-tilt">
        <div ${isActivePod ? 'id="gpDiceCube"' : ''} class="gp-cube" style="transform: rotateX(${rx}deg) rotateY(${ry}deg)">
          ${faces}
        </div>
      </div>
    </div>
  `;
}

function renderPlayerPods() {
  if (!game) return;
  const topRow = document.getElementById("topPodsRow");
  const bottomRow = document.getElementById("bottomPodsRow");
  const activePlayer = game.players[game.turnIdx];

  const count = game.players.length;
  const bottomPlayers = [];
  const topPlayers = [];

  if (count === 2) {
    bottomPlayers.push(game.players[0]);
    topPlayers.push(game.players[1]);
  } else if (count === 3) {
    bottomPlayers.push(game.players[0]);
    topPlayers.push(game.players[1], game.players[2]);
  } else if (count === 4) {
    bottomPlayers.push(game.players[0], game.players[3]);
    topPlayers.push(game.players[1], game.players[2]);
  } else if (count === 5) {
    bottomPlayers.push(game.players[0], game.players[4]);
    topPlayers.push(game.players[1], game.players[2], game.players[3]);
  } else {
    bottomPlayers.push(game.players[0], game.players[5], game.players[4]);
    topPlayers.push(game.players[1], game.players[2], game.players[3]);
  }

  const buildPodHTML = (p, isTopRow) => {
    const col = COLOR_PALETTE[p.colorIndex];
    const isTurn = p.id === activePlayer.id;
    const dots = [0, 1, 2, 3].map(i => {
      const done = i < p.finishedCount;
      return `<span style="background:${done ? col.hex : '#3a4058'}" class="w-1.5 h-1.5 rounded-full"></span>`;
    }).join("");

    const timerBadge = userProfile.diceTimer
      ? `<span id="turnTimerBadge" class="gp-timer-pill">${userProfile.diceTimer}</span>`
      : "";

    const arrowHTML = isTurn
      ? `<span class="gp-pod-arrow ${isTopRow ? 'top-row' : 'bot-row'}"><i class="fas fa-chevron-${isTopRow ? 'down' : 'up'}"></i></span>`
      : "";

    const statusLine = isTurn
      ? `<div id="activePodStatus" class="text-[9.5px] font-extrabold tracking-wider uppercase mt-0.5" style="color:${col.hex}">${game.diceRolled ? (game.movableTokens.length ? 'MOVE' : 'ROLLING...') : 'TAP TO ROLL'}</div>`
      : `<div class="flex items-center gap-1 mt-1">${dots}</div>`;

    const twoPlayerAlign = count === 2 ? (isTopRow ? "gp-pod-2p-top" : "gp-pod-2p-bot") : "";

    return `
      <div style="--pc:${col.hex}; --pc-glow:${col.glow}" class="gp-pod ${isTurn ? 'active' : ''} ${twoPlayerAlign}">
        ${arrowHTML}
        <div class="flex items-center gap-2 min-w-0">
          <div style="border-color:${col.hex}" class="w-9 h-9 rounded-full border-2 overflow-hidden bg-white/5 shrink-0">${getAvatarSVG(p.avatarId)}</div>
          <div class="min-w-0">
            <div class="flex items-center gap-1">
              <span style="color:${col.hex}" class="text-[9.5px] font-black shrink-0">P${p.id + 1}</span>
              <span class="text-[11px] font-extrabold text-white truncate">${p.name}</span>
            </div>
            ${statusLine}
          </div>
        </div>

        ${isTurn ? `
          <button id="activeDiceBox" onclick="handleDiceClick()" class="gp-dice-btn focus:outline-none">
            <span class="gp-dice-ring"></span>
            ${build3DDiceHTML(game.diceVal, true)}
            ${timerBadge}
          </button>
        ` : `
          ${game.lastRollByPlayer[p.id] ? `<span style="background:${col.hex}" class="w-5 h-5 rounded-md text-[10px] font-black text-white flex items-center justify-center shrink-0 shadow">${game.lastRollByPlayer[p.id]}</span>` : ''}
        `}
      </div>
    `;
  };

  topRow.className = count === 2 ? "flex w-full" : `grid grid-cols-${topPlayers.length} gap-2 w-full`;
  bottomRow.className = count === 2 ? "flex w-full" : `grid grid-cols-${bottomPlayers.length} gap-2 w-full`;

  topRow.innerHTML = topPlayers.map(p => buildPodHTML(p, true)).join("");
  bottomRow.innerHTML = bottomPlayers.map(p => buildPodHTML(p, false)).join("");
}

// =========================================================================
// END MATCH & RETURN TO LOBBY
// =========================================================================
function endMatch() {
  clearInterval(turnInterval);
  game.players.forEach(p => {
    if (!p.rank) {
      game.winners.push(p.id);
      p.rank = game.winners.length;
    }
  });

  const p1 = game.players[0];
  if (p1) {
    const played = parseInt(lsGet("ludolive_played", "0"), 10) + 1;
    lsSet("ludolive_played", String(played));
    if (p1.rank === 1) {
      const w = parseInt(lsGet("ludolive_wins", "0"), 10) + 1;
      lsSet("ludolive_wins", String(w));
    }
    const hist = JSON.parse(lsGet("ludolive_history", "[]"));
    hist.unshift({
      mode: selectedMode === "ai" ? "Vs AI" : (selectedMode === "online" ? "Online" : "Friends"),
      players: game.players.length,
      rank: p1.rank,
      date: new Date().toLocaleDateString()
    });
    lsSet("ludolive_history", JSON.stringify(hist.slice(0, 20)));
  }

  const sorted = [...game.players].sort((a, b) => a.rank - b.rank);
  document.getElementById("podiumList").innerHTML = sorted.map(p => {
    const col = COLOR_PALETTE[p.colorIndex];
    return `
      <div class="flex items-center justify-between bg-[#0e111d] px-3.5 py-2.5 rounded-xl border border-white/10">
        <span class="flex items-center gap-2.5 text-sm font-extrabold">
          <span class="text-amber-400">#${p.rank}</span>
          <span style="background:${col.hex}" class="w-3 h-3 rounded-full"></span>
          <span>${p.name}</span>
        </span>
        <span class="text-xs text-gray-400">${p.finishedCount}/4 Home</span>
      </div>
    `;
  }).join("");

  const m = document.getElementById("victoryModal");
  m.classList.remove("hidden");
  m.classList.add("flex");
}

window.rematchGame = function () {
  document.getElementById("victoryModal").classList.add("hidden");
  document.getElementById("victoryModal").classList.remove("flex");
  startMatchFromSetup();
};

window.returnToLobby = function () {
  clearInterval(turnInterval);
  isPaused = false;
  document.getElementById("victoryModal").classList.add("hidden");
  document.getElementById("victoryModal").classList.remove("flex");
  document.getElementById("gameView").classList.add("hidden");
  document.getElementById("lobbyView").classList.remove("hidden");
};

window.showToast = function (msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.remove("hidden");
  clearTimeout(window._tTimer);
  window._tTimer = setTimeout(() => t.classList.add("hidden"), 2200);
};

window.addEventListener("resize", () => {
  if (game && boardGeom) drawBoard();
});
