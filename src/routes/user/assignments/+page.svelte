<script lang="ts">
  import { tasks, isPremium, ownedCourses } from "$lib/stores";
  import { fade, scale, fly } from "svelte/transition";

  // --- SVELTE 5 STATE & DERIVED ---
  let activeFilter = $state("All");
  let showModal = $state(false);

  // State Form
  let newTitle = $state("");
  let newMapel = $state("");
  let newDesc = $state("");
  let newPriority = $state("Medium");

  const filters = ["All", "To Do", "In Progress", "Completed"];

  // Logic Akses menggunakan $derived
  const hasAccess = $derived($isPremium || $ownedCourses.length > 0);

  // Filter Tugas menggunakan $derived
  const filteredTasks = $derived.by(() => {
    if (activeFilter === "All") return $tasks;
    return $tasks.filter((t) => t.status === activeFilter);
  });

  // Statistik menggunakan $derived
  const stats = $derived({
    total: $tasks.length,
    completed: $tasks.filter((t) => t.status === "Completed").length,
  });

  // --- ACTIONS ---
  function closeModal() {
    showModal = false;
    newTitle = "";
    newMapel = "";
    newDesc = "";
    newPriority = "Medium";
  }

  function saveTask() {
    if (!newTitle) return alert("Judul wajib diisi!");

    tasks.update((current) => [
      {
        id: Date.now(),
        title: newTitle,
        desc: newDesc || "Tidak ada deskripsi.",
        mapel: newMapel || "Umum",
        due: "Baru Saja",
        priority: newPriority,
        status: "To Do",
        team: ["Me"],
      },
      ...current,
    ]);
    closeModal();
  }

  function toggleStatus(task: any) {
    const statusMap: Record<string, string> = {
      "To Do": "In Progress",
      "In Progress": "Completed",
      Completed: "To Do",
    };
    task.status = statusMap[task.status];
    $tasks = $tasks; // Trigger store update
  }
</script>

<div class="max-w-5xl mx-auto px-6 py-10 pb-24 font-plus">
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
    <div>
      <h1 class="text-3xl font-black text-slate-900 tracking-tight">Assignments 📝</h1>
      <p class="text-slate-500 font-medium">Kelola tugas dan proyek akademismu.</p>
    </div>

    {#if hasAccess}
      <button onclick={() => (showModal = true)} class="bg-slate-900 hover:bg-kh-orange text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-slate-200 transition-all active:scale-95 whitespace-nowrap"> + Tugas Baru </button>
    {/if}
  </header>

  {#if hasAccess}
    <div in:fade>
      <div class="flex gap-4 mb-10">
        <div class="bg-white p-6 rounded-3xl border-b-4 border-kh-orange shadow-sm flex-1">
          <span class="block text-3xl font-black text-slate-900 leading-none mb-1">{stats.total}</span>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Tugas</span>
        </div>
        <div class="bg-white p-6 rounded-3xl border-b-4 border-emerald-500 shadow-sm flex-1">
          <span class="block text-3xl font-black text-slate-900 leading-none mb-1">{stats.completed}</span>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selesai</span>
        </div>
      </div>

      <nav class="flex gap-2 mb-8 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
        {#each filters as f}
          <button
            onclick={() => (activeFilter = f)}
            class="px-5 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap
            {activeFilter === f ? 'bg-orange-50 text-kh-orange' : 'text-slate-400 hover:bg-slate-100'}"
          >
            {f}
          </button>
        {/each}
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredTasks as t (t.id)}
          <a
            href="/user/assignments/{t.id}"
            in:fly={{ y: 20, duration: 300 }}
            class="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col no-underline
      {t.status === 'Completed' ? 'bg-slate-50/50 border-dashed opacity-75' : ''}"
          >
            <div class="flex justify-between items-start mb-4">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.mapel}</span>
              <div
                class="px-3 py-1 rounded-lg text-[9px] font-black uppercase
          {t.priority === 'High' ? 'bg-rose-50 text-rose-600' : t.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}"
              >
                {t.priority}
              </div>
            </div>

            <h3 class="text-lg font-bold text-slate-900 mb-2 leading-tight {t.status === 'Completed' ? 'line-through text-slate-400' : ''}">
              {t.title}
            </h3>
            <p class="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">{t.desc}</p>

            <div class="flex items-center justify-between pt-4 border-t border-slate-50">
              <span class="text-[11px] font-medium text-slate-400 italic">📅 {t.due}</span>

              <button
                onclick={(e) => {
                  e.preventDefault(); // Mencegah navigasi <a>
                  e.stopPropagation(); // Mencegah event merembet ke <a>
                  toggleStatus(t);
                }}
                class="px-4 py-1.5 rounded-lg text-[10px] font-black transition-all
          {t.status === 'To Do' ? 'bg-slate-100 text-slate-600' : t.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}"
              >
                {t.status}
              </button>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {:else}
    <div in:scale={{ start: 0.95 }} class="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-16 text-center">
      <div class="text-6xl mb-6 animate-bounce">🔒</div>
      <h3 class="text-2xl font-black text-slate-900 mb-3">Fitur Tugas Terkunci</h3>
      <p class="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed font-medium">
        Menu ini khusus untuk siswa yang aktif. Silakan berlangganan <span class="text-kh-orange font-bold text-xs">PRO MEMBER</span> untuk akses tugas & proyek.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="/user/courses" class="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-kh-orange transition-all">Lihat Katalog</a>
        <a href="/user/profile" class="border-2 border-slate-200 text-slate-900 px-8 py-3.5 rounded-full font-bold text-sm hover:border-slate-900 transition-all">Aktifkan PRO</a>
      </div>
    </div>
  {/if}
</div>

{#if showModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" transition:fade={{ duration: 200 }} onclick={closeModal}>
    <div class="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl overflow-hidden" transition:scale={{ start: 0.95, duration: 200 }} onclick={(e) => e.stopPropagation()}>
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-black text-slate-900">Buat Tugas Baru</h2>
        <button onclick={closeModal} class="text-slate-300 hover:text-rose-500 text-2xl transition-colors">✕</button>
      </div>

      <div class="space-y-5">
        <div class="space-y-2">
          <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Judul Tugas</label>
          <input type="text" bind:value={newTitle} placeholder="Misal: Slicing UI Dashboard..." class="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 transition-all" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Mata Pelajaran</label>
            <input type="text" bind:value={newMapel} placeholder="UI/UX..." class="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20" />
          </div>
          <div class="space-y-2">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Prioritas</label>
            <select bind:value={newPriority} class="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Deskripsi</label>
          <textarea rows="3" bind:value={newDesc} placeholder="Detail pengerjaan..." class="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20"></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-10">
        <button onclick={closeModal} class="px-8 py-3.5 rounded-full font-bold text-slate-400 hover:text-slate-600 transition-all text-sm">Batal</button>
        <button onclick={saveTask} class="bg-slate-900 text-white px-10 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-slate-200 hover:bg-kh-orange transition-all">Simpan Tugas</button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.no-scrollbar::-webkit-scrollbar) {
    display: none;
  }
</style>
