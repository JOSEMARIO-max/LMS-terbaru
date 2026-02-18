<script lang="ts">
  import { fade, fly, slide, scale } from "svelte/transition";
  import { goto } from "$app/navigation"; // Import navigasi SvelteKit
  import toast, { Toaster } from "svelte-french-toast";
  import { Search, Users, Send, CheckCircle2, MessageSquare, ArrowRight, X, FileText, LayoutList } from "@lucide/svelte";

  // --- DATA MOCKUP ---
  let users = $state([
    { id: 1, name: "Ahmad Dahlan", email: "ahmad@khwarizmi.com", role: "PRO Student", taskCount: 3, progress: 65 },
    { id: 2, name: "Siti Sarah", email: "siti@khwarizmi.com", role: "Free Member", taskCount: 1, progress: 0 },
  ]);

  let userTasks = $state([
    { id: 101, userId: 1, title: "Slicing Hero Section", status: "Completed", deadline: "2026-02-20", feedback: "Bagus, tapi perhatikan spacing.", studentNote: "Sudah saya revisi bagian mobile." },
    { id: 102, userId: 1, title: "Responsive Dashboard", status: "In Progress", deadline: "2026-02-25", feedback: "", studentNote: "" },
  ]);

  // --- UI STATE ---
  let searchQuery = $state("");
  let selectedUser = $state<any>(null);
  let isUserDrawerOpen = $state(false);

  // --- DERIVED ---
  const filteredUsers = $derived(users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase())));

  const selectedUserTasks = $derived(userTasks.filter((t) => t.userId === selectedUser?.id));

  // --- FUNCTIONS ---
  function openQuickPreview(user: any) {
    selectedUser = user;
    isUserDrawerOpen = true;
  }

  // Fungsi untuk mengalihkan ke halaman detail tugas penuh
  function goToFullAssignmentPage(userId: number) {
    isUserDrawerOpen = false; // Tutup drawer jika terbuka
    goto(`/admin/users/${userId}`); // Mengalihkan ke halaman yang tadi dibuat
  }
</script>

<Toaster />

<div class="p-8 max-w-7xl mx-auto space-y-8 font-plus antialiased text-slate-700">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div>
      <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">User Monitoring</h1>
      <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3 italic">Pantau progres dan kelola tugas siswa Khwarizmi</p>
    </div>

    <div class="relative w-full max-w-md group">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        bind:value={searchQuery}
        type="text"
        placeholder="Cari nama siswa..."
        class="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all italic shadow-sm"
      />
    </div>
  </div>

  <div class="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
    <table class="w-full text-left border-separate border-spacing-0">
      <thead>
        <tr class="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
          <th class="px-10 py-6 border-b border-slate-100">Siswa</th>
          <th class="px-6 py-6 border-b border-slate-100">Role</th>
          <th class="px-6 py-6 border-b border-slate-100 text-center">Tugas</th>
          <th class="px-6 py-6 border-b border-slate-100 text-center">Rata-rata Progres</th>
          <th class="px-10 py-6 text-right border-b border-slate-100">Detail Tugas</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-50">
        {#each filteredUsers as u (u.id)}
          <tr class="group hover:bg-[#14B8A6]/5 transition-all cursor-pointer" onclick={() => openQuickPreview(u)}>
            <td class="px-10 py-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black italic uppercase shadow-lg group-hover:bg-[#14B8A6] transition-colors">{u.name.charAt(0)}</div>
                <div>
                  <p class="font-black text-slate-900 text-sm italic uppercase">{u.name}</p>
                  <p class="text-[10px] font-bold text-slate-400">{u.email}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-6">
              <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border {u.role.includes('PRO') ? 'bg-[#F59E0B]/10 text-[#D97706] border-[#F59E0B]/20' : 'bg-slate-100 text-slate-400 border-slate-200'}">
                {u.role}
              </span>
            </td>
            <td class="px-6 py-6 text-center font-black text-slate-700 italic">{u.taskCount} Item</td>
            <td class="px-6 py-6">
              <div class="flex items-center gap-3 justify-center">
                <div class="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-[#14B8A6]" style="width: {u.progress}%"></div>
                </div>
                <span class="text-[10px] font-black text-[#14B8A6]">{u.progress}%</span>
              </div>
            </td>
            <td class="px-10 py-6 text-right">
              <button
                onclick={(e) => {
                  e.stopPropagation();
                  goToFullAssignmentPage(u.id);
                }}
                class="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#14B8A6] transition-all shadow-lg active:scale-95 flex items-center gap-2 italic ml-auto"
              >
                Manage <ArrowRight size={14} />
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if isUserDrawerOpen}
  <div class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md" onclick={() => (isUserDrawerOpen = false)} transition:fade></div>
  <aside class="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col overflow-hidden" transition:fly={{ x: 450, duration: 400 }}>
    <div class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black italic uppercase shadow-lg text-lg">{selectedUser.name.charAt(0)}</div>
        <div>
          <h3 class="font-black text-slate-900 italic leading-none">{selectedUser.name}</h3>
          <p class="text-[9px] font-black text-[#14B8A6] uppercase mt-1">Quick Preview</p>
        </div>
      </div>
      <button onclick={() => (isUserDrawerOpen = false)} class="text-slate-400 hover:text-slate-600 transition-all"><X size={20} /></button>
    </div>

    <div class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
      <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Recent Tasks</h4>
      {#each selectedUserTasks as task}
        <div class="p-5 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-2">
          <div class="flex justify-between">
            <span class="text-[8px] font-black px-2 py-0.5 rounded bg-orange-50 text-[#D97706] uppercase italic">{task.status}</span>
            <p class="text-[8px] font-bold text-slate-400 italic">{task.deadline}</p>
          </div>
          <h5 class="font-black text-slate-800 text-sm leading-tight italic uppercase">{task.title}</h5>
        </div>
      {/each}
    </div>

    <div class="p-6 bg-slate-50 border-t border-slate-100">
      <button
        onclick={() => goToFullAssignmentPage(selectedUser.id)}
        class="w-full bg-[#14B8A6] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-teal-100 hover:bg-[#0D9488] transition-all active:scale-95 italic flex items-center justify-center gap-2"
      >
        Go to Full Control Panel <LayoutList size={16} />
      </button>
    </div>
  </aside>
{/if}

<style>
  :global(body) {
    background-color: #f8fafc;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
</style>
