<script lang="ts">
  import { page } from "$app/state";
  import { fade } from "svelte/transition";
  import { user, isPremium } from "$lib/stores";
  import { onMount } from "svelte";
  import SidebarLink from "$lib/components/SidebarLink.svelte";

  // --- SVELTE 5 STATE ---
  let isSidebarOpen = $state(true);
  let isMobile = $state(false);

  // Derived state untuk deteksi halaman publik (di luar /user)
  const isPublicPage = $derived(!page.url.pathname.startsWith("/user") || ["/login", "/register"].includes(page.url.pathname));

  // Judul dinamis berdasarkan rute /user
  const pageTitle = $derived.by(() => {
    const path = page.url.pathname;
    if (path === "/user") return "Overview";
    if (path.startsWith("/user/lesson")) return "Pelajaran Saya";
    if (path.startsWith("/user/courses")) return "Katalog Kursus";
    if (path === "/user/profile") return "Profil Pengguna";
    if (path === "/user/assignments") return "Tugas Akademik";
    if (path === "/user/schedule") return "Jadwal Komunitas";
    return "Dashboard";
  });

  // --- LOGIC ---
  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  $effect(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024;
      if (isMobile) isSidebarOpen = false;
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });

  // Auto-close sidebar saat navigasi di mobile
  $effect(() => {
    if (isMobile && page.url.pathname) {
      isSidebarOpen = false;
    }
  });
</script>

<svelte:head><title>Khwarizmi Academy | {pageTitle}</title></svelte:head>

{#if isPublicPage}
  <slot />
{:else}
  <div class="flex h-screen overflow-hidden bg-slate-50 font-plus antialiased">
    {#if isMobile && isSidebarOpen}
      <div class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" transition:fade={{ duration: 200 }} onclick={toggleSidebar}></div>
    {/if}

    <aside
      class="bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col
      {isMobile ? 'fixed inset-y-0 left-0 shadow-2xl' : 'relative'}
      {isSidebarOpen ? 'w-64' : 'w-20'}
      {isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}"
    >
      <div class="flex items-center gap-3 px-6 h-20 shrink-0 overflow-hidden">
        <div class="w-8 h-8 rounded-lg overflow-hidden border border-slate-100 shrink-0 bg-white">
          <img src="/logo.jpg" alt="Logo" class="w-full h-full object-contain" />
        </div>
        {#if isSidebarOpen}
          <div class="flex flex-col whitespace-nowrap" transition:fade>
            <span class="font-extrabold text-slate-800 text-sm">KHWARIZMI</span>
            <span class="text-[10px] font-bold text-orange-500 tracking-widest uppercase">Academy</span>
          </div>
        {/if}
      </div>

      <div class="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar">
        <div>
          {#if isSidebarOpen}<small class="px-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">Utama</small>{/if}
          <nav class="mt-4 space-y-1">
            <SidebarLink href="/user" icon="📊" label="Overview" {isSidebarOpen} active={page.url.pathname === "/user"} />
            <SidebarLink href="/user/lesson" icon="📖" label="Pelajaran" {isSidebarOpen} active={page.url.pathname.startsWith("/user/lesson")} />
            <SidebarLink href="/user/courses" icon="💻" label="Kursus IT" {isSidebarOpen} active={page.url.pathname.startsWith("/user/courses")} />
          </nav>
        </div>

        <div>
          {#if isSidebarOpen}<small class="px-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">Akademik</small>{/if}
          <nav class="mt-4 space-y-1">
            <SidebarLink href="/user/assignments" icon="📝" label="Tugas" {isSidebarOpen} active={page.url.pathname.startsWith("/user/assignments")} />
            <SidebarLink href="/user/schedule" icon="👥" label="Komunitas" {isSidebarOpen} active={page.url.pathname === "/user/schedule"} />
          </nav>
        </div>
      </div>

      <div class="p-4 border-t border-slate-100">
        {#if $user && isSidebarOpen}
          <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4" transition:fade>
            <img src={$user.avatar || "https://ui-avatars.com/api/?name=User"} alt="User" class="w-9 h-9 rounded-xl object-cover" />
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-bold text-slate-800 truncate">{$user.name || "Student"}</span>
              <span class="text-[9px] font-bold text-orange-500 uppercase tracking-tighter">{$isPremium ? "PRO Member" : "Free"}</span>
            </div>
          </div>
        {/if}
        <nav class="space-y-1">
          <SidebarLink href="/user/profile" icon="⚙️" label="Pengaturan" {isSidebarOpen} active={page.url.pathname === "/user/profile"} />
          <SidebarLink href="/login" icon="🚪" label="Keluar" {isSidebarOpen} isLogout />
        </nav>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 overflow-y-auto bg-transparent mt-5">
      <header class="h-16 flex items-center px-4 lg:px-8 sticky top-0 bg-white/70 backdrop-blur-xl z-30 justify-between border-b border-slate-200/60">
        <div class="flex items-center gap-4">
          <button
            onclick={toggleSidebar}
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 transition-all active:scale-90"
          >
            <span class="text-xl">{isSidebarOpen && isMobile ? "✕" : "☰"}</span>
          </button>

          <div class="flex flex-col">
            <h2 class="font-black text-slate-800 text-lg tracking-tight leading-none">
              {pageTitle}
            </h2>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Khwarizmi / {pageTitle}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button class="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 transition-all group">
            <span class="text-xl group-hover:rotate-12 transition-transform">🔔</span>
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>

          <div class="h-6 w-px bg-slate-200 mx-1"></div>

          <a href="/user/profile" class="flex items-center gap-3 p-1 pr-3 rounded-full border border-transparent hover:border-slate-200 hover:bg-white transition-all">
            <img src={$user.avatar || "https://ui-avatars.com/api/?name=User"} class="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover" alt="User" />
            <div class="hidden sm:flex flex-col text-left">
              <span class="text-xs font-black text-slate-700 leading-none truncate max-w-[100px]">
                {$user.name.split(" ")[0]}
              </span>
              <span class="text-[9px] font-bold text-kh-orange uppercase tracking-tighter">
                {$isPremium ? "PRO Student" : "Free"}
              </span>
            </div>
          </a>
        </div>
      </header>

      <div class="px-4 lg:px-10 pt-8 pb-20">
        {#key page.url.pathname}
          <div in:fade={{ duration: 200, delay: 100 }}>
            <slot />
          </div>
        {/key}
      </div>
    </main>
  </div>
{/if}

<style>
  :global(.custom-scrollbar::-webkit-scrollbar) {
    width: 4px;
  }
  :global(.custom-scrollbar::-webkit-scrollbar-thumb) {
    background: #e2e8f0;
    border-radius: 10px;
  }
</style>
