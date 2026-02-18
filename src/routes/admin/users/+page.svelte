<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast";

  // --- DATA RUNES ---
  let users = $state([
    { id: 1, name: "Ahmad Dahlan", email: "ahmad@gmail.com", role: "PRO Student", status: "Active", joinDate: "12 Jan 2026" },
    { id: 2, name: "Siti Sarah", email: "siti@yahoo.com", role: "Free Member", status: "Inactive", joinDate: "05 Feb 2026" },
  ]);

  // --- UI STATE ---
  let searchQuery = $state("");
  let isDrawerOpen = $state(false);
  let isUserModalOpen = $state(false);
  let showPassword = $state(false);

  // --- USER FORM STATE ---
  let newUser = $state({ name: "", email: "", role: "Free Member", password: "" });

  // --- ASSIGNMENT FORM STATE ---
  let selectedUser = $state<any>(null);
  let newTask = $state({ title: "", deadline: "" });
  let fileInput = $state<HTMLInputElement | null>(null);
  let selectedFile = $state<File | null>(null);
  let fileType = $state<"image" | "video" | "file" | null>(null);

  // --- TASK STATE ---
  let userTasks = $state([{ id: 1, title: "Slicing Landing Page", deadline: "2026-02-15", status: "Pending", attachment: null }]);

  // --- DERIVED LOGIC ---
  const filteredUsers = $derived(users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())));

  // --- FUNCTIONS ---
  function addUser() {
    if (newUser.name && newUser.email && newUser.password) {
      const loadingToast = toast.loading("Mendaftarkan siswa baru...");

      setTimeout(() => {
        users = [
          ...users,
          {
            id: Date.now(),
            ...newUser,
            status: "Active",
            joinDate: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
          },
        ];

        newUser = { name: "", email: "", role: "Free Member", password: "" };
        isUserModalOpen = false;
        showPassword = false;

        toast.success(`${users[users.length - 1].name} berhasil ditambahkan!`, { id: loadingToast });
      }, 1000);
    } else {
      toast.error("Mohon lengkapi semua data!");
    }
  }

  function deleteUser(u: any) {
    if (confirm(`Hapus ${u.name} secara permanen?`)) {
      users = users.filter((usr) => usr.id !== u.id);
      toast.success("Pengguna berhasil dihapus", {
        icon: "🗑️",
        style: "border-radius: 15px; background: #333; color: #fff;",
      });
    }
  }

  function openAssignmentDrawer(user: any) {
    selectedUser = user;
    isDrawerOpen = true;
  }

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
      selectedFile = target.files[0];
      fileType = selectedFile.type.startsWith("image/") ? "image" : selectedFile.type.startsWith("video/") ? "video" : "file";
      toast.success("File berhasil dipilih");
    }
  }

  function addAssignment() {
    if (newTask.title && newTask.deadline) {
      const t = toast.loading("Mengirim tugas...");

      setTimeout(() => {
        userTasks = [
          {
            id: Date.now(),
            ...newTask,
            status: "Pending",
            attachment: selectedFile ? { name: selectedFile.name, type: fileType } : null, 
          },
          ...userTasks,
        ];
        newTask = { title: "", deadline: "" };
        selectedFile = null;
        toast.success("Tugas terkirim ke siswa!", { id: t });
      }, 800);
    } else {
      toast.error("Isi judul dan deadline!");
    }
  }
</script>

<Toaster />

<div class="p-8 max-w-7xl mx-auto space-y-6 font-plus antialiased text-slate-700">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="relative w-full max-w-md group">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold italic">Search</span>
      <input
        bind:value={searchQuery}
        type="text"
        placeholder="Cari siswa..."
        class="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-20 pr-4 text-sm focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all shadow-sm"
      />
    </div>

    <button
      onclick={() => (isUserModalOpen = true)}
      class="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-8 py-3.5 rounded-2xl text-sm font-black shadow-lg shadow-teal-100 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest italic"
    >
      <span class="text-lg">+</span> Tambah User Manual
    </button>
  </div>

  <div class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr class="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <th class="px-8 py-5 border-b border-slate-100 italic">User Information</th>
            <th class="px-6 py-5 border-b border-slate-100">Membership</th>
            <th class="px-6 py-5 border-b border-slate-100 text-center">Tugas</th>
            <th class="px-6 py-5 border-b border-slate-100 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          {#each filteredUsers as u (u.id)}
            <tr in:fade class="group hover:bg-[#14B8A6]/5 transition-all">
              <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white flex items-center justify-center font-black text-sm shadow-sm italic">{u.name.charAt(0)}</div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-sm font-black text-slate-800 truncate italic">{u.name}</span>
                    <span class="text-[11px] font-bold text-slate-400 truncate tracking-tight">{u.email}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border {u.role.includes('PRO') ? 'bg-[#14B8A6]/10 text-[#0D9488] border-[#14B8A6]/20' : 'bg-slate-50 text-slate-400 border-slate-100'}">
                  {u.role}
                </span>
              </td>
              <td class="px-6 py-5 text-center">
                <button
                  onclick={() => openAssignmentDrawer(u)}
                  class="bg-white border border-slate-200 hover:border-[#14B8A6] hover:text-[#0D9488] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer italic"
                >
                  Kelola Tugas
                </button>
              </td>
              <td class="px-8 py-5 text-right">
                <button onclick={() => deleteUser(u)} class="p-2.5 bg-white border border-slate-200 hover:bg-rose-600 hover:text-white text-slate-400 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100 cursor-pointer"
                  >🗑️</button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

