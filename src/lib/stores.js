import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Ini biar tau kita lagi di browser atau server

// ==========================================
// 1. STORE USER (PROFIL) - DENGAN AUTO SAVE
// ==========================================

// Data Bawaan (Dipakai kalau baru pertama kali buka / belum pernah edit)
const defaultUser = {
  name: "Jason Ranti",
  role: "Student Class 1",
  email: "jason@sekolah.id",
  phone: "0812-9999-8888",
  bio: "Suka belajar coding dan desain sambil ngopi ☕",
  location: "Bandung, Indonesia",
  avatar: "https://ui-avatars.com/api/?name=Jason+Ranti&background=0D8ABC&color=fff&size=128"
};

// Cek LocalStorage dulu:
// "Eh browser, ada data 'my_user_data' gak? Kalo ada pake itu, kalo gak pake defaultUser"
const initialUser = browser && localStorage.getItem('my_user_data') 
  ? JSON.parse(localStorage.getItem('my_user_data')) 
  : defaultUser;

export const user = writable(initialUser);

// Subscribe: Setiap kali data 'user' berubah, simpan ke LocalStorage
if (browser) {
  user.subscribe((val) => {
    localStorage.setItem('my_user_data', JSON.stringify(val));
  });
}

// ==========================================
// 2. STORE TASKS (TUGAS) - DENGAN AUTO SAVE
// ==========================================

const defaultTasks = [
  { 
    id: 1, 
    title: "Redesign Homepage UI", 
    desc: "Bikin landing page yang modern dark mode.", 
    mapel: "UI/UX Design", 
    due: "Besok, 23:59", 
    priority: "High", 
    status: "To Do",
    team: ["Jason", "Sarah"] 
  },
  { 
    id: 2, 
    title: "Belajar SvelteKit Store", 
    desc: "Pahami cara kerja writable store.", 
    mapel: "Front End", 
    due: "Lusa", 
    priority: "Medium", 
    status: "In Progress",
    team: ["Jason"] 
  }
];

const initialTasks = browser && localStorage.getItem('my_tasks_data')
  ? JSON.parse(localStorage.getItem('my_tasks_data'))
  : defaultTasks;

export const tasks = writable(initialTasks);

if (browser) {
  tasks.subscribe((val) => {
    localStorage.setItem('my_tasks_data', JSON.stringify(val));
  });
}