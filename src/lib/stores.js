import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// --- HELPER: Biar gak error pas baca JSON ---
function safeParse(jsonString, fallback) {
  try {
    return jsonString ? JSON.parse(jsonString) : fallback;
  } catch (e) {
    return fallback;
  }
}

// ==========================================
// 1. STORE USER (DATA PROFIL)
// ==========================================
const defaultUser = {
    name: "Rioolin",
    role: "Regular Member",
    avatar: "https://ui-avatars.com/api/?name=Rioolin&background=0D8ABC&color=fff",
    location: "Jakarta, Indonesia",
    email: "rioolin@example.com",
    phone: "081234567890"
};

const initialUser = browser 
  ? safeParse(localStorage.getItem('khwarizmi_user'), defaultUser) 
  : defaultUser;

export const user = writable(initialUser);

if (browser) {
  user.subscribe((val) => localStorage.setItem('khwarizmi_user', JSON.stringify(val)));
}

// ==========================================
// 2. STORE KURSUS (YANG DIMILIKI)
// ==========================================
const initialOwned = browser 
  ? safeParse(localStorage.getItem('khwarizmi_courses'), []) 
  : []; 

export const ownedCourses = writable(initialOwned);

if (browser) {
  ownedCourses.subscribe((val) => localStorage.setItem('khwarizmi_courses', JSON.stringify(val)));
}

// ==========================================
// 3. PREMIUM STATUS (LANGGANAN)
// ==========================================
const initialPremium = browser
  ? safeParse(localStorage.getItem('khwarizmi_premium'), false)
  : false;

export const isPremium = writable(initialPremium);

if (browser) {
  isPremium.subscribe((val) => localStorage.setItem('khwarizmi_premium', JSON.stringify(val)));
}

// ==========================================
// 4. STORE TUGAS (ASSIGNMENTS)
// ==========================================
// Data dummy awal kalau belum ada di localStorage
const defaultTasks = [
    {
        id: 1,
        title: "Redesign Homepage App",
        mapel: "UI/UX Design",
        desc: "Buat konsep baru yang lebih modern untuk halaman utama aplikasi.",
        priority: "High",
        status: "To Do",
        team: ["Rio"],
        due: "Besok"
    },
    {
        id: 2,
        title: "Slicing Landing Page",
        mapel: "Frontend Dev",
        desc: "Convert desain Figma ke HTML/CSS menggunakan Tailwind.",
        priority: "Medium",
        status: "In Progress",
        team: ["Rio"],
        due: "3 Hari Lagi"
    },
    {
        id: 3,
        title: "Analisis Data User",
        mapel: "Data Science",
        desc: "Cek data user aktif bulan lalu.",
        priority: "Low",
        status: "Completed",
        team: ["Rio"],
        due: "Selesai"
    }
];

const initialTasks = browser
  ? safeParse(localStorage.getItem('khwarizmi_tasks'), defaultTasks)
  : defaultTasks;

export const tasks = writable(initialTasks);

if (browser) {
  tasks.subscribe((val) => localStorage.setItem('khwarizmi_tasks', JSON.stringify(val)));
}