{#if isUserModalOpen}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onclick={() => (isUserModalOpen = false)} transition:fade></div>
    <div class="bg-white w-full max-w-md rounded-[3rem] p-8 relative z-[110] shadow-2xl border border-slate-100" in:fly={{ y: 20 }}>
      <h3 class="text-xl font-black text-slate-900 mb-6 tracking-tight italic uppercase">Tambah Siswa Baru</h3>

      <div class="space-y-4">
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
          <input bind:value={newUser.name} type="text" placeholder="Nama..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm font-bold outline-none focus:border-[#14B8A6] transition-all" />
        </div>

        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
          <input bind:value={newUser.email} type="email" placeholder="email@gmail.com" class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm font-bold outline-none focus:border-[#14B8A6] transition-all" />
        </div>

        <div class="relative">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
          <div class="relative">
            <input
              bind:value={newUser.password}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm outline-none focus:border-[#14B8A6] transition-all"
            />
            <button type="button" onclick={() => (showPassword = !showPassword)} class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-[#0D9488] uppercase tracking-tighter italic">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Membership</label>
          <select bind:value={newUser.role} class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm font-bold outline-none focus:border-[#14B8A6] transition-all appearance-none italic">
            <option value="Free Member">Free Member</option>
            <option value="PRO Student">PRO Student</option>
          </select>
        </div>

        <div class="flex gap-3 pt-4 italic">
          <button onclick={() => (isUserModalOpen = false)} class="flex-1 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">BATAL</button>
          <button onclick={addUser} class="flex-2 bg-[#14B8A6] text-white rounded-2xl py-4 text-xs font-black shadow-lg shadow-teal-100 hover:bg-[#0D9488] transition-all active:scale-95 uppercase tracking-[0.2em]">SIMPAN USER</button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if isDrawerOpen}
  <div class="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm" transition:fade onclick={() => (isDrawerOpen = false)}></div>
  <aside class="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl border-l border-slate-100 flex flex-col" transition:fly={{ x: 400 }}>
    <div class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white flex items-center justify-center font-black text-lg shadow-lg italic">
          {selectedUser.name.charAt(0)}
        </div>
        <div>
          <h3 class="font-black text-slate-900 leading-none italic">{selectedUser.name}</h3>
          <p class="text-[10px] font-bold text-[#14B8A6] uppercase mt-2 tracking-widest italic">Assignment Panel</p>
        </div>
      </div>
      <button onclick={() => (isDrawerOpen = false)} class="text-slate-400 text-xl hover:text-slate-600 transition-all cursor-pointer">✕</button>
    </div>

    <div class="p-8 space-y-4 border-b border-slate-50 bg-white">
      <input bind:value={newTask.title} type="text" placeholder="Judul Tugas..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold outline-none focus:border-[#14B8A6] transition-all italic" />

      <div class="relative group">
        <input type="file" onchange={handleFileChange} class="hidden" bind:this={fileInput} />
        <button
          onclick={() => fileInput?.click()}
          class="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#14B8A6] hover:bg-[#14B8A6]/5 transition-all cursor-pointer"
        >
          {#if selectedFile}
            <div class="flex items-center gap-2">
              <span class="text-xs font-black text-[#0D9488] uppercase italic">File: {selectedFile.name}</span>
              <span
                onclick={(e) => {
                  e.stopPropagation();
                  selectedFile = null;
                }}
                class="text-rose-500 font-bold">✕</span
              >
            </div>
          {:else}
            <span class="text-xl">📁</span>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">Kirim Gambar/Video/Materi</span>
          {/if}
        </button>
      </div>

      <div class="flex gap-3 italic">
        <input bind:value={newTask.deadline} type="date" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold text-slate-500 outline-none focus:border-[#14B8A6] transition-all" />
        <button onclick={addAssignment} class="bg-[#F59E0B] text-white px-6 rounded-xl font-black text-xs hover:bg-[#D97706] transition-all cursor-pointer shadow-lg shadow-orange-100 uppercase tracking-widest">KIRIM</button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/20">
      <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest italic opacity-50">Daftar Tugas Terkirim</h4>
      {#each userTasks as task}
        <div in:slide class="p-5 rounded-[1.5rem] border border-slate-100 bg-white shadow-sm space-y-2 group hover:border-[#14B8A6]/30 transition-all">
          <div class="flex justify-between items-center">
            <span class="text-[8px] font-black px-2 py-0.5 rounded bg-orange-50 text-[#D97706] border border-orange-100 uppercase tracking-tighter italic">{task.status}</span>
            {#if task.attachment}
              <span class="text-[9px] font-black text-[#14B8A6] italic uppercase tracking-widest">Attached: {task.attachment.type}</span>
            {/if}
          </div>
          <h5 class="font-black text-slate-800 text-sm leading-tight italic">{task.title}</h5>
          <p class="text-[9px] font-bold text-slate-400 italic">Deadline: {task.deadline}</p>
        </div>
      {/each}
    </div>
  </aside>
{/if}

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
