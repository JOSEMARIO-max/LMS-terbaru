<script lang="ts">
  import { page } from "$app/state"; // SvelteKit 2.12+ state
  import { fade, fly, slide } from "svelte/transition";

  // --- SVELTE 5 STATE (RUNES) ---
  const courseId = $derived(page.params.id);
  let activeTab = $state("deskripsi");

  // Data dummy (biasanya dari API)
  const courseDetail = {
    id: courseId,
    title: "Mastering Mobile App Design (Figma)",
    description: "Pelajari cara merancang aplikasi mobile yang menarik dan fungsional dari nol. Kursus ini mencakup teori warna, tipografi, wireframing, hingga high-fidelity prototyping menggunakan Figma.",
    mentor: "Padhang Satrio",
    role: "Senior Product Designer",
    students: 1205,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  };

  const playlist = [
    { id: 101, title: "Introduction to UI/UX", duration: "05:30", type: "video" },
    { id: 102, title: "Understanding User Flow", duration: "12:15", type: "video" },
    { id: 103, title: "Wireframing Basics", duration: "18:40", type: "video" },
    { id: 104, title: "Prototyping in Figma", duration: "25:10", type: "video" },
    { id: 105, title: "Design System 101", duration: "15:00", type: "lock" },
    { id: 106, title: "Final Project Brief", duration: "08:20", type: "lock" },
  ];

  // Menggunakan $state untuk melacak video yang sedang diputar
  let currentVideo = $state(playlist[0]);

  // --- ACTIONS ---
  function playVideo(video: any) {
    if (video.type === "lock") {
      alert("Selesaikan materi sebelumnya untuk membuka bagian ini!");
      return;
    }
    currentVideo = video;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<div class="max-w-7xl mx-auto px-6 py-8 font-plus">
  <nav class="mb-8">
    <a href="/user/courses" class="group flex items-center gap-2 text-slate-400 font-bold text-sm transition-all hover:text-kh-orange">
      <span class="transition-transform group-hover:-translate-x-1">←</span>
      Kembali ke Katalog
    </a>
  </nav>

  <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
    <div class="space-y-8">
      <div class="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-900/20 group">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('{courseDetail.img}')">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
          <button class="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-3xl transition-all hover:scale-110 hover:bg-kh-orange hover:border-kh-orange shadow-2xl">
            ▶
          </button>
        </div>

        <div class="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div class="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <p class="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Now Playing</p>
            <h4 class="text-white font-bold text-sm">{currentVideo.title}</h4>
          </div>
          <div class="flex gap-2">
            <button class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">⚙️</button>
            <button class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">⛶</button>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{courseDetail.title}</h1>

        <div class="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div class="flex items-center gap-4">
            <img src="https://ui-avatars.com/api/?name={courseDetail.mentor}" alt="m" class="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" />
            <div>
              <span class="block font-black text-slate-800 text-sm leading-none">{courseDetail.mentor}</span>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{courseDetail.role}</span>
            </div>
          </div>
          <div class="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-100 font-bold text-sm text-slate-600">
            <span class="text-kh-orange">⭐ {courseDetail.rating}</span>
            <span class="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span>👥 {courseDetail.students} Siswa</span>
          </div>
        </div>

        <div class="space-y-6">
          <nav class="flex gap-8 border-b border-slate-100">
            {#each ["deskripsi", "diskusi", "resource"] as tab}
              <button
                onclick={() => (activeTab = tab)}
                class="pb-4 text-sm font-black uppercase tracking-widest transition-all relative
                {activeTab === tab ? 'text-kh-orange' : 'text-slate-400 hover:text-slate-600'}"
              >
                {tab}
                {#if activeTab === tab}
                  <div class="absolute bottom-0 left-0 w-full h-1 bg-kh-orange rounded-full" in:slide={{ axis: "x" }}></div>
                {/if}
              </button>
            {/each}
          </nav>

          <div class="min-h-[200px]" in:fade>
            {#if activeTab === "deskripsi"}
              <p class="text-slate-500 leading-relaxed font-medium text-lg">
                {courseDetail.description}
              </p>
            {:else if activeTab === "diskusi"}
              <div class="bg-slate-50 rounded-[2rem] p-10 text-center space-y-4">
                <p class="text-slate-400 font-bold">Forum diskusi sedang disiapkan.</p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <aside class="sticky top-10 space-y-6">
      <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <h3 class="font-black text-slate-900">Materi Kursus</h3>
          <span class="px-3 py-1 bg-orange-100 text-kh-orange text-[10px] font-black rounded-lg">2/{playlist.length}</span>
        </div>

        <div class="p-4 max-h-[600px] overflow-y-auto no-scrollbar space-y-2">
          {#each playlist as item, i}
            <button
              onclick={() => playVideo(item)}
              class="w-full flex items-center gap-4 p-4 rounded-2xl transition-all group
              {currentVideo.id === item.id ? 'bg-orange-50' : 'hover:bg-slate-50'}
              {item.type === 'lock' ? 'opacity-50 grayscale' : ''}"
            >
              <div
                class={`w-8 h-8 shrink-0 flex items-center justify-center rounded-xl font-black text-xs transition-colors
                ${currentVideo.id === item.id ? "bg-kh-orange text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"}`}
              >
                {i + 1}
              </div>

              <div class="flex-1 text-left min-w-0">
                <span
                  class={`block text-xs font-bold truncate mb-1 transition-colors
                  ${currentVideo.id === item.id ? "text-kh-orange" : "text-slate-700"}`}
                >
                  {item.title}
                </span>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {item.type === "lock" ? "🔒 Locked" : `🕒 ${item.duration}`}
                </span>
              </div>

              {#if currentVideo.id === item.id}
                <div class="flex gap-0.5 items-end h-3">
                  <div class="w-0.5 h-full bg-kh-orange animate-[bounce_1s_infinite_0s]"></div>
                  <div class="w-0.5 h-2/3 bg-kh-orange animate-[bounce_1s_infinite_0.2s]"></div>
                  <div class="w-0.5 h-full bg-kh-orange animate-[bounce_1s_infinite_0.4s]"></div>
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <div class="bg-slate-900 rounded-[2rem] p-8 text-white space-y-4">
        <h4 class="font-black">Need Help?</h4>
        <p class="text-xs text-slate-400 leading-relaxed font-medium">Tanyakan kendalamu langsung kepada mentor di grup komunitas eksklusif.</p>
        <button class="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black transition-all">Tanya Mentor ➔</button>
      </div>
    </aside>
  </div>
</div>

<style>
  :global(.no-scrollbar::-webkit-scrollbar) {
    display: none;
  }
</style>